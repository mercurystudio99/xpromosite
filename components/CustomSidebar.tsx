"use client";

import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
  updateItemQtyCustom,
  updateSpecialInstruction,
  clearCart,
} from "@/redux/slices/cartSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { CustomDatePicker } from "./CustomDatePicker";
import { Loader2 } from "lucide-react";
import { uploadProjectLogo } from "@/lib/project-utils";
import { toast } from "sonner";
import { generateQuoteEmailHtml } from "@/lib/email-templates/quote-submission";
import { sendQuoteSubmissionEmail } from "@/lib/email_";

const CustomSidebar = ({ isFactoryDirect }: any) => {
  const dispatch = useDispatch();
  const { cartItems, totalQty, totalAmount } = useSelector((state: RootState) => state.cart);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [nodeadline, setNoDeadline] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);

  // Project form data
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Form validation
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Auto-open sidebar when items are added to cart
  useEffect(() => {
    if (totalQty > 0) {
      setIsOpen(true);
    }
  }, [totalQty]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const resetDeadline = () => {
    setDate(undefined);
    setNoDeadline(false);
  };

  const handleSpecialInstructionChange = (id: string, instruction: string) => {
    dispatch(updateSpecialInstruction({ id, instruction }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!name.trim()) errors.name = "Name is required";
    if (!company.trim()) errors.company = "Company is required";
    if (!phone.trim()) errors.phone = "Phone is required";
    if (!email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      errors.email = "Please enter a valid email";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      let logoUrl = null;
      if (logoFile) {
        setLogoUploading(true);
        try {
          logoUrl = await uploadProjectLogo(logoFile);
        } catch (error) {
          console.error("Error uploading logo:", error);
          toast.error("Failed to upload logo. Please try again.");
          setLogoUploading(false);
          return;
        }
        setLogoUploading(false);
      }

      // Prepare data for both project submission and email
      const projectData = {
        projectFor: "Custom Project",
        budget: totalAmount.toString(),
        quantity: cartItems.reduce((total, item) => total + item.quantity, 0),
        deadline: date?.toISOString() || null,
        noDeadline: nodeadline,
        logo: logoUrl,
        specialInstructions,
        name,
        company,
        phone,
        email,
        status: 'new',
        products: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          specialInstruction: item.specialInstruction,
        })),
      };

      // Submit project to API
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit project");
      }

      // Prepare and send email
      const emailData = {
        products: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          specialInstruction: item.specialInstruction,
          price: (item.discountedPrice || item.price) * item.quantity
        })),
        totalAmount,
        targetDate: date,
        noDeadline: nodeadline,
        projectDescription: specialInstructions,
        hasLogo: !!logoUrl,
        name,
        company,
        phone,
        email,
        submissionDate: new Date()
      };

      // Send email via API route
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      const emailResult = await emailResponse.json();
      console.log('Email API Response:', emailResult);
      
      if (!emailResponse.ok || !emailResult.success) {
        const errorMessage = emailResult.error || emailResult.details || "Failed to send email notification";
        console.error("Email send error:", {
          status: emailResponse.status,
          statusText: emailResponse.statusText,
          result: emailResult
        });
        throw new Error(errorMessage);
      }

      // Only set success and redirect if both project submission and email sending succeed
      setSubmissionSuccess(true);
      dispatch(clearCart());
      resetForm();

      // Redirect after 3 seconds
      setTimeout(() => {
        window.location.href = "/thankyou";
      }, 3000);
    } catch (error: any) {
      console.error("Form submission error:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      toast.error(error.message || "An error occurred while submitting the form. Please try again.");
      setSubmissionSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setDate(undefined);
    setNoDeadline(false);
    setLogoFile(null);
    setLogoPreview(null);
    setSpecialInstructions("");
    setName("");
    setCompany("");
    setPhone("");
    setEmail("");
    setFormErrors({});
  };

  return (
    <>
      {/* Trigger Button */}
      <div
        onClick={toggleSidebar}
        className="flex items-center gap-2 cursor-pointer relative z-50"
      >
        {totalQty > 0 && (
          <p
            className={`w-fit ${!isFactoryDirect
                ? "text-white bg-newprimary"
                : "text-white bg-newprimary"
              } rounded-full flex items-center justify-center absolute -top-2 -right-2 text-xs min-h-5 min-w-5 text-center`}
          >
            {totalQty}
          </p>
        )}
        <Image
          src="/cart.png"
          className="h-10 w-auto"
          width={100}
          height={100}
          alt="Shopping Cart"
        />
      </div>

      {/* Custom Sidebar - Now opens from left side */}
      <div
        className={`fixed w-[100vw] md:w-[60vw] top-0 right-0 h-[100vh] border-l-2 border-graytext bg-white shadow-lg z-50 transition-transform transform duration-700 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-3xl font-semibold uppercase">Quote Summary</h2>
          <button className="text-3xl" onClick={toggleSidebar}>
            <Image
              src={"/cross.png"}
              height={100}
              width={100}
              alt="Close"
              className="h-5 w-auto"
            />
          </button>
        </div>

        {/* Sidebar Content */}
        {totalQty > 0 ? (
          <ScrollArea className="px-4 overflow-hidden overscroll-y-auto h-[90vh]">
            <div className="max-w-3xl mx-auto p-4 space-y-8">
              {/* Success message */}
              {submissionSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4">
                  <h3 className="font-bold text-lg">Thank You!</h3>
                  <p>Your project request has been submitted successfully.</p>
                  <p className="mt-2">
                    We'll contact you shortly with a quote for your project.
                  </p>
                </div>
              )}

              {/* Product Section */}
              {cartItems.map((citem) => (
                <Card key={citem.id} className="p-4 relative border-newprimary">
                  <button
                    onClick={() => dispatch(removeFromCart(citem.id))}
                    className="absolute right-4 top-0"
                  >
                    <Image
                      src={"/cross.png"}
                      height={100}
                      width={100}
                      alt="X"
                      className="h-4 w-auto mt-1"
                    />
                  </button>
                  <div className="pt-2">
                    {/* Product details row */}
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                      <Image
                        src={citem?.images[0].url}
                        alt="Trucker Cap"
                        width={200}
                        height={200}
                        className="object-contain h-20 w-20"
                      />
                      <div className="lg:space-y-4 flex-1">
                        <h2 className="text-lg font-bold ">{citem.name}</h2>
                        <div className="flex items-center gap-4">
                          <span className="font-bold">QTY</span>

                          <div className="flex flex-row items-center justify-center">
                            <div className="flex-1 flex items-center justify-center">
                              <div className="flex items-center mt-2 space-x-4 border-2 border-newprimary ml-10 rounded-full">
                                <button
                                  type="button"
                                  onClick={() => dispatch(decreaseQty(citem.id))}
                                  className="px-3 text-3xl rounded-md"
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  value={citem.quantity}
                                  onChange={(e) => {
                                    const newQuantity = parseInt(
                                      e.target.value,
                                      10
                                    );
                                    if (!isNaN(newQuantity) && newQuantity > 0) {
                                      dispatch(
                                        updateItemQtyCustom({
                                          id: citem.id,
                                          quantity: newQuantity,
                                        })
                                      );
                                    }
                                  }}
                                  className="text-lg italic font-semibold w-16 bg-transparent text-center border-0 focus:outline-none"
                                  min="0"
                                />
                                <style>
                                  {`
                                  input[type="number"]::-webkit-outer-spin-button,
                                  input[type="number"]::-webkit-inner-spin-button {
                                    -webkit-appearance: none;
                                    margin: 0;
                                  }
                                  
                                  input[type="number"] {
                                    -moz-appearance: textfield; /* Firefox */
                                  }
                                  `}
                                </style>
                                <button
                                  type="button"
                                  onClick={() => dispatch(increaseQty(citem.id))}
                                  className="px-3 text-3xl rounded-md"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-base">Estimated:</span>
                          <span className="ml-6 text-2xl font-bold">
                            ${((citem.discountedPrice || citem.price || 0) * citem.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Special instructions row - full width */}
                    <div className="w-full mt-4">
                      <textarea
                        value={citem.specialInstruction || ""}
                        onChange={(e) =>
                          handleSpecialInstructionChange(
                            citem.id,
                            e.target.value
                          )
                        }
                        className="border italic rounded-[22px] text-xs min-h-[70px] w-full p-2"
                        style={{ minHeight: "70px" }}
                        placeholder="SPECIAL INSTRUCTIONS"
                        name="special-instruction"
                        id="special-instruction"
                      />
                    </div>
                  </div>
                </Card>
              ))}

              <>
                <Accordion
                  type="single"
                  collapsible
                  defaultValue="step-1"
                  className="w-full"
                >
                  <AccordionItem
                    value="step-1"
                    className="border rounded-3xl overflow-hidden bg-newsecondary"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline ">
                      <h2 className="text-xl font-semibold text-slate-800">
                        STEP 1 - Your Project
                      </h2>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 space-y-4">
                      <div className="bg-newsecondary rounded-3xl">
                        <div className="mb-4 flex items-center">
                          <label className="block font-bold mr-5 text-[#3E6AA2]">
                            What&apos;s your target date?
                          </label>
                          <div className="flex items-center space-x-4 mt-2">
                            {!date && (
                              <label className="flex items-center space-x-2">
                                <button
                                  onClick={() => setNoDeadline(true)}
                                  className={`px-4 italic text-[10px] h-6 rounded-full border-2 ${nodeadline
                                      ? "bg-newprimary text-white"
                                      : ""
                                    } border-newprimary focus:ring-2 focus:ring-newprimary focus:bg-newprimary text-white`}
                                >
                                  No Deadline
                                </button>
                              </label>
                            )}
                            {!nodeadline && (
                              <div>
                                <CustomDatePicker
                                  date={date}
                                  setDate={setDate}
                                />
                              </div>
                            )}

                            {nodeadline === true && (
                              <button className="" onClick={resetDeadline}>
                                <Image
                                  className="h-4 w-auto"
                                  src={"/cross.png"}
                                  alt="cross"
                                  height={100}
                                  width={100}
                                />
                              </button>
                            )}
                            {date !== undefined && (
                              <button className="" onClick={resetDeadline}>
                                <Image
                                  className="h-4 w-auto"
                                  src={"/cross.png"}
                                  alt="cross"
                                  height={100}
                                  width={100}
                                />
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-center items-center">
                          <div className="w-[90%] h-px bg-white my-2" />
                        </div>

                        <div className="flex items-center justify-center mb-4">
                          <div className="gap-3 pt-5 flex  items-center">
                            <div className="flex flex-row items-center gap-3">
                              <label
                                htmlFor="logo"
                                className="px-4 italic rounded-full border-2 border-newprimary cursor-pointer text-white bg-newprimary focus:ring-2 focus:ring-newprimary focus:bg-newprimary focus:text-white font-medium"
                              >
                                UPLOAD YOUR LOGO
                              </label>

                              <input
                                id="logo"
                                type="file"
                                
                                onChange={handleLogoChange}
                                className="mt-2 hidden w-full border rounded-md bg-white shadow-sm focus:ring-newprimary focus:border-newprimary"
                                accept=".jpg,.jpeg,.png,.svg,.eps,.ai"
                              />
                              <p className="text-sm text-[#7A869F] italic flex items-center justify-center uppercase">
                                EPS, AI, or SVG preferred
                              </p>
                            </div>

                            {/* Logo preview */}
                            {logoPreview && (
                              <div className="mt-2 relative">
                                <button
                                  onClick={() => {
                                    setLogoFile(null);
                                    setLogoPreview(null);
                                  }}
                                  className="absolute -top-2 -right-2 bg-white rounded-full p-1"
                                >
                                  <Image
                                    src="/cross.png"
                                    alt="Remove"
                                    width={16}
                                    height={16}
                                  />
                                </button>
                                <div className="border rounded p-2 bg-white">
                                  <Image
                                    src={logoPreview}
                                    alt="Logo preview"
                                    width={50}
                                    height={50}
                                    className="object-contain h-20"
                                    unoptimized
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
  
                        <div className="mt-3">
                          <textarea
                            className="mt-2 w-full border rounded-[22px] min-h-[70px] px-5 pt-3 shadow-sm focus:ring-newprimary focus:border-newprimary italic"
                            style={{ minHeight: "70px" }}
                            placeholder="SPECIAL INSTRUCTIONS"
                            value={specialInstructions}
                            onChange={(e) =>
                              setSpecialInstructions(e.target.value)
                            }
                          ></textarea>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>

              <>
                <Accordion
                  type="single"
                  collapsible
                  defaultValue="step-1"
                  className="w-full"
                >
                  <AccordionItem
                    value="step-1"
                    className="border rounded-3xl overflow-hidden bg-newsecondary"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline ">
                      <h2 className="text-xl font-semibold text-slate-800">
                        STEP 2 - CONTACT DETAILS
                      </h2>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 space-y-4">
                      <div className="">
                        <div className="grid bg-newsecondary px-4 rounded-3xl grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <label
                              className="text-[#3E6AA2] font-bold"
                              htmlFor="Name"
                            >
                              Name*
                            </label>
                            <input
                              type="text"
                              id="Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className={`border-gray-300 px-4 rounded-full py-1 shadow-sm focus:ring-newprimary focus:border-newprimary ${formErrors.name
                                  ? "border-red-500"
                                  : "border-gray-300"
                                }`}
                            />
                            {formErrors.name && (
                              <p className="text-red-500 text-sm mt-1">
                                {formErrors.name}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col">
                            <label
                              className="text-[#4573A9] font-bold"
                              htmlFor="company"
                            >
                              Company*
                            </label>
                            <input
                              type="text"
                              id="company"
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                              className={`border-gray-300 px-4 rounded-full py-1 shadow-sm focus:ring-newprimary focus:border-newprimary ${formErrors.company
                                  ? "border-red-500"
                                  : "border-gray-300"
                                }`}
                            />
                            {formErrors.company && (
                              <p className="text-red-500 text-sm mt-1">
                                {formErrors.company}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col text-[#3E6AA2]">
                            <label
                              className="text-[#4573A9] font-bold"
                              htmlFor="phone"
                            >
                              Phone Number*
                            </label>
                            <input
                              type="text"
                              id="phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className={`border-gray-300 px-4 rounded-full py-1 shadow-sm focus:ring-newprimary focus:border-newprimary ${formErrors.phone
                                  ? "border-red-500"
                                  : "border-gray-300"
                                }`}
                            />
                            {formErrors.phone && (
                              <p className="text-red-500 text-sm mt-1">
                                {formErrors.phone}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <label
                              className="text-[#4573A9] font-bold"
                              htmlFor="email"
                            >
                              Business Email*
                            </label>
                            <input
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className={`border-gray-300 px-4 rounded-full py-1 shadow-sm focus:ring-newprimary focus:border-newprimary ${formErrors.email
                                  ? "border-red-500"
                                  : "border-gray-300"
                                }`}
                            />
                            {formErrors.email && (
                              <p className="text-red-500 text-sm mt-1">
                                {formErrors.email}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>

              {/* Grand Total Section */}
              <div className="flex items-center justify-center mt-8 mb-4">
                <span className="text-xl">Estimated Total:</span>
                <span className="ml-4 text-4xl font-bold">
                  ${totalAmount.toLocaleString()}
                </span>
              </div>

              <div className="mt-8 text-center flex flex-col items-start">
                <div className="flex items-center justify-center w-full">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting || logoUploading}
                    className="px-10 py-2 rounded-full bg-newprimary font-bold text-white shadow-md transition-colors hover:text-newprimary border-2 border-newprimary hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        SUBMITTING...
                      </>
                    ) : (
                      "SUBMIT"
                    )}
                  </button>
                </div>

                {/* Orange section with lightning icons */}
                <div className="relative w-screen -ml-[50vw] left-1/2 right-1/2 bg-[#FF6600] mt-8 py-4 flex items-center justify-center">
                  <span className="text-2xl text-[#05172D] mr-2">⚡</span>
                  <span className="text-[#05172D] text-xl font-medium max-w-[50%]">No waiting — get a reply in 30 minutes! Submit to start the clock!</span>
                  <span className="text-2xl text-[#05172D] ml-2">⚡</span>
                </div>

                <p className="mt-4 text-start text-sm text-newprimary w-full">
                  <span className="font-bold text-lg">What&apos;s next? </span>
                  <br /> After finalizing your product selection, submit your
                  quote request. We will create free mock-ups and provide a
                  quotation.
                </p>
                <p className="uppercase font-bold text-sm">
                  no payment is required at this stage
                </p>
              </div>
            </div>
          </ScrollArea>
        ) : (
          <div>
            <p className="text-center pt-10">Cart Empty</p>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default CustomSidebar;
