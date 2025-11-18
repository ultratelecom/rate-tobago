import { z } from "zod";

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
  overallExperience: z.string().min(10, "Please share more about your experience"),
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

