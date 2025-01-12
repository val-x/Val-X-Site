import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const Support = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [isChatLoaded, setIsChatLoaded] = useState(false);
  const [chatLoadError, setChatLoadError] = useState(null);

  // Fetch FAQs from Supabase
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const { data, error } = await supabase
          .from("faqs")
          .select("*")
          .eq("is_published", true);

        if (error) throw error;
        setFaqs(data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const filteredFaqs = faqs.filter(
    (faq) =>
      (selectedCategory === "all" || faq.category === selectedCategory) &&
      (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { error } = await supabase.from("support_tickets").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          status: "pending",
        },
      ]);

      if (error) throw error;

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      console.error("Error submitting support ticket:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle email support
  const handleEmailSupport = () => {
    const subject = encodeURIComponent("VAL-X Support Request");
    const body = encodeURIComponent(
      "Hello VAL-X Support Team,\n\nI need assistance with..."
    );
    window.location.href = `mailto:admin@val-x.com?subject=${subject}&body=${body}`;
  };

  // Function to handle documentation
  const handleViewDocs = () => {
    // You can either navigate to internal docs page or open external docs
    window.open("https://val-x.com/docs", "_blank"); // Replace with your actual docs URL
  };

  // Function to handle live chat
  const handleStartChat = () => {
    if (window.Tawk_API && typeof window.Tawk_API.toggle === "function") {
      window.Tawk_API.toggle();
      setShowChatWidget(!showChatWidget);
    } else {
      console.warn("Tawk.to widget is not available");
      setChatLoadError("Chat widget is not available");
    }
  };

  // Monitor Tawk.to availability
  useEffect(() => {
    const checkTawkToAvailability = () => {
      if (window.Tawk_API) {
        setIsChatLoaded(true);
        setChatLoadError(null);

        // Set up event handlers
        window.Tawk_API.onLoad = function () {
          console.log("Tawk.to widget loaded");
          setIsChatLoaded(true);
        };

        window.Tawk_API.onStatusChange = function (status) {
          console.log("Tawk.to status changed:", status);
        };
      } else {
        setIsChatLoaded(false);
        setChatLoadError("Chat widget is not available");
      }
    };

    // Check immediately and then every 2 seconds until loaded
    const initialCheck = checkTawkToAvailability();
    const interval = setInterval(checkTawkToAvailability, 2000);

    return () => {
      clearInterval(interval);
      setIsChatLoaded(false);
    };
  }, []);

  // Update the chat button UI to show loading/error states
  const renderChatButton = () => {
    if (chatLoadError) {
      return (
        <button
          onClick={() => window.location.reload()}
          className="text-red-400 font-medium hover:text-red-300 transition-colors duration-200 flex items-center"
        >
          Retry Chat
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      );
    }

    return (
      <button
        onClick={handleStartChat}
        disabled={!isChatLoaded}
        className={`text-purple-400 font-medium hover:text-purple-300 transition-colors duration-200 flex items-center ${
          !isChatLoaded ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isChatLoaded ? "Start Chat" : "Loading Chat..."}
        <svg
          className={`w-4 h-4 ml-1 ${!isChatLoaded ? "animate-spin" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-black pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
              <div className="max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Search for answers..."
                  className="w-full px-6 py-4 rounded-full bg-black/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Support Options */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 p-6 rounded-xl border border-gray-800"
            >
              <div className="bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Live Chat
              </h3>
              <p className="text-gray-400 mb-4">
                Chat with our support team in real-time
              </p>
              {renderChatButton()}
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 p-6 rounded-xl border border-gray-800"
            >
              <div className="bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Email Support
              </h3>
              <p className="text-gray-400 mb-4">
                Get help via email within 24 hours
              </p>
              <button
                onClick={handleEmailSupport}
                className="text-purple-400 font-medium hover:text-purple-300 transition-colors duration-200 flex items-center"
              >
                Send Email
                <svg
                  className="w-4 h-4 ml-1 transform transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 p-6 rounded-xl border border-gray-800"
            >
              <div className="bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Knowledge Base
              </h3>
              <p className="text-gray-400 mb-4">
                Browse our detailed documentation
              </p>
              <button
                onClick={handleViewDocs}
                className="text-purple-400 font-medium hover:text-purple-300 transition-colors duration-200 flex items-center"
              >
                View Docs
                <svg
                  className="w-4 h-4 ml-1 transform transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-white">
              Frequently Asked Questions
            </h2>
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === "all"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-100 hover:bg-gray-700"
                }`}
              >
                All
              </button>
              {Array.from(new Set(faqs.map((faq) => faq.category))).map(
                (category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full capitalize ${
                      selectedCategory === category
                        ? "bg-purple-600 text-white"
                        : "bg-gray-800 text-gray-100 hover:bg-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                )
              )}
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-gray-400 mt-4">Loading FAQs...</p>
                </div>
              ) : filteredFaqs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">
                    No FAQs found matching your criteria.
                  </p>
                </div>
              ) : (
                filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-900 p-6 rounded-lg border border-gray-800"
                  >
                    <h3 className="text-lg font-semibold mb-2 text-white">
                      {faq.question}
                    </h3>
                    <p className="text-gray-400">{faq.answer}</p>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-white">
              Still need help?
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-100 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
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
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-100 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-purple-600 text-white py-3 px-6 rounded-lg transition-colors ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-purple-700"
                }`}
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
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>

              {submitStatus && (
                <div
                  className={`mt-4 p-4 rounded-xl ${
                    submitStatus === "success"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {submitStatus === "success"
                    ? "Message sent successfully! We'll get back to you soon."
                    : "Error sending message. Please try again."}
                </div>
              )}
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Support;
