import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { surveySchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = surveySchema.parse(body);

    // Create the survey response
    const surveyResponse = await prisma.surveyResponse.create({
      data: {
        groupSize: validatedData.groupSize,
        cruiseVessel: validatedData.cruiseVessel || null,
        countryOfResidence: validatedData.countryOfResidence,
        gender: validatedData.gender,
        ageGroup: validatedData.ageGroup,
        isFirstVisit: validatedData.isFirstVisit,
        spendingAmountTTD: validatedData.spendingAmountTTD || null,
        spendingAmountUSD: validatedData.spendingAmountUSD || null,
        portWelcomeSatisfaction: validatedData.portWelcomeSatisfaction,
        customerServiceLevel: validatedData.customerServiceLevel,
        overallExperience: validatedData.overallExperience,
        improvementSuggestions: validatedData.improvementSuggestions || null,
        visitHighlight: validatedData.visitHighlight || null,
        usedGuidedTour: validatedData.usedGuidedTour,
        transportationRating: validatedData.transportationRating || null,
        wouldVisitAgain: validatedData.wouldVisitAgain,
        additionalFeedback: validatedData.additionalFeedback || null,
        promotionalEmail: validatedData.promotionalEmail || null,
      },
    });

    // Create attraction visits if any
    if (validatedData.attractionVisits && validatedData.attractionVisits.length > 0) {
      for (const visit of validatedData.attractionVisits) {
        // Find or create the attraction
        let attraction = await prisma.touristAttraction.findUnique({
          where: { name: visit.attractionName },
        });

        if (!attraction) {
          attraction = await prisma.touristAttraction.create({
            data: { name: visit.attractionName },
          });
        }

        // Create the visit record
        await prisma.attractionVisit.create({
          data: {
            surveyResponseId: surveyResponse.id,
            touristAttractionId: attraction.id,
            rating: visit.rating,
          },
        });
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Survey submitted successfully!",
        id: surveyResponse.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting survey:", error);
    
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Invalid form data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to submit survey" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const responses = await prisma.surveyResponse.findMany({
      include: {
        attractionVisits: {
          include: {
            touristAttraction: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, data: responses });
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch surveys" },
      { status: 500 }
    );
  }
}

