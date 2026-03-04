import React, { useState } from "react";
import { ChevronDownIcon, Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CustomDatePicker } from "../CustomDatePicker";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { uploadProjectLogo, fileToBase64 } from "@/lib/project-utils";
import { useRouter } from "next/navigation";

const PForm = () => {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [nodeadline, setNoDeadline] = useState(false);
  const [peopleCount, setPeopleCount] = useState(50);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoUploading, setLogoUploading] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    projectFor: "",
    budget: "",
    quantity: peopleCount,
    specialInstructions: "",
    name: "",
    company: "",
    phone: "",
    email: "",
    logo: "",
  });

  // Reset deadline
  const resetDeadline = () => {
    setDate(undefined);
    setNoDeadline(false);
  };

  // Handle logo file change
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'application/postscript', 'application/illustrator'];
    if (!validTypes.includes(file.type)) {
      setFormError("Please select a valid logo file (JPEG, PNG, SVG, EPS, or AI)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFormError("Logo file size should be less than 5MB");
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
    setLogoFile(file);
    setFormError(null);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update quantity in form data when peopleCount changes
  React.useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      quantity: peopleCount,
    }));
  }, [peopleCount]);

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setFormError(null);
    setFormSuccess(false);
    
    // Validate form
    const requiredFields = [
      { field: "name", label: "Name" },
      { field: "email", label: "Business Email" },
    ];
    
    for (const { field, label } of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        setFormError(`${label} is required`);
        return;
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError("Please enter a valid email address");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Upload logo if selected
      let logoUrl = null;
      if (logoFile) {
        setLogoUploading(true);
        // Pass the File object directly to uploadProjectLogo
        const logoResponse = await uploadProjectLogo(logoFile);
        setLogoUploading(false);
        
        if (!logoResponse) {
          setFormError("Failed to upload logo, please try again");
          setIsSubmitting(false);
          return;
        }
        
        // Extract just the URL string from the response
        logoUrl = typeof logoResponse === 'object' 
          ? (logoResponse as { url: string }).url 
          : logoResponse;
      }
      
      // Prepare submission data
      const submissionData = {
        ...formData,
        logo: logoUrl, // Store just the URL string
        deadline: date ? date.toISOString() : null,
        noDeadline: nodeadline,
        status: 'new', // Set initial status as new
      };
      
      // Submit form data
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      
      if (!response.ok) {
        const data = await response.json();
        if (data.validationErrors) {
          // Handle specific validation errors
          const firstError = Object.values(data.validationErrors)[0] as string;
          throw new Error(firstError || 'Validation failed');
        }
        throw new Error(data.error || 'Failed to submit form');
      }

      // Prepare and send email to admin
      const emailData = {
        products: [
          {
            name: formData.projectFor,
            quantity: formData.quantity,
            specialInstruction: formData.specialInstructions,
            price: formData.budget // Include budget as price for homepage form
          }
        ],
        totalAmount: formData.budget,
        targetDate: date,
        noDeadline: nodeadline,
        projectDescription: formData.specialInstructions,
        hasLogo: !!logoUrl,
        name: formData.name,
        company: formData.company,
        phone: formData.phone,
        email: formData.email,
        submissionDate: new Date(),
        // Add new fields
        projectFor: formData.projectFor,
        budget: formData.budget,
        formType: 'homepage' as const
      };

      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
      const emailResult = await emailResponse.json();
      if (!emailResponse.ok || !emailResult.success) {
        throw new Error(emailResult.error || emailResult.details || 'Failed to send email notification');
      }

      // Reset form on success
      setFormData({
        projectFor: "",
        budget: "",
        quantity: 50,
        specialInstructions: "",
        name: "",
        company: "",
        phone: "",
        email: "",
        logo: "",
      });
      setPeopleCount(50);
      setDate(undefined);
      setNoDeadline(false);
      setLogoFile(null);
      setLogoPreview(null);
      setFormSuccess(true);
      
      // Redirect to thank you page
      router.push('/thankyou');
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setFormError(error.message || 'Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full">
        {formSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <div className="flex items-center text-green-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <AlertTitle>Success!</AlertTitle>
            </div>
            <AlertDescription className="text-green-700 mt-1">
              Your project request has been submitted successfully. Our team will review your request and get back to you soon.
            </AlertDescription>
          </Alert>
        )}
        
        {formError && (
          <Alert className="mb-6" variant="destructive">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Accordion
            type="single"
            collapsible
            className="w-full"
          >
            <AccordionItem
              value="step-1"
              className="border rounded-3xl overflow-hidden bg-newsecondary"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline ">
                <h2 className="text-xl font-semibold text-slate-800">
                  STEP 1 - Contact Details
                </h2>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-newsecondary pb-10">
                <div className="px-10  bg-newsecondary">
                  {/* Your STEP 1 content (contact inputs) goes here */}
                  <div className=" space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label
                          className="text-[#4573A9] font-bold"
                          htmlFor="name"
                        >
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="px-2 border-gray-300 rounded-full py-1 shadow-sm focus:ring-newprimary focus:newprimary"
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          className="text-[#4573A9] font-bold"
                          htmlFor="company"
                        >
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="px-2 border-gray-300 rounded-full py-1 shadow-sm focus:ring-newprimary focus:newprimary"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          className="text-[#4573A9] font-bold"
                          htmlFor="phone"
                        >
                          Phone Number
                        </label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="px-2 border-gray-300 rounded-full py-1 shadow-sm focus:ring-newprimary focus:newprimary"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          className="text-[#4573A9] font-bold"
                          htmlFor="email"
                        >
                          Business Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="px-2 border-gray-300 rounded-full py-1 shadow-sm focus:ring-newprimary focus:newprimary"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* step 2 */}
          <Accordion
            type="single"
            collapsible
            className="w-full"
          >
            <AccordionItem
              value="step-2"
              className="border rounded-3xl overflow-hidden mt-4 "
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline bg-newsecondary">
                <h2 className="text-xl font-semibold text-slate-800">
                  STEP 2 - Your Project (Optional)
                </h2>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 space-y-4">
                <div className="px-10 mt-5 w-full">
                  {/* div1 */}
                  <div className=" grid grid-cols-2  ">
                    <div className=" flex flex-col justify-center">
                      <label
                        htmlFor="projectFor"
                        className="block font-bold text-[#3E6AA2]"
                      >
                        What's it for?
                      </label>
                    </div>

                    <div className="relative w-[90%]">
                      <select
                        id="projectFor"
                        name="projectFor"
                        value={formData.projectFor}
                        onChange={handleInputChange}
                        className="mt-1 w-full h-9 py-1 rounded-3xl border-gray-300 shadow-sm
                    focus:ring-newprimary focus:border-newprimary appearance-none pl-3 pr-10"
                      >
                        <option value=""></option>
                        <option value="Onboarding">Onboarding</option>
                        <option value="Employee Gift">Employee Gift</option>
                        <option value="Office Merch">Office Merch</option>
                        <option value="Event">Event</option>
                        <option value="Customers Gift">Customers Gift</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDownIcon className="absolute top-1/2 right-3 w-5 h-5 text-gray-500 transform -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* line 1 */}
                  <div className=" flex justify-center items-center">
                    <div className="w-[90%] h-px bg-white my-4" />
                  </div>

                  {/* div 2 */}
                  <div className=" grid grid-cols-2 ">
                    <div className=" flex flex-col justify-center">
                      <label
                        htmlFor="budget"
                        className="block font-bold text-[#3E6AA2]"
                      >
                        What's your budget?
                      </label>
                    </div>
                    <div className="relative w-[90%]">
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="mt-1 w-full h-9 py-1 rounded-3xl border-gray-300 shadow-sm
                    focus:ring-newprimary focus:border-newprimary appearance-none pl-3 pr-10"
                      >
                        <option value=""></option>
                        <option value="$0 - $1,000">$0 - $1,000</option>
                        <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                        <option value="$50,000+">$50,000+</option>
                      </select>
                      <ChevronDownIcon className="absolute top-1/2 right-3 w-5 h-5 text-newprimary transform -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* line 2 */}
                  <div className=" flex justify-center items-center">
                    <div className="w-[90%] h-px bg-white my-4" />
                  </div>

                  {/* div 3 */}
                  <div className=" grid   grid-cols-2">
                    <div className=" flex flex-col justify-center">
                      <label className="block font-bold text-[#3E6AA2]">
                        What's the quantity needed?
                      </label>
                    </div>

                    <div className="flex flex-row items-center justify-center">
                      <div className="flex-1 flex items-center justify-center">
                        <div className="flex items-center mt-2 space-x-4 border-2 border-newprimary ml-10 rounded-full">
                          <button
                            type="button"
                            onClick={() =>
                              setPeopleCount((prev) => Math.max(1, prev - 1))
                            }
                            className="px-3 text-3xl rounded-md"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={peopleCount}
                            onChange={(e) =>
                              setPeopleCount(
                                Math.max(1, parseInt(e.target.value) || 1)
                              )
                            }
                            className="text-lg italic font-semibold w-16 bg-transparent text-center border-0 focus:outline-none"
                            min="1"
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
                            onClick={() => setPeopleCount((prev) => prev + 1)}
                            className="px-3 text-3xl rounded-md"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* line 2 */}
                  <div className=" flex justify-center items-center">
                    <div className="w-[90%] h-px bg-white my-4" />
                  </div>

                  {/* div 4 */}
                  <div className=" grid grid-cols-2 ">
                    <div className=" flex flex-col justify-center">
                      <label className="text-[#3E6AA2]  font-bold">
                        What's your target date?
                      </label>
                    </div>

                    <div className="flex items-center space-x-4 mt-2">
                      {!date && (
                        <label className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => setNoDeadline(true)}
                            className={`px-4 italic  text-[10px] h-6   rounded-full  border-2 border-newprimary focus:ring-2  ring-newprimary  bg-newprimary  text-white  `}
                          >
                            No Deadline
                          </button>
                        </label>
                      )}
                      {!nodeadline && (
                        <div>
                          <CustomDatePicker date={date} setDate={setDate} />
                        </div>
                      )}

                      {nodeadline === true && (
                        <button type="button" className="" onClick={resetDeadline}>
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
                        <button type="button" className="" onClick={resetDeadline}>
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

                  {/* line 3 */}
                  <div className=" flex justify-center items-center">
                    <div className="w-[90%] h-px bg-white my-4" />
                  </div>
                  {/* div 5 */}
                  <div className=" flex items-center justify-center">
                    <div className=" gap-3 pt-5 flex flex-row items-center">
                      <label
                        htmlFor="logo"
                        className={`px-4 rounded-full italic border-2 border-newprimary focus:ring-2 focus:ring-newprimary ${logoUploading ? "bg-gray-400" : "bg-newprimary"} text-white font-medium cursor-pointer`}
                      >
                        {logoUploading ? (
                          <span className="flex items-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            UPLOADING...
                          </span>
                        ) : (
                          "UPLOAD YOUR LOGO"
                        )}
                      </label>

                      <input
                        id="logo"
                        name="logo"
                        type="file"
                        onChange={handleLogoChange}
                        className="mt-2 hidden"
                        accept=".jpg,.jpeg,.png,.svg,.eps,.ai"
                        disabled={logoUploading}
                      />
                      
                      <div className="flex items-center">
                        <p className="text-sm text-[#7A869F] italic flex items-center justify-center uppercase mr-2">
                          EPS, AI, or SVG preferred
                        </p>
                        
                        {logoPreview && (
                          <div className="relative h-10 w-10">
                            <Image
                              src={logoPreview}
                              alt="Logo preview"
                              fill
                              className="object-contain"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setLogoPreview(null);
                                setLogoFile(null);
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 rounded-full h-5 w-5 flex items-center justify-center"
                            >
                              <span className="text-white text-xs">×</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* line 4 */}
                  <div className=" flex justify-center items-center">
                    <div className="w-[90%] h-px bg-white my-4" />
                  </div>

                  {/* div 6 */}
                  <div className="pb-5">
                    <textarea
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleInputChange}
                      className="mt-2 w-full border rounded-[22px] italic text-xs min-h-[70px] px-5 pt-3 shadow-sm focus:ring-newprimary focus:newprimary placeholder:text-[#989AA0]"
                      style={{ minHeight: "70px" }}
                      placeholder="SPECIAL INSTRUCTIONS"
                    ></textarea>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-8 text-center flex flex-col items-center">
            <button 
              type="submit" 
              disabled={isSubmitting || logoUploading}
              className={`text-2xl text-newprimary border-2 border-newprimary hover:text-white font-bold hover:bg-newprimary px-20 py-2 rounded-full uppercase ${isSubmitting ? 'bg-opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PForm;
