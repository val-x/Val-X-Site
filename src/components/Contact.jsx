import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { supabase } from "../lib/supabase";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  return (
    <section className="py-20 bg-black" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-gray-400 mb-8">
              Have questions about our startup programs? Let's discuss how we
              can help bring your vision to life.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-100 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white 
                    placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-100 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white 
                    placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-100 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white 
                    placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Tell us about your startup idea..."
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl 
                  font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed
                  relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 
                  opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <span className="relative">
                  {isLoading ? (
                    <div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full 
                      animate-spin mx-auto"
                    />
                  ) : (
                    "Send Message"
                  )}
                </span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Contact Information
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-100 mb-4">
                  Office Location
                </h3>
                <p className="text-gray-400">
                  Veda  
                  <br />
                  Mavoor, Kozhikode
                  <br />
                  Kerala, India
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-100 mb-4">
                  Contact Details
                </h3>
                <p className="text-gray-400">
                  Email: cto@val-x.com
                  <br />
                  Phone: +91 8078447125
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-100 mb-4">
                  Office Hours
                </h3>
                <p className="text-gray-400">
                  Monday - Friday: 9:00 AM - 9:00 PM
                  <br />
                  Saturday: By appointment only
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
