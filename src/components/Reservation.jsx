import React, { useState } from "react";
import emailjs from "emailjs-com";
import {
  Calendar,
  Clock,
  Users,
  User,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
emailjs.init("gkuIrujmYa6kA-IOo");

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    occasion: "",
    specialRequests: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const timeSlots = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
    "10:00 PM",
  ];

  const occasions = [
    "Casual Dining",
    "Birthday Celebration",
    "Anniversary",
    "Date Night",
    "Business Meeting",
    "Family Gathering",
    "Special Occasion",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (formData.guests < 1 || formData.guests > 20)
      newErrors.guests = "Guests must be between 1 and 20";

    // Check if date is in the past
    if (
      formData.date &&
      new Date(formData.date) < new Date().setHours(0, 0, 0, 0)
    ) {
      newErrors.date = "Please select a future date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const sendConfirmationEmail = () => {
    return emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_yyax9gb",
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_cpoxlw9",
      {
        to_name: formData.name,
        guest_count: formData.guests,
        reservation_date: new Date(formData.date).toLocaleDateString(),
        reservation_time: formData.time,
        email: formData.email,
        phone: formData.phone,
        occasion: formData.occasion,
        special_requests: formData.specialRequests || "None",
      },
      import.meta.env.VITE_EMAILJS_USER_ID || "gkuIrujmYa6kA-IOo"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // First send the email
      await sendConfirmationEmail();

      const reservation = {
        id: Date.now(),
        ...formData,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };
      console.log("Reservation created:", reservation);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Email sending failed:", error);
      alert("Failed to send confirmation. Please try WhatsApp: +8801720235330");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: 2,
      occasion: "",
      specialRequests: "",
    });
    setIsSubmitted(false);
    setErrors({});
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle className="mx-auto mb-6 text-green-500" size={64} />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Reservation Confirmed!
          </h2>
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-medium mb-2">
              Thank you, {formData.name}!
            </p>
            <p className="text-green-700 text-sm">
              Your table for {formData.guests}{" "}
              {formData.guests === 1 ? "guest" : "guests"} is reserved for:
            </p>
            <p className="text-green-800 font-semibold mt-2">
              {new Date(formData.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              at {formData.time}
            </p>
          </div>
          <p className="text-gray-600 text-sm mb-6">
            A confirmation email has been sent to {formData.email}. We look
            forward to serving you!
          </p>
          <button
            onClick={resetForm}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200"
          >
            Make Another Reservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5 py-20">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Reserve Your Table
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Book your perfect dining experience with us. Whether it's an
            intimate dinner for two or a celebration with friends, we'll make it
            memorable.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-6">
            <h2 className="text-2xl font-bold text-white text-center">
              Secure Your Spot
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <User className="mr-2 text-orange-600" size={20} />
                  Personal Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline mr-1" size={16} />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline mr-1" size={16} />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Reservation Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Calendar className="mr-2 text-orange-600" size={20} />
                  Reservation Details
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.date ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline mr-1" size={16} />
                    Time *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.time ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="inline mr-1" size={16} />
                    Number of Guests *
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      errors.guests ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    {[...Array(20)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                  {errors.guests && (
                    <p className="text-red-500 text-sm mt-1">{errors.guests}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occasion
                  </label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  >
                    <option value="">Select an occasion (optional)</option>
                    {occasions.map((occasion) => (
                      <option key={occasion} value={occasion}>
                        {occasion}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requests
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Any dietary restrictions, seating preferences, or special arrangements..."
              />
            </div>

            {/* Important Notice */}
            <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle
                  className="text-orange-600 mt-1 mr-2 flex-shrink-0"
                  size={20}
                />
                <div className="text-sm text-orange-800">
                  <p className="font-medium mb-1">Please Note:</p>
                  <ul className="space-y-1 text-orange-700">
                    <li>
                      • Reservations are held for 15 minutes past the scheduled
                      time
                    </li>
                    <li>• Large parties (8+ guests) may require a deposit</li>
                    <li>
                      • Cancellations must be made at least 2 hours in advance
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-12 py-4 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Confirming Reservation...
                  </div>
                ) : (
                  "Confirm Reservation"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-gray-600">
          <p>
            Need to modify or cancel your reservation?
            <br />
            Call us at{" "}
            <a
              href="tel:+8801720235330"
              className="text-orange-600 font-medium hover:underline"
            >
              +88 01720 235 330
            </a>{" "}
            or email{" "}
            <a
              href="mailto:oli.cste10@gmail.com"
              className="text-orange-600 font-medium hover:underline"
            >
              oli.cste10@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reservation;