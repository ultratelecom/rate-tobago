"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { surveySchema, type SurveyFormData } from "@/lib/validations";
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
  const router = useRouter();

  const form = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
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

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (data: SurveyFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/thank-you");
      } else {
        alert("Failed to submit survey. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("An error occurred. Please try again.");
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
    <div className="min-h-screen bg-gradient-to-b from-tobago-sand/30 to-white">
      {/* Header */}
      <header className="bg-tobago-blue text-white py-6 shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/" className="text-sm hover:underline mb-2 block">
            ← Back to Home
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">
            Tobago Visitor Experience Survey
          </h1>
          <p className="text-white/80 mt-1">
            Division of Tourism, Culture, Antiquities and Transportation
          </p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white shadow-sm sticky top-[132px] md:top-[124px] z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-tobago-blue">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round((currentStep / TOTAL_STEPS) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-tobago-teal to-tobago-blue h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
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
          <div className="flex justify-between mt-12 gap-4">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-8 py-3 bg-gray-300 text-gray-700 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors"
            >
              ← Previous
            </button>

            {currentStep < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3 bg-tobago-teal text-white rounded-full font-semibold hover:bg-tobago-blue transition-colors"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-tobago-coral text-white rounded-full font-semibold hover:bg-tobago-coral/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Survey"
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Background Image */}
      <div className="fixed bottom-0 right-0 w-1/3 h-1/3 opacity-10 pointer-events-none z-0">
        <Image
          src="/images/img_1.jpg"
          alt="Tobago"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

