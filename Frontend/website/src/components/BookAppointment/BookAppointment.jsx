// FILE: Frontend/website/src/components/BookAppointment/BookAppointment.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Calendar as CalendarIcon, Clock, MapPin, Video, Phone, User, Heart } from 'lucide-react';
import Calendar from './Calendar';

const BookAppointment = ({ onSuccess }) => {
  const { user, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [rugs, setRugs] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  
  // Form data
  const [formData, setFormData] = useState({
    appointmentType: 'virtual',
    date: '',
    rugsSelected: [],
    bringFavorites: false,
    notes: '',
    address: '',
    phoneNumber: ''
  });

  // UI state
  const [showRugSelection, setShowRugSelection] = useState(false);
  const [rugSearchTerm, setRugSearchTerm] = useState('');

  // Fetch available dates on component mount
  useEffect(() => {
    fetchAvailableDates();
    fetchRugs();
    if (user) {
      fetchUserFavorites();
    }
  }, [user]);

  const fetchAvailableDates = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/appointments/available-dates`);
      const data = await response.json();
      
      if (data.success) {
        setAvailableDates(data.availableDates);
      } else {
        toast.error('Failed to fetch available dates');
      }
    } catch (error) {
      console.error('Error fetching available dates:', error);
      toast.error('Failed to fetch available dates');
    }
  };

  const fetchRugs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/rugs`);
      const data = await response.json();
      
      if (data.success) {
        setRugs(data.rugs || []);
      } else {
        toast.error('Failed to fetch rugs');
      }
    } catch (error) {
      console.error('Error fetching rugs:', error);
      toast.error('Failed to fetch rugs');
    }
  };

  const fetchUserFavorites = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/wishlist`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setUserFavorites(data.wishlist || []);
      }
    } catch (error) {
      console.error('Error fetching user favorites:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRugSelection = (rugId) => {
    setFormData(prev => ({
      ...prev,
      rugsSelected: prev.rugsSelected.includes(rugId)
        ? prev.rugsSelected.filter(id => id !== rugId)
        : [...prev.rugsSelected, rugId]
    }));
  };

  const validateForm = () => {
    if (!user) {
      toast.error('Please log in to book an appointment');
      return false;
    }

    if (!formData.date) {
      toast.error('Please select a date');
      return false;
    }

    if (!formData.phoneNumber) {
      toast.error('Please provide a phone number');
      return false;
    }

    if (formData.appointmentType === 'physical' && !formData.address) {
      toast.error('Please provide an address for physical appointments');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/appointments/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Appointment booked successfully!');
        if (onSuccess) onSuccess();
        // Reset form
        setFormData({
          appointmentType: 'virtual',
          date: '',
          rugsSelected: [],
          bringFavorites: false,
          notes: '',
          address: '',
          phoneNumber: ''
        });
      } else {
        toast.error(data.message || 'Failed to book appointment');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const filteredRugs = rugs.filter(rug =>
    rug.name?.toLowerCase().includes(rugSearchTerm.toLowerCase())
  );

  const selectedRugsData = rugs.filter(rug => formData.rugsSelected.includes(rug._id));

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {!user ? (
        <div className="text-center py-12">
          <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Login Required</h3>
          <p className="text-gray-600 mb-6">Please log in to book an appointment with our experts.</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            Go to Login
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Book Your Appointment</h2>
            <p className="text-gray-600">Schedule a consultation with our carpet experts</p>
          </div>

          {/* Appointment Type Selection */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Choose Appointment Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={`flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                formData.appointmentType === 'virtual' 
                  ? 'border-red-500 bg-red-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}>
                <input
                  type="radio"
                  name="appointmentType"
                  value="virtual"
                  checked={formData.appointmentType === 'virtual'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <Video className="w-8 h-8 mr-4 text-red-500" />
                <div>
                  <div className="text-lg font-semibold text-gray-900">Virtual Meeting</div>
                  <div className="text-sm text-gray-600">Zoom/Google Meet consultation</div>
                  <div className="text-xs text-gray-500 mt-1">Perfect for initial discussions</div>
                </div>
              </label>

              <label className={`flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                formData.appointmentType === 'physical' 
                  ? 'border-red-500 bg-red-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}>
                <input
                  type="radio"
                  name="appointmentType"
                  value="physical"
                  checked={formData.appointmentType === 'physical'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <MapPin className="w-8 h-8 mr-4 text-red-500" />
                <div>
                  <div className="text-lg font-semibold text-gray-900">In-Person Visit</div>
                  <div className="text-sm text-gray-600">Visit our Delhi showroom</div>
                  <div className="text-xs text-gray-500 mt-1">See and feel our carpets firsthand</div>
                </div>
              </label>
            </div>
          </div>

          {/* Date Selection */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              <CalendarIcon className="inline w-5 h-5 mr-2" />
              Select Your Preferred Date
            </label>
            <Calendar
              availableDates={availableDates}
              selectedDate={formData.date}
              onDateSelect={(date) => setFormData(prev => ({ ...prev, date }))}
            />
            {formData.date && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">
                  Selected: {new Date(formData.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            )}
          </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Phone className="inline w-4 h-4 mr-2" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>

        {/* Address (for physical appointments) */}
        {formData.appointmentType === 'physical' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <MapPin className="inline w-4 h-4 mr-2" />
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your address in Delhi"
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
        )}

        {/* Rug Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Rug Selection
          </label>
          
          {/* Bring Favorites Option */}
          {userFavorites.length > 0 && (
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="bringFavorites"
                  checked={formData.bringFavorites}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  <Heart className="inline w-4 h-4 mr-1 text-red-500" />
                  Bring my favorites ({userFavorites.length} rugs)
                </span>
              </label>
            </div>
          )}

          {/* Manual Selection */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowRugSelection(!showRugSelection)}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              {showRugSelection ? 'Hide' : 'Show'} manual selection
            </button>
          </div>

          {showRugSelection && (
            <div className="border border-gray-200 rounded-lg p-4">
              {/* Search */}
              <input
                type="text"
                placeholder="Search rugs..."
                value={rugSearchTerm}
                onChange={(e) => setRugSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />

              {/* Rug List */}
              <div className="max-h-60 overflow-y-auto space-y-2">
                {filteredRugs.map(rug => (
                  <label key={rug._id} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.rugsSelected.includes(rug._id)}
                      onChange={() => handleRugSelection(rug._id)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <div className="ml-3 flex-1">
                      <div className="text-sm font-medium text-gray-900">{rug.name}</div>
                      <div className="text-xs text-gray-500">{rug.material} • {rug.size}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Selected Rugs Display */}
          {selectedRugsData.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Selected Rugs:</p>
              <div className="flex flex-wrap gap-2">
                {selectedRugsData.map(rug => (
                  <span key={rug._id} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {rug.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Additional Notes (Optional)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Any specific requirements or questions..."
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || !user}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>
        </div>

        {!user && (
          <p className="text-sm text-center text-gray-600">
            Please <a href="/login" className="text-red-600 hover:underline">log in</a> to book an appointment
          </p>
        )}
        </form>
      )}
    </div>
  );
};

export default BookAppointment;