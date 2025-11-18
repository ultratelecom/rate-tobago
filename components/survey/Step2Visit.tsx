"use client";

import { UseFormReturn } from "react-hook-form";
import { SurveyFormData } from "@/lib/validations";

interface StepProps {
  form: UseFormReturn<SurveyFormData>;
}

export default function Step2Visit({ form }: StepProps) {
  const { register, formState: { errors }, watch } = form;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-tobago-blue mb-6">
        Your Visit Details
      </h2>

      <div className="space-y-6">
        {/* First Visit */}
        <div>
          <label className="block text-gray-700 font-semibold mb-3">
            Is this your first visit to Tobago? *
          </label>
          <div className="space-y-2">
            {[
              { value: true, label: "Yes" },
              { value: false, label: "No" },
            ].map((option) => (
              <label key={option.label} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  value={option.value.toString()}
                  {...register("isFirstVisit", {
                    setValueAs: (v) => v === "true",
                  })}
                  className="w-5 h-5 text-tobago-teal focus:ring-tobago-teal"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Spending Amount */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            How much did you spend during your visit to Tobago?
          </label>
          <p className="text-sm text-gray-600 mb-3">
            Please provide an estimate of your total spending (accommodation, food, activities, shopping, etc.)
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">TT$ (Trinidad & Tobago Dollars)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register("spendingAmountTTD", { 
                  setValueAs: (v) => v === "" ? null : parseFloat(v)
                })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tobago-teal focus:outline-none transition-colors"
                placeholder="e.g., 5000"
              />
              <p className="text-xs text-gray-500 mt-1">Average: TT$3,000 - TT$8,000</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">US$ (US Dollars)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register("spendingAmountUSD", { 
                  setValueAs: (v) => v === "" ? null : parseFloat(v)
                })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tobago-teal focus:outline-none transition-colors"
                placeholder="e.g., 750"
              />
              <p className="text-xs text-gray-500 mt-1">Average: US$450 - US$1,200</p>
            </div>
          </div>
        </div>

        {/* Port Welcome Satisfaction */}
        <div>
          <label className="block text-gray-700 font-semibold mb-3">
            How satisfied are you with the welcome received at the Port of Scarborough or Charlotteville? *
          </label>
          <div className="space-y-2">
            {[
              "Very satisfied",
              "Satisfied",
              "Neutral",
              "Dissatisfied",
              "Very dissatisfied",
            ].map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer hover:bg-tobago-sand/20 p-2 rounded transition-colors">
                <input
                  type="radio"
                  value={option}
                  {...register("portWelcomeSatisfaction")}
                  className="w-5 h-5 text-tobago-teal focus:ring-tobago-teal"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

