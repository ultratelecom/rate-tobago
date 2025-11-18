import { z } from "zod";

// Step 1: Demographics validation
export const step1Schema = z.object({
  groupSize: z.number().min(1, "Group size must be at least 1").max(100, "Group size seems too large"),
  cruiseVessel: z.string().optional(),
  countryOfResidence: z.string().min(2, "Please enter your country of residence"),
  gender: z.enum(["Male", "Female", "Prefer not to say"]),
  ageGroup: z.enum(["Under 21", "21-30", "31-40", "41-50", "51-60", "Over 60"]),
});

// Step 2: Visit details validation
export const step2Schema = z.object({
  isFirstVisit: z.boolean(),
  spendingAmountTTD: z.number().min(0).optional().nullable(),
  spendingAmountUSD: z.number().min(0).optional().nullable(),
  portWelcomeSatisfaction: z.enum([
    "Very satisfied",
    "Satisfied",
    "Neutral",
    "Dissatisfied",
    "Very dissatisfied"
  ]),
});

// Step 3: Attractions (optional, so just validate structure)
export const step3Schema = z.object({
  attractionVisits: z.array(
    z.object({
      attractionName: z.string(),
      rating: z.enum(["Excellent", "Very Good", "Good", "Fair", "Poor"])
    })
  ).optional().default([]),
});

// Step 4: Experience validation
export const step4Schema = z.object({
  customerServiceLevel: z.enum([
    "Excellent",
    "Very good",
    "Good",
    "Poor",
    "Very Poor"
  ]),
  overallExperience: z.string().min(10, "Please share more about your experience (at least 10 characters)"),
  improvementSuggestions: z.string().optional(),
  visitHighlight: z.string().optional(),
});

// Step 5: Transportation validation
export const step5Schema = z.object({
  usedGuidedTour: z.enum([
    "Yes, a guided tour",
    "Yes, taxi or on-island transportation",
    "No"
  ]),
  transportationRating: z.enum(["Excellent", "Good", "Fair", "Poor"]).optional().nullable(),
  wouldVisitAgain: z.enum(["Definitely", "Probably", "Not sure", "Probably not"]),
});

// Step 6: Final feedback validation
export const step6Schema = z.object({
  additionalFeedback: z.string().optional(),
  promotionalEmail: z.string().email("Please enter a valid email").optional().or(z.literal("")),
});

// Full survey schema (all steps combined)
export const surveySchema = z.object({
  groupSize: z.number().min(1, "Group size must be at least 1").max(100, "Group size seems too large"),
  cruiseVessel: z.string().optional(),
  countryOfResidence: z.string().min(2, "Please enter your country of residence"),
  gender: z.enum(["Male", "Female", "Prefer not to say"]),
  ageGroup: z.enum(["Under 21", "21-30", "31-40", "41-50", "51-60", "Over 60"]),
  isFirstVisit: z.boolean(),
  spendingAmountTTD: z.number().min(0).optional().nullable(),
  spendingAmountUSD: z.number().min(0).optional().nullable(),
  portWelcomeSatisfaction: z.enum([
    "Very satisfied",
    "Satisfied",
    "Neutral",
    "Dissatisfied",
    "Very dissatisfied"
  ]),
  attractionVisits: z.array(
    z.object({
      attractionName: z.string(),
      rating: z.enum(["Excellent", "Very Good", "Good", "Fair", "Poor"])
    })
  ).optional().default([]),
  customerServiceLevel: z.enum([
    "Excellent",
    "Very good",
    "Good",
    "Poor",
    "Very Poor"
  ]),
  overallExperience: z.string().min(10, "Please share more about your experience (at least 10 characters)"),
  improvementSuggestions: z.string().optional(),
  visitHighlight: z.string().optional(),
  usedGuidedTour: z.enum([
    "Yes, a guided tour",
    "Yes, taxi or on-island transportation",
    "No"
  ]),
  transportationRating: z.enum(["Excellent", "Good", "Fair", "Poor"]).optional().nullable(),
  wouldVisitAgain: z.enum(["Definitely", "Probably", "Not sure", "Probably not"]),
  additionalFeedback: z.string().optional(),
  promotionalEmail: z.string().email("Please enter a valid email").optional().or(z.literal(""))
});

export type SurveyFormData = z.infer<typeof surveySchema>;

// Helper to get step schema
export const getStepSchema = (step: number) => {
  switch (step) {
    case 1:
      return step1Schema;
    case 2:
      return step2Schema;
    case 3:
      return step3Schema;
    case 4:
      return step4Schema;
    case 5:
      return step5Schema;
    case 6:
      return step6Schema;
    default:
      return z.object({});
  }
};

// Helper to get field names for each step
export const getStepFields = (step: number): (keyof SurveyFormData)[] => {
  switch (step) {
    case 1:
      return ["groupSize", "cruiseVessel", "countryOfResidence", "gender", "ageGroup"];
    case 2:
      return ["isFirstVisit", "spendingAmountTTD", "spendingAmountUSD", "portWelcomeSatisfaction"];
    case 3:
      return ["attractionVisits"];
    case 4:
      return ["customerServiceLevel", "overallExperience", "improvementSuggestions", "visitHighlight"];
    case 5:
      return ["usedGuidedTour", "transportationRating", "wouldVisitAgain"];
    case 6:
      return ["additionalFeedback", "promotionalEmail"];
    default:
      return [];
  }
};

