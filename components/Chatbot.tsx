"use client";

import { useState } from "react";
import { X, Send, MessageCircle, User, Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setStep(0);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }
  };

  const handleNext = () => {
    if (step === 0 && !formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (step === 1 && !formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (step === 1 && !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (step === 3 && !formData.message.trim()) {
      toast.error("Please enter your message");
      return;
    }
    
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Not provided",
          message: formData.message,
          source: "Chatbot Widget",
        }),
      });

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setStep(4); // Success step
        setTimeout(() => {
          setIsOpen(false);
          setStep(0);
          setFormData({ name: "", email: "", phone: "", message: "" });
        }, 3000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, isTextarea: boolean = false) => {
    if (e.key === "Enter" && !isTextarea) {
      e.preventDefault();
      if (step < 3) {
        handleNext();
      } else {
        handleSubmit();
      }
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 bg-[#FF6B03] hover:bg-[#e55d02] text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 group"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
          {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            !
          </span> */}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#07182d] to-[#0a2545] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF6B03] rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Xpromo Support</h3>
                <p className="text-xs text-gray-300">We're here to help!</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="hover:bg-white/10 rounded-full p-1 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {/* Welcome Message */}
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-[#FF6B03] rounded-full flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[80%]">
                <p className="text-sm text-gray-800">
                  👋 Hi! I'm here to help you get in touch with our team. Let's get started!
                </p>
              </div>
            </div>

            {/* Step 0: Name */}
            {step >= 0 && (
              <>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-[#FF6B03] rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[80%]">
                    <p className="text-sm text-gray-800">What's your name?</p>
                  </div>
                </div>
                {step >= 1 && formData.name && (
                  <div className="flex gap-2 justify-end">
                    <div className="bg-[#FF6B03] text-white rounded-2xl rounded-tr-none p-3 shadow-sm max-w-[80%]">
                      <p className="text-sm">{formData.name}</p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Step 1: Email */}
            {step >= 1 && (
              <>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-[#FF6B03] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[80%]">
                    <p className="text-sm text-gray-800">
                      Great! What's your email address?
                    </p>
                  </div>
                </div>
                {step >= 2 && formData.email && (
                  <div className="flex gap-2 justify-end">
                    <div className="bg-[#FF6B03] text-white rounded-2xl rounded-tr-none p-3 shadow-sm max-w-[80%]">
                      <p className="text-sm">{formData.email}</p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Step 2: Phone */}
            {step >= 2 && (
              <>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-[#FF6B03] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[80%]">
                    <p className="text-sm text-gray-800">
                      Phone number? (Optional - Skip if you prefer)
                    </p>
                  </div>
                </div>
                {step >= 3 && (
                  <div className="flex gap-2 justify-end">
                    <div className="bg-[#FF6B03] text-white rounded-2xl rounded-tr-none p-3 shadow-sm max-w-[80%]">
                      <p className="text-sm">
                        {formData.phone || "Skipped"}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Step 3: Message */}
            {step >= 3 && (
              <>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-[#FF6B03] rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[80%]">
                    <p className="text-sm text-gray-800">
                      Perfect! How can we help you today?
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[80%]">
                  <p className="text-sm text-green-800 font-medium">
                    🎉 Message sent successfully! We'll get back to you soon.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          {step < 4 && (
            <div className="p-4 bg-white border-t border-gray-200">
              {step === 0 && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter your name..."
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    onKeyPress={(e) => handleKeyPress(e)}
                    className="flex-1"
                    autoFocus
                  />
                  <Button
                    onClick={handleNext}
                    className="bg-[#FF6B03] hover:bg-[#e55d02] text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {step === 1 && (
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onKeyPress={(e) => handleKeyPress(e)}
                    className="flex-1"
                    autoFocus
                  />
                  <Button
                    onClick={handleNext}
                    className="bg-[#FF6B03] hover:bg-[#e55d02] text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      type="tel"
                      placeholder="Phone number (optional)"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      onKeyPress={(e) => handleKeyPress(e)}
                      className="flex-1"
                      autoFocus
                    />
                    <Button
                      onClick={handleNext}
                      className="bg-[#FF6B03] hover:bg-[#e55d02] text-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <button
                    onClick={() => {
                      setFormData({ ...formData, phone: "" });
                      handleNext();
                    }}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    Skip this step
                  </button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-2">
                  <Textarea
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="min-h-[80px] resize-none"
                    autoFocus
                  />
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-[#FF6B03] hover:bg-[#e55d02] text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

