"use client";
import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  User,
  MessageSquare,
} from "lucide-react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: ContactFormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start text-sm p-8 bg-gradient-to-br from-slate-700 via-black to-emerald-900 text-white">
      <div className="w-full max-w-4xl w-full mt-[60px] md:mt-[120px]">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3 justify-center">
          <MessageCircle className="text-white" size={28} />
          <span className="text-white">Contact Us</span>
        </h2>

        <div className="space-y-8">
          {/* Address */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="bg-gray-700 border border-green-400/30 p-3 rounded-lg">
              <MapPin className="text-green-400" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-green-400 mb-1">Address</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                VKS Computer and Software Co., Ltd.
                <br />
                45/271 Moo 6, Bang Krathuk Sub-district
                <br />
                Sampran District, Nakhon Pathom 73210
                <br />
                Thailand
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="bg-gray-700 border border-green-400/30 p-3 rounded-lg">
              <Phone className="text-green-400" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-green-400 mb-1">Phone</h3>
              <a
                href="tel:+66841842815"
                className="text-gray-300 hover:text-green-400 transition-colors text-sm md:text-base"
              >
                +66 84 184 2815
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="bg-gray-700 border border-green-400/30 p-3 rounded-lg">
              <Mail className="text-green-400" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-green-400 mb-1">Email</h3>
              <a
                href="mailto:contact@cmswap.xyz"
                className="text-gray-300 hover:text-green-400 transition-colors text-sm md:text-base"
              >
                contact@cmswap.xyz
              </a>
            </div>
          </div>

          {/* Business Hours */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="bg-gray-700 border border-green-400/30 p-3 rounded-lg">
              <Clock className="text-green-400" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-green-400 mb-1">
                Business Hours
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                Every Day: 10:00 AM - 5:00 PM (UTC+7)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Future Use Sections (Commented) ---------- */}

      {/* Contact Form */}
      {/*
      <div className="bg-gray-800 border border-green-400/30 rounded-xl p-8 shadow-sm mt-12 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <MessageSquare className="text-green-400" size={28} />
          <span className="text-green-400">Send us a Message</span>
        </h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-green-400 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-500" size={18} />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-green-400/30 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 text-white placeholder-gray-500 transition-colors"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-green-400 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-green-400/30 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 text-white placeholder-gray-500 transition-colors"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-green-400 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-green-400/30 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 text-white placeholder-gray-500 transition-colors"
              placeholder="What is this about?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-green-400 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-gray-700 border border-green-400/30 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 text-white placeholder-gray-500 transition-colors resize-none"
              placeholder="Tell us how we can help you..."
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Send size={18} />
            Send Message
          </button>
        </div>
      </div>
      */}

      {/* Google Maps Section */}
      {/*
      <div className="bg-gray-800 border border-green-400/30 rounded-xl p-8 shadow-sm mt-12 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <MapPin className="text-green-400" size={28} />
          <span className="text-green-400">Find Us</span>
        </h2>
        <div className="relative rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?...your-map-link..."
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-96 md:h-80 lg:h-96"
          />
        </div>
      </div>
      */}

      {/* Quick Support Widget */}
      {/*
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-gradient-to-r from-green-400 to-emerald-400 text-white p-4 rounded-full border border-green-400/30 cursor-pointer group shadow-sm">
          <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
        </div>
      </div>
      */}
    </div>
  );
}
