"use client";

import { BreadCrumbCustom } from "@/components/BreadCrumpCustom";
import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import ContactUsAnimation from "@/public/animation/ContactUsAnimation.json";
import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { toast } from "sonner";

export default function ContactForm() {
  const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: ""
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Memoize the Lottie animation to prevent re-rendering
  const memoizedLottie = useMemo(() => (
    <div className=" w-full flex items-center justify-center">
      <div className=" w-[280px]">
        <Lottie animationData={ContactUsAnimation} loop={true} />
      </div>
    </div>
  ), []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.company.trim()) errors.company = "Company is required";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Please enter a valid email";
    if (!formData.message.trim()) errors.message = "Message is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Prepare email data
      const emailData = {
        name: formData.name,
        company: formData.company,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        submissionDate: new Date()
      };

      // Send email via API route
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...emailData,
          emailType: "contact" // To differentiate from quote submissions
        }),
      });

      const result = await response.json();
      
      if (!response.ok || !result.success) {
        const errorMessage = result.error || result.details || "Failed to send message";
        throw new Error(errorMessage);
      }

      // Success
      setSubmissionSuccess(true);
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        message: ""
      });
      setFormErrors({});
      
      toast.success("Message sent successfully! We'll get back to you soon.");
      
    } catch (error: any) {
      console.error("Contact form submission error:", error);
      toast.error(error.message || "An error occurred while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper className=" pt-20 ">
      <div className="max-w-[1280px] mx-auto">
        <BreadCrumbCustom
          currentPage={"contact us"}
          previousPages={[{ name: "HOME", url: "/" }]}
        />
        <h1 className="text-4xl md:text-5xl font-bold text-center text-newprimary mt-5 mb-12">
          GET IN TOUCH
        </h1>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column */}
          <div className="space-y-6  h-full flex flex-col items-start justify-center">
            <div>
              <h2 className="  text-xl font-bold ">Your merch, made easy</h2>
              <p className="  text-base ">
                From startups to enterprise, we&apos;re here to help
              </p>
            </div>

            <div className="space-y-4 ml-10">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-newsecondary  p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="ml-5 flex-1 text- text-sm  font-semibold">
                  ALL-IN-ONE MERCH SUPPORT
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-newsecondary p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="ml-5 flex-1 text- text-sm  font-semibold">
                  DEDICATED EXPERTS
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-newsecondary  p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="ml-5 flex-1 text- text-sm  font-semibold">
                  FREE DESIGN ASSISTANCE
                </span>
              </div>
            </div>
            {memoizedLottie}
          </div>

          {/* Right Column - Form */}
          <div className="bg-newsecondary rounded-3xl p-10 space-y-4 ">
            {submissionSuccess ? (
              <div className="text-center py-8">
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-2">Thank You!</h3>
                  <p>Your message has been sent successfully.</p>
                  <p className="mt-2">We'll get back to you as soon as possible.</p>
                  <Button 
                    onClick={() => setSubmissionSuccess(false)}
                    className="mt-4 bg-green-600 hover:bg-green-700"
                  >
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 ">
                  <div>
                    <label className="text-xs font-bold ml-2">Name *</label>
                    <Input 
                      className={`bg-white rounded-full ${formErrors.name ? "border-red-500" : ""}`}
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-xs mt-1 ml-2">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-bold ml-2">Company *</label>
                    <Input 
                      className={`bg-white rounded-full ${formErrors.company ? "border-red-500" : ""}`}
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                    />
                    {formErrors.company && (
                      <p className="text-red-500 text-xs mt-1 ml-2">{formErrors.company}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold ml-2">Phone *</label>
                    <Input 
                      className={`bg-white rounded-full ${formErrors.phone ? "border-red-500" : ""}`}
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-xs mt-1 ml-2">{formErrors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-bold ml-2">Business Email *</label>
                    <Input 
                      className={`bg-white rounded-full ${formErrors.email ? "border-red-500" : ""}`}
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1 ml-2">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold ml-2">Message *</label>
                  <Textarea 
                    className={`bg-white rounded-3xl resize-none h-32 ${formErrors.message ? "border-red-500" : ""}`}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                  />
                  {formErrors.message && (
                    <p className="text-red-500 text-xs mt-1 ml-2">{formErrors.message}</p>
                  )}
                </div>

                <Button 
                  className="w-56 mx-auto block rounded-full bg-gray-800 font-bold disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      SENDING...
                    </div>
                  ) : (
                    "SUBMIT"
                  )}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className=" flex items-center justify-center">
          <div className="mt-8  bg-newprimary w-[350px] px-10 rounded-full text-white  py-5 mb-10">
            <div className="">
              <div className=" flex flex-row  mb-3">
                <Image
                  className="h-7 mr-4 w-auto"
                  src={"/dark-mail.png"}
                  height={200}
                  width={200}
                  alt="mail"
                />
                <div className="flex-1 ">
                  <h1 className="  w-full text-center  font-semibold">
                    info@xpromo.com.au
                  </h1>
                </div>
              </div>
              <div className=" flex flex-row items-center">
                <div className="">
                  <Image
                    className="h-7 mr-4 w-auto"
                    src={"/dark-phone.png"}
                    height={200}
                    width={200}
                    alt="phone"
                  />
                </div>

                <div className="flex-1 ">
                  <h1 className="  text-center w-full italic text- font-semibold">
                    02 8014 3214
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
