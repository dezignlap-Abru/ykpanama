"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EarlyBirdPricingForm } from "./EarlyBirdPricing";

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";

const TSHIRT_SIZES = ["S", "M", "L", "XL", "XXL"];
const PAYMENT_METHODS = ["Credit Card", "Cash / Check", "PayPal", "Other"];
const PAYMENT_CONTACT_OPTIONS = ["Father", "Mother", "Other"];

interface FormData {
  firstName: string;
  lastName: string;
  hebrewName: string;
  dateOfBirth: string;
  participantPhone: string;
  participantEmail: string;
  weight: string;
  height: string;
  horsebackExperience: string;
  tshirtSize: string;
  fatherName: string;
  fatherPhone: string;
  motherName: string;
  motherPhone: string;
  parentsEmail: string;
  paymentContact: string;
  paymentContactOther: string;
  homeAddress: string;
  emergencyContact: string;
  hasMedicalCondition: boolean;
  medicalConditionDetails: string;
  pastYearDetails: string;
  howDidYouHear: string;
  furtherComments: string;
  paymentMethod: string;
  sponsorInterest: string;
  passportConfirmation: boolean;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  hebrewName: "",
  dateOfBirth: "",
  participantPhone: "",
  participantEmail: "",
  weight: "",
  height: "",
  horsebackExperience: "",
  tshirtSize: "",
  fatherName: "",
  fatherPhone: "",
  motherName: "",
  motherPhone: "",
  parentsEmail: "",
  paymentContact: "",
  paymentContactOther: "",
  homeAddress: "",
  emergencyContact: "",
  hasMedicalCondition: false,
  medicalConditionDetails: "",
  pastYearDetails: "",
  howDidYouHear: "",
  furtherComments: "",
  paymentMethod: "",
  sponsorInterest: "",
  passportConfirmation: false,
};

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = true,
  placeholder = "",
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all duration-200"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = true,
  placeholder = "Select...",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all duration-200 appearance-none cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236b7280' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
  required = true,
  placeholder = "",
  rows = 3,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all duration-200 resize-none"
      />
    </div>
  );
}

export default function ApplicationForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep1 = (): boolean => {
    const required: (keyof FormData)[] = [
      "firstName",
      "lastName",
      "hebrewName",
      "dateOfBirth",
      "participantPhone",
      "participantEmail",
      "weight",
      "height",
      "tshirtSize",
    ];
    for (const field of required) {
      if (!formData[field]) {
        setError("Please fill in all required fields.");
        return false;
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.participantEmail)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const validateStep2 = (): boolean => {
    const required: (keyof FormData)[] = [
      "fatherName",
      "fatherPhone",
      "motherName",
      "motherPhone",
      "parentsEmail",
      "paymentContact",
      "homeAddress",
      "emergencyContact",
      "pastYearDetails",
      "howDidYouHear",
      "paymentMethod",
      "sponsorInterest",
    ];
    for (const field of required) {
      if (!formData[field]) {
        setError("Please fill in all required fields.");
        return false;
      }
    }
    if (formData.paymentContact === "Other" && !formData.paymentContactOther) {
      setError("Please specify who to contact regarding payment.");
      return false;
    }
    if (formData.hasMedicalCondition && !formData.medicalConditionDetails) {
      setError("Please describe the medical condition.");
      return false;
    }
    if (!formData.passportConfirmation) {
      setError(
        "Please confirm that you will submit the required travel documents."
      );
      return false;
    }
    setError("");
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBack = () => {
    setStep(1);
    setError("");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);
    setError("");

    const payload = {
      ...formData,
      hasMedicalCondition: formData.hasMedicalCondition ? "Yes" : "No",
      passportConfirmation: formData.passportConfirmation ? "Confirmed" : "No",
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // no-cors mode returns opaque response, so we assume success
      void response;
      setIsSubmitted(true);
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setError(
        "Something went wrong. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  // Success screen
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center py-16 px-6"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-900 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Application Submitted!
        </h3>
        <p className="text-gray-600 text-lg mb-3">
          Thank you for applying to Yeshivas Kayitz Panama 5786.
        </p>
        <p className="text-gray-500 mb-2">
          We will review your application and be in touch shortly regarding
          payment and next steps.
        </p>
        <p className="text-gray-500 mb-8">
          Don&apos;t forget to submit your passport documents via email or
          WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:chabadboquete@gmail.com"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Email Us
          </a>
          <a
            href="https://wa.me/50762430666"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <div ref={formRef} className="max-w-2xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <div
          className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold transition-all duration-300 ${
            step >= 1
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          1
        </div>
        <div
          className={`w-16 h-0.5 transition-all duration-300 ${
            step >= 2 ? "bg-gray-900" : "bg-gray-200"
          }`}
        />
        <div
          className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold transition-all duration-300 ${
            step >= 2
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          2
        </div>
      </div>

      {/* Step labels */}
      <div className="flex justify-between text-xs text-gray-500 mb-8 px-2">
        <span className={step === 1 ? "text-gray-900 font-medium" : ""}>
          Participant Info
        </span>
        <span className={step === 2 ? "text-gray-900 font-medium" : ""}>
          Family &amp; Background
        </span>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm"
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait" custom={step}>
          {step === 1 && (
            <motion.div
              key="step1"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-5"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Participant Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                  label="First Legal Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                />
                <InputField
                  label="Last Legal Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                />
              </div>

              <InputField
                label="Hebrew Name"
                name="hebrewName"
                value={formData.hebrewName}
                onChange={handleChange}
                placeholder="e.g. Yochanan ben David"
              />

              <InputField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                  label="Phone Number"
                  name="participantPhone"
                  type="tel"
                  value={formData.participantPhone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                />
                <InputField
                  label="Email Address"
                  name="participantEmail"
                  type="email"
                  value={formData.participantEmail}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                  label="Weight (lbs)"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g. 160"
                />
                <InputField
                  label="Height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="e.g. 5'10&quot;"
                />
              </div>

              <InputField
                label="Experience in Horseback Riding"
                name="horsebackExperience"
                value={formData.horsebackExperience}
                onChange={handleChange}
                required={false}
                placeholder="Describe your experience, or write 'None'"
              />

              <SelectField
                label="T-Shirt Size"
                name="tshirtSize"
                value={formData.tshirtSize}
                onChange={handleChange}
                options={TSHIRT_SIZES}
              />

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-3.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 active:bg-gray-950 transition-all duration-200 cursor-pointer"
                >
                  Continue to Step 2
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={2}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-5"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Family &amp; Background
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                  label="Father's Full Name"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="Full name"
                />
                <InputField
                  label="Father's Phone"
                  name="fatherPhone"
                  type="tel"
                  value={formData.fatherPhone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                  label="Mother's Full Name"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  placeholder="Full name"
                />
                <InputField
                  label="Mother's Phone"
                  name="motherPhone"
                  type="tel"
                  value={formData.motherPhone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <InputField
                label="Parents' Contact Email"
                name="parentsEmail"
                type="email"
                value={formData.parentsEmail}
                onChange={handleChange}
                placeholder="parents@example.com"
              />

              <div>
                <SelectField
                  label="Who should we reach out to regarding payment?"
                  name="paymentContact"
                  value={formData.paymentContact}
                  onChange={handleChange}
                  options={PAYMENT_CONTACT_OPTIONS}
                />
                {formData.paymentContact === "Other" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3"
                  >
                    <InputField
                      label="Please specify"
                      name="paymentContactOther"
                      value={formData.paymentContactOther}
                      onChange={handleChange}
                      placeholder="Name and contact info"
                    />
                  </motion.div>
                )}
              </div>

              <TextAreaField
                label="Home Address (including State and Zip)"
                name="homeAddress"
                value={formData.homeAddress}
                onChange={handleChange}
                placeholder="123 Main St, City, State, ZIP"
                rows={2}
              />

              <InputField
                label="Emergency Contact (full name + phone, not a parent)"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="Name — (555) 000-0000"
              />

              {/* Medical condition toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Any medical condition?{" "}
                  <span className="text-red-400">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        hasMedicalCondition: !prev.hasMedicalCondition,
                      }))
                    }
                    className={`toggle-switch ${
                      formData.hasMedicalCondition ? "active" : ""
                    }`}
                    aria-label="Toggle medical condition"
                  />
                  <span className="text-sm text-gray-600">
                    {formData.hasMedicalCondition ? "Yes" : "No"}
                  </span>
                </div>
                {formData.hasMedicalCondition && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3"
                  >
                    <TextAreaField
                      label="Please describe the medical condition"
                      name="medicalConditionDetails"
                      value={formData.medicalConditionDetails}
                      onChange={handleChange}
                      placeholder="Include allergies, medications, and any relevant details"
                      rows={3}
                    />
                  </motion.div>
                )}
              </div>

              <TextAreaField
                label="Where were you this past year (5785–5786)?"
                name="pastYearDetails"
                value={formData.pastYearDetails}
                onChange={handleChange}
                placeholder="Include place, timeframe, activity, and 1 reference contact (not family)"
                rows={3}
              />

              <InputField
                label="How did you hear about our program?"
                name="howDidYouHear"
                value={formData.howDidYouHear}
                onChange={handleChange}
                placeholder="Friend, social media, etc."
              />

              <TextAreaField
                label="Any further comments"
                name="furtherComments"
                value={formData.furtherComments}
                onChange={handleChange}
                required={false}
                placeholder="Anything else you'd like us to know"
                rows={3}
              />

              {/* Payment & Policy Section */}
              <div className="border-t border-gray-100 pt-8 mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-5">
                  Payment &amp; Policy
                </h4>

                <div className="space-y-4 mb-6">
                  <EarlyBirdPricingForm />

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-gray-600 mt-0.5 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Medical Insurance Included
                        </p>
                        <p className="text-xs text-gray-500">
                          Comprehensive coverage for the duration of the program
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-gray-600 mt-0.5 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          $100 Refundable Deposit
                        </p>
                        <p className="text-xs text-gray-500">
                          Cash damage deposit required upon arrival — fully
                          refundable
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-gray-600 mt-0.5 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Cancellation Policy
                        </p>
                        <p className="text-xs text-gray-500">
                          Before June 1, 2026 — 50% refund
                        </p>
                        <p className="text-xs text-gray-500">
                          After June 1, 2026 — No refund
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 italic">
                    Airfare is not included in the program cost.
                  </p>
                </div>

                <SelectField
                  label="Payment Method"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  options={PAYMENT_METHODS}
                />

                <div className="mt-5">
                  <SelectField
                    label="Are you interested in sponsoring another camper?"
                    name="sponsorInterest"
                    value={formData.sponsorInterest}
                    onChange={handleChange}
                    options={["Yes", "No"]}
                  />
                </div>

                <p className="text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  After submitting this form, you will be contacted regarding
                  your selected payment method.
                </p>
              </div>

              {/* Travel Documents Section */}
              <div className="border-t border-gray-100 pt-8 mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-5">
                  Required Travel Documents
                </h4>

                <div className="p-5 bg-gray-50 rounded-lg border border-gray-100 mb-5">
                  <p className="text-sm text-gray-700 mb-4">
                    Please submit the following documents separately via:
                  </p>
                  <div className="space-y-2 mb-4">
                    <a
                      href="mailto:chabadboquete@gmail.com"
                      className="flex items-center gap-2 text-sm text-gray-800 hover:text-gray-600 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      chabadboquete@gmail.com
                    </a>
                    <a
                      href="https://wa.me/50762430666"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-800 hover:text-gray-600 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      +507 6243 0666
                    </a>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      Required:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>Passport number</li>
                      <li>
                        Passport expiration date (must be valid 6 months beyond
                        return date)
                      </li>
                      <li>Clear passport photo</li>
                    </ul>
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.passportConfirmation}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        passportConfirmation: e.target.checked,
                      }))
                    }
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900/20 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    I confirm that the passport is valid and I will submit
                    required documents separately.{" "}
                    <span className="text-red-400">*</span>
                  </span>
                </label>
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 py-3.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] py-3.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 active:bg-gray-950 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
