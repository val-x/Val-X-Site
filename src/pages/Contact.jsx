import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaBuilding,
} from "react-icons/fa";
import { supabase } from "../lib/supabase";
import { toast } from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form data
      if (
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.message.trim()
      ) {
        throw new Error("Please fill in all fields");
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Submit to Supabase
      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          status: "pending",
        },
      ]);

      if (error) throw error;

      // Clear form
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message || "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Hero Section */}
        <div className="relative pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Have a question or want to work together? We'd love to hear from
                you.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    Contact Information
                  </h2>
                  <p className="text-gray-400">
                    Reach out to us through any of these channels. We're here to
                    help!
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 
                      rounded-lg border border-white/10"
                    >
                      <img
                        src="/assets/images/logo.png"
                        alt="VAL-X Logo"
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Company Name</h3>
                      <p className="text-gray-400">
                        VAL-X INTERNATIONAL TECHNOLOGIES PRIVATE LIMITED
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 
                      rounded-lg border border-white/10"
                    >
                      <FaMapMarkerAlt className="text-cyan-400" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Our Location</h3>
                      <p className="text-gray-400">
                        Veda, 673661 Mavoor Kozhikode, Kerala, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 
                      rounded-lg border border-white/10"
                    >
                      <FaPhone className="text-violet-400" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone Number</h3>
                      <p className="text-gray-400">+91 8078447125</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 
                      rounded-lg border border-white/10"
                    >
                      <FaEnvelope className="text-fuchsia-400" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Address</h3>
                      <p className="text-gray-400">cto@val-x.com</p>
                    </div>
                  </div>
                </div>

                {/* Map or Additional Info */}
                <div className="relative mt-8">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 
                    blur-3xl"
                  />
                  <div className="relative bg-gray-900 p-6 rounded-2xl border border-white/10">
                    <h3 className="font-semibold mb-3">Business Hours</h3>
                    <div className="space-y-2 text-gray-400">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 9:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 
                    blur-3xl"
                  />
                  <form
                    onSubmit={handleSubmit}
                    className="relative bg-gray-900 p-8 rounded-2xl border border-white/10 space-y-6"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none 
                          focus:ring-2 focus:ring-violet-500 text-white"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none 
                          focus:ring-2 focus:ring-violet-500 text-white"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none 
                          focus:ring-2 focus:ring-violet-500 text-white resize-none"
                        required
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 
                        text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                      ) : (
                        "Send Message"
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
