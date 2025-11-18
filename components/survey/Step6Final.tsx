"use client";

import { UseFormReturn } from "react-hook-form";
import { SurveyFormData } from "@/lib/validations";

interface StepProps {
  form: UseFormReturn<SurveyFormData>;
}

export default function Step6Final({ form }: StepProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-tobago-blue mb-6">
        Final Thoughts
      </h2>

      <div className="space-y-6">
        {/* Additional Feedback */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Do you have any additional feedback or recommendations to improve the cruise visitor experience in Tobago?
          </label>
          <textarea
            {...register("additionalFeedback")}
            rows={5}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tobago-teal focus:outline-none transition-colors resize-none"
            placeholder="Your feedback is valuable to us..."
          />
        </div>

        {/* Promotional Email */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            If you would like to receive promotional offers for destination Tobago, please provide your email address (optional):
          </label>
          <input
            type="email"
            {...register("promotionalEmail")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-tobago-teal focus:outline-none transition-colors"
            placeholder="your.email@example.com"
          />
          {errors.promotionalEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.promotionalEmail.message}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            📧 We respect your privacy. Your email will only be used to send you promotional offers and updates about Tobago.
          </p>
        </div>

        {/* Thank You Message */}
        <div className="bg-gradient-to-r from-tobago-teal/10 to-tobago-blue/10 rounded-xl p-6 border-2 border-tobago-teal/20">
          <h3 className="text-xl font-bold text-tobago-blue mb-2">
            🌴 Thank You for Your Feedback!
          </h3>
          <p className="text-gray-700">
            We appreciate your time in completing this survey. Your responses will help us ensure that Tobago remains <strong>Beyond Ordinary</strong> for all our visitors.
          </p>
          <p className="text-gray-600 mt-3 text-sm italic">
            Click &ldquo;Submit Survey&rdquo; below to complete your submission.
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
          <p className="font-semibold text-gray-700 mb-1">Privacy Notice:</p>
          <p>
            Your answers are strictly confidential and will be used solely for statistical purposes by the Division of Tourism, Culture, Antiquities and Transportation.
          </p>
        </div>
      </div>
    </div>
  );
}

