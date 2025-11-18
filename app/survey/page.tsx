"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { surveySchema, type SurveyFormData, getStepFields } from "@/lib/validations";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Import form step components
import Step1Demographics from "@/components/survey/Step1Demographics";
import Step2Visit from "@/components/survey/Step2Visit";
import Step3Attractions from "@/components/survey/Step3Attractions";
import Step4Experience from "@/components/survey/Step4Experience";
import Step5Transportation from "@/components/survey/Step5Transportation";
import Step6Final from "@/components/survey/Step6Final";

const TOTAL_STEPS = 6;

export default function SurveyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
    mode: "onBlur", // Validate on blur for better UX
    defaultValues: {
      groupSize: 1,
      gender: "Prefer not to say",
      ageGroup: "21-30",
      isFirstVisit: true,
      portWelcomeSatisfaction: "Satisfied",
      customerServiceLevel: "Good",
      usedGuidedTour: "No",
      wouldVisitAgain: "Definitely",
      attractionVisits: [],
      overallExperience: "",
      improvementSuggestions: "",
      visitHighlight: "",
      additionalFeedback: "",
      promotionalEmail: "",
    },
  });

  const nextStep = async () => {
    // Clear any previous validation error
    setValidationError(null);

    // Get fields for current step
    const fieldsToValidate = getStepFields(currentStep);
    
    // Trigger validation for current step fields
    const isStepValid = await form.trigger(fieldsToValidate as any);
    
    if (isStepValid) {
      // Move to next step if validation passes
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // Show validation error message
      setValidationError("Please fill in all required fields correctly before proceeding.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    // Clear validation error when going back
    setValidationError(null);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (data: SurveyFormData) => {
    setIsSubmitting(true);
    setValidationError(null);
    
    try {
      console.log("Submitting survey data:", data);
      
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Survey submission result:", result);

      if (result.success) {
        router.push("/thank-you");
      } else {
        setValidationError(result.error || "Failed to submit survey. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
      setValidationError("An error occurred while submitting your survey. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Demographics form={form} />;
      case 2:
        return <Step2Visit form={form} />;
      case 3:
        return <Step3Attractions form={form} />;
      case 4:
        return <Step4Experience form={form} />;
      case 5:
        return <Step5Transportation form={form} />;
      case 6:
        return <Step6Final form={form} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Full Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/img_5.jpg"
          alt="Tobago landscape"
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-white/90" />
      </div>

      {/* Header */}
      <header className="bg-tobago-blue text-white py-4 sm:py-5 md:py-6 shadow-lg sticky top-0 z-50 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/" className="text-xs sm:text-sm hover:underline mb-1 sm:mb-2 block">
            ← Back to Home
          </Link>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
            Tobago Visitor Experience Survey
          </h1>
          <p className="text-white/80 mt-0.5 sm:mt-1 text-xs sm:text-sm">
            Division of Tourism, Culture, Antiquities and Transportation
          </p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white shadow-sm sticky top-[112px] sm:top-[120px] md:top-[124px] z-40 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-xs sm:text-sm font-semibold text-tobago-blue">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
            <span className="text-xs sm:text-sm text-gray-600">
              {Math.round((currentStep / TOTAL_STEPS) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3">
            <motion.div
              className="bg-gradient-to-r from-tobago-teal to-tobago-blue h-2.5 sm:h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 relative z-10">
        {/* Validation Error Alert */}
        {validationError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{validationError}</p>
              </div>
              <button
                type="button"
                onClick={() => setValidationError(null)}
                className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between mt-8 sm:mt-10 md:mt-12 gap-3 sm:gap-4">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-300 text-gray-700 rounded-full font-semibold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors order-2 sm:order-1"
            >
              ← Previous
            </button>

            {currentStep < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={nextStep}
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-tobago-teal text-white rounded-full font-semibold text-sm sm:text-base hover:bg-tobago-blue transition-colors order-1 sm:order-2"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-tobago-coral text-white rounded-full font-semibold text-sm sm:text-base hover:bg-tobago-coral/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 order-1 sm:order-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Submit Survey"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

