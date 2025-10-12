// FILE: Backend/website/src/models/appointment.js
import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  appointmentType: {
    type: String,
    enum: ["virtual", "physical"],
    required: true
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  rugsSelected: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rug"
  }],
  bringFavorites: {
    type: Boolean,
    default: false
  },
  meetLink: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["confirmed", "cancelled", "completed"],
    default: "confirmed"
  },
  notes: {
    type: String,
    maxlength: 500
  },
  // Additional fields for physical appointments
  address: {
    type: String,
    required: function() {
      return this.appointmentType === "physical";
    }
  },
  phoneNumber: {
    type: String,
    required: true
  }
}, { 
  timestamps: true 
});

// Compound index to ensure only one appointment per user per day
AppointmentSchema.index({ userId: 1, date: 1 }, { unique: true });

// Index for checking daily availability
AppointmentSchema.index({ date: 1, status: 1 });

// Pre-save middleware to generate meet link for virtual appointments
AppointmentSchema.pre('save', function(next) {
  if (this.appointmentType === 'virtual' && !this.meetLink) {
    // Generate a placeholder meet link - in production, integrate with actual meeting service
    const meetId = Math.random().toString(36).substring(2, 15);
    this.meetLink = `https://meet.google.com/${meetId}`;
  }
  next();
});

// Static method to check if a date is available (max 5 appointments per day)
AppointmentSchema.statics.isDateAvailable = async function(date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  const appointmentCount = await this.countDocuments({
    date: {
      $gte: startOfDay,
      $lte: endOfDay
    },
    status: { $ne: 'cancelled' }
  });
  
  return appointmentCount < 5; // Max 5 appointments per day
};

// Static method to get user's appointment for a specific date
AppointmentSchema.statics.getUserAppointmentForDate = async function(userId, date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  return await this.findOne({
    userId,
    date: {
      $gte: startOfDay,
      $lte: endOfDay
    },
    status: { $ne: 'cancelled' }
  });
};

export default mongoose.model("Appointment", AppointmentSchema);