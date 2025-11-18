"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import { SurveyFormData } from "@/lib/validations";
import { TOBAGO_ATTRACTIONS } from "@/lib/attractions";
import { useState } from "react";

interface StepProps {
  form: UseFormReturn<SurveyFormData>;
}

export default function Step3Attractions({ form }: StepProps) {
  const { control, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attractionVisits",
  });

  const [selectedAttractions, setSelectedAttractions] = useState<Set<string>>(
    new Set(fields.map((f) => f.attractionName))
  );

  const handleAttractionToggle = (attraction: string) => {
    if (selectedAttractions.has(attraction)) {
      // Remove
      const index = fields.findIndex((f) => f.attractionName === attraction);
      if (index !== -1) {
        remove(index);
        setSelectedAttractions((prev) => {
          const next = new Set(prev);
          next.delete(attraction);
          return next;
        });
      }
    } else {
      // Add
      append({ attractionName: attraction, rating: "Good" });
      setSelectedAttractions((prev) => new Set([...prev, attraction]));
    }
  };

  const handleRatingChange = (index: number, rating: string) => {
    form.setValue(`attractionVisits.${index}.rating`, rating as any);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-tobago-blue mb-3">
        Tourist Attractions
      </h2>
      <p className="text-gray-600 mb-6">
        Please indicate which tourist attractions you visited during your stay in Tobago and rate your experience for each. (Tick all that apply)
      </p>

      <div className="space-y-4">
        {TOBAGO_ATTRACTIONS.map((attraction) => {
          const index = fields.findIndex((f) => f.attractionName === attraction);
          const isSelected = selectedAttractions.has(attraction);

          return (
            <div
              key={attraction}
              className={`border-2 rounded-lg p-4 transition-all ${
                isSelected
                  ? "border-tobago-teal bg-tobago-sand/10"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleAttractionToggle(attraction)}
                  className="mt-1 w-5 h-5 text-tobago-teal focus:ring-tobago-teal rounded"
                />
                <div className="flex-1">
                  <label className="text-gray-800 font-medium cursor-pointer block">
                    {attraction}
                  </label>

                  {isSelected && index !== -1 && (
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-2">
                      {["Excellent", "Very Good", "Good", "Fair", "Poor"].map((rating) => (
                        <label
                          key={rating}
                          className="flex items-center space-x-2 cursor-pointer text-sm"
                        >
                          <input
                            type="radio"
                            value={rating}
                            checked={watch(`attractionVisits.${index}.rating`) === rating}
                            onChange={(e) => handleRatingChange(index, e.target.value)}
                            className="w-4 h-4 text-tobago-teal focus:ring-tobago-teal"
                          />
                          <span className="text-gray-700">{rating}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {fields.length === 0 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">
            💡 <strong>Tip:</strong> Select the attractions you visited and rate your experience. You can skip this step if you didn&apos;t visit any attractions.
          </p>
        </div>
      )}
    </div>
  );
}

