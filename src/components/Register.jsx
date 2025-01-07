import { useState } from "react";
import { toast } from "react-hot-toast";
import { supabase } from "../lib/supabase";

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    website: "",
    referralCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      if (!formData.name.trim() || !formData.email.trim()) {
        throw new Error("Please fill in all required fields");
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Submit to Supabase
      const { error } = await supabase.from("partner_registrations").insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company?.trim() || null,
          phone: formData.phone?.trim() || null,
          website: formData.website?.trim() || null,
          referral_code: formData.referralCode?.trim() || null,
        },
      ]);

      if (error) throw error;

      // Clear form
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        website: "",
        referralCode: "",
      });

      toast.success("Partner registration submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message || "Failed to submit registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">
        Register as Partner
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-100 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 
              focus:ring-blue-500/50 focus:border-blue-500 text-white transition-all duration-300"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-100 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 
              focus:ring-blue-500/50 focus:border-blue-500 text-white transition-all duration-300"
            placeholder="your@email.com"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-100 mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 
              focus:ring-blue-500/50 focus:border-blue-500 text-white transition-all duration-300"
            placeholder="Your company name"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-100 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 
              focus:ring-blue-500/50 focus:border-blue-500 text-white transition-all duration-300"
            placeholder="Your phone number"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium text-gray-100 mb-2">
            Website
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 
              focus:ring-blue-500/50 focus:border-blue-500 text-white transition-all duration-300"
            placeholder="https://your-website.com"
          />
        </div>

        {/* Referral Code */}
        <div>
          <label className="block text-sm font-medium text-gray-100 mb-2">
            Referral Code
          </label>
          <input
            type="text"
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:ring-2 
              focus:ring-blue-500/50 focus:border-blue-500 text-white transition-all duration-300"
            placeholder="Enter referral code if you have one"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl 
            text-lg font-semibold transition-all duration-300 hover:opacity-90 hover:scale-[1.02] 
            hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed 
            disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Join Partner Network"
          )}
        </button>

        <p className="text-sm text-gray-400 text-center">
          By registering, you agree to our partner program terms and conditions.
        </p>
      </form>
    </div>
  );
};

export default Register;
