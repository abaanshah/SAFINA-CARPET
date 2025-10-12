// FILE: Backend/website/src/controllers/appointmentController.js
import Appointment from "../models/appointment.js";
import Rug from "../models/rug.js";
import User from "../models/user.js";

// @desc    Book a new appointment
// @route   POST /api/appointments/book
// @access  Private
export const bookAppointment = async (req, res) => {
  try {
    const { appointmentType, date, rugsSelected, bringFavorites, notes, address, phoneNumber } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!appointmentType || !date || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Appointment type, date, and phone number are required"
      });
    }

    // Validate appointment type
    if (!["virtual", "physical"].includes(appointmentType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment type. Must be 'virtual' or 'physical'"
      });
    }

    // Validate date (must be in the future)
    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (appointmentDate < today) {
      return res.status(400).json({
        success: false,
        message: "Appointment date must be in the future"
      });
    }

    // Check if user already has an appointment for this date
    const existingUserAppointment = await Appointment.getUserAppointmentForDate(userId, appointmentDate);
    if (existingUserAppointment) {
      return res.status(400).json({
        success: false,
        message: "You already have an appointment booked for this date"
      });
    }

    // Check if the date is available (max 5 appointments per day)
    const isAvailable = await Appointment.isDateAvailable(appointmentDate);
    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: "This date is fully booked. Please select another date."
      });
    }

    // Validate physical appointment requirements
    if (appointmentType === "physical" && !address) {
      return res.status(400).json({
        success: false,
        message: "Address is required for physical appointments"
      });
    }

    // Validate selected rugs if provided
    if (rugsSelected && rugsSelected.length > 0) {
      const validRugs = await Rug.find({ _id: { $in: rugsSelected } });
      if (validRugs.length !== rugsSelected.length) {
        return res.status(400).json({
          success: false,
          message: "One or more selected rugs are invalid"
        });
      }
    }

    // Create the appointment
    const appointment = new Appointment({
      userId,
      appointmentType,
      date: appointmentDate,
      rugsSelected: rugsSelected || [],
      bringFavorites: bringFavorites || false,
      notes: notes || "",
      address: appointmentType === "physical" ? address : "",
      phoneNumber
    });

    await appointment.save();

    // Populate the appointment with user and rug details
    await appointment.populate([
      { path: 'userId', select: 'name email' },
      { path: 'rugsSelected', select: 'name price images' }
    ]);

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment
    });

  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to book appointment",
      error: error.message
    });
  }
};

// @desc    Check availability for a specific date
// @route   GET /api/appointments/availability?date=YYYY-MM-DD
// @access  Public
export const checkAvailability = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date parameter is required"
      });
    }

    const checkDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if date is in the past
    if (checkDate < today) {
      return res.status(200).json({
        success: true,
        available: false,
        message: "Past dates are not available"
      });
    }

    const isAvailable = await Appointment.isDateAvailable(checkDate);
    
    // Get current appointment count for the date
    const startOfDay = new Date(checkDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(checkDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    const appointmentCount = await Appointment.countDocuments({
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      status: { $ne: 'cancelled' }
    });

    res.status(200).json({
      success: true,
      available: isAvailable,
      appointmentCount,
      maxAppointments: 5,
      message: isAvailable ? "Date is available" : "Date is fully booked"
    });

  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check availability",
      error: error.message
    });
  }
};

// @desc    Get user's appointments
// @route   GET /api/appointments/my
// @access  Private
export const getUserAppointments = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status, limit = 10, page = 1 } = req.query;

    // Build query
    const query = { userId };
    if (status && ["confirmed", "cancelled", "completed"].includes(status)) {
      query.status = status;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    const appointments = await Appointment.find(query)
      .populate('rugsSelected', 'name price images')
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const totalAppointments = await Appointment.countDocuments(query);

    res.status(200).json({
      success: true,
      appointments,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalAppointments / limit),
        totalAppointments,
        hasNext: skip + appointments.length < totalAppointments,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error("Error fetching user appointments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
      error: error.message
    });
  }
};

// @desc    Cancel an appointment
// @route   PUT /api/appointments/:id/cancel
// @access  Private
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const appointment = await Appointment.findOne({ _id: id, userId });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    if (appointment.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Appointment is already cancelled"
      });
    }

    // Check if appointment is in the past
    const appointmentDate = new Date(appointment.date);
    const now = new Date();
    
    if (appointmentDate < now) {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel past appointments"
      });
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
      appointment
    });

  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel appointment",
      error: error.message
    });
  }
};

// @desc    Get available dates for the next 30 days
// @route   GET /api/appointments/available-dates
// @access  Public
export const getAvailableDates = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const availableDates = [];
    
    for (let i = 1; i <= parseInt(days); i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() + i);
      
      // Skip Sundays (optional - remove if not needed)
      if (checkDate.getDay() === 0) continue;
      
      const isAvailable = await Appointment.isDateAvailable(checkDate);
      
      if (isAvailable) {
        availableDates.push({
          date: checkDate.toISOString().split('T')[0],
          dayName: checkDate.toLocaleDateString('en-US', { weekday: 'long' }),
          available: true
        });
      }
    }

    res.status(200).json({
      success: true,
      availableDates,
      totalAvailable: availableDates.length
    });

  } catch (error) {
    console.error("Error fetching available dates:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch available dates",
      error: error.message
    });
  }
};