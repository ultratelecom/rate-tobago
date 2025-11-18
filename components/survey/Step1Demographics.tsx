"use client";

import { UseFormReturn } from "react-hook-form";
import { SurveyFormData } from "@/lib/validations";

interface StepProps {
  form: UseFormReturn<SurveyFormData>;
}

export default function Step1Demographics({ form }: StepProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-tobago-blue mb-6">
        About You & Your Group
      </h2>

      <div className="space-y-6">
        {/* Group Size */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Including yourself, how many people are traveling in your group? *
          </label>
          <input
            type="number"
            min="1"
            max="100"
            {...register("groupSize", { valueAsNumber: true })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tobago-teal focus:outline-none transition-colors"
            placeholder="Enter number"
          />
          {errors.groupSize && (
            <p className="text-red-500 text-sm mt-1">{errors.groupSize.message}</p>
          )}
        </div>

        {/* Cruise Vessel */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Which cruise vessel did you arrive on? (if applicable)
          </label>
          <input
            type="text"
            {...register("cruiseVessel")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tobago-teal focus:outline-none transition-colors"
            placeholder="Enter vessel name or leave blank"
          />
        </div>

        {/* Country of Residence */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Which country are you a resident of? *
          </label>
          <input
            type="text"
            {...register("countryOfResidence")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tobago-teal focus:outline-none transition-colors"
            placeholder="Enter country"
          />
          {errors.countryOfResidence && (
            <p className="text-red-500 text-sm mt-1">{errors.countryOfResidence.message}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-700 font-semibold mb-3">
            What is your gender? *
          </label>
          <div className="space-y-2">
            {["Male", "Female", "Prefer not to say"].map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  value={option}
                  {...register("gender")}
                  className="w-5 h-5 text-tobago-teal focus:ring-tobago-teal"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Age Group */}
        <div>
          <label className="block text-gray-700 font-semibold mb-3">
            What is your age group? *
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {["Under 21", "21-30", "31-40", "41-50", "51-60", "Over 60"].map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  value={option}
                  {...register("ageGroup")}
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

