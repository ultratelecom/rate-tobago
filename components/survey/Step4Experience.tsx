"use client";

import { UseFormReturn } from "react-hook-form";
import { SurveyFormData } from "@/lib/validations";

interface StepProps {
  form: UseFormReturn<SurveyFormData>;
}

export default function Step4Experience({ form }: StepProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-tobago-blue mb-6">
        Your Experience
      </h2>

      <div className="space-y-6">
        {/* Customer Service Level */}
        <div>
          <label className="block text-gray-700 font-semibold mb-3">
            How would you describe the level of customer service you experienced during your visit to Tobago? *
          </label>
          <div className="space-y-2">
            {[
              {
                value: "Excellent",
                label: "Excellent - Service was consistently professional, courteous, and exceeded my expectations.",
              },
              {
                value: "Very good",
                label: "Very good - Service was of a high standard and fully met my expectations.",
              },
              {
                value: "Good",
                label: "Good - Service was satisfactory but could be improved in some areas.",
              },
              {
                value: "Poor",
                label: "Poor - Service did not meet my expectations in several areas.",
              },
              {
                value: "Very Poor",
                label: "Very Poor - Service was unsatisfactory and significantly below expected standards.",
              },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-start space-x-3 cursor-pointer hover:bg-tobago-sand/20 p-3 rounded transition-colors"
              >
                <input
                  type="radio"
                  value={option.value}
                  {...register("customerServiceLevel")}
                  className="mt-1 w-5 h-5 text-tobago-teal focus:ring-tobago-teal flex-shrink-0"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Overall Experience */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Please describe your overall experience during your visit to Tobago. *
          </label>
          <textarea
            {...register("overallExperience")}
            rows={5}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tobago-teal focus:outline-none transition-colors resize-none"
            placeholder="Share your thoughts about your visit..."
          />
          {errors.overallExperience && (
            <p className="text-red-500 text-sm mt-1">{errors.overallExperience.message}</p>
          )}
        </div>

        {/* Improvement Suggestions */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            What could have made your experience in Tobago better?
          </label>
          <textarea
            {...register("improvementSuggestions")}
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tobago-teal focus:outline-none transition-colors resize-none"
            placeholder="Your suggestions help us improve..."
          />
        </div>

        {/* Visit Highlight */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            What was the highlight of your visit to Tobago?
          </label>
          <textarea
            {...register("visitHighlight")}
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tobago-teal focus:outline-none transition-colors resize-none"
            placeholder="Tell us about your favorite moment..."
          />
        </div>
      </div>
    </div>
  );
}

