"use client";

import { UseFormReturn } from "react-hook-form";
import { SurveyFormData } from "@/lib/validations";

interface StepProps {
  form: UseFormReturn<SurveyFormData>;
}

export default function Step5Transportation({ form }: StepProps) {
  const { register, watch } = form;
  const usedGuidedTour = watch("usedGuidedTour");

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-tobago-blue mb-6">
        Transportation & Return Visit
      </h2>

      <div className="space-y-6">
        {/* Used Guided Tour */}
        <div>
          <label className="block text-gray-700 font-semibold mb-3">
            Did you use a guided tour or local transportation during your visit to Tobago? *
          </label>
          <div className="space-y-2">
            {[
              "Yes, a guided tour",
              "Yes, taxi or on-island transportation",
              "No",
            ].map((option) => (
              <label
                key={option}
                className="flex items-center space-x-3 cursor-pointer hover:bg-tobago-sand/20 p-2 rounded transition-colors"
              >
                <input
                  type="radio"
                  value={option}
                  {...register("usedGuidedTour")}
                  className="w-5 h-5 text-tobago-teal focus:ring-tobago-teal"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Transportation Rating - Only show if they used transportation */}
        {usedGuidedTour !== "No" && (
          <div className="border-l-4 border-tobago-teal pl-6">
            <label className="block text-gray-700 font-semibold mb-3">
              How would you rate your transportation experience?
            </label>
            <div className="space-y-2">
              {["Excellent", "Good", "Fair", "Poor"].map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-tobago-sand/20 p-2 rounded transition-colors"
                >
                  <input
                    type="radio"
                    value={option}
                    {...register("transportationRating")}
                    className="w-5 h-5 text-tobago-teal focus:ring-tobago-teal"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Would Visit Again */}
        <div className="pt-4">
          <label className="block text-gray-700 font-semibold mb-3">
            I would visit Tobago again. *
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {["Definitely", "Probably", "Not sure", "Probably not"].map((option) => (
              <label
                key={option}
                className="flex items-center space-x-3 cursor-pointer hover:bg-tobago-sand/20 p-3 rounded transition-colors border-2 border-gray-200"
              >
                <input
                  type="radio"
                  value={option}
                  {...register("wouldVisitAgain")}
                  className="w-5 h-5 text-tobago-teal focus:ring-tobago-teal"
                />
                <span className="text-gray-700 font-medium">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

