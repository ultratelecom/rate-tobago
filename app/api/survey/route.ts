import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { surveySchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Received survey data:", JSON.stringify(body, null, 2));
    
    // Validate the request body
    const validatedData = surveySchema.parse(body);
    console.log("Validation successful");

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
    console.log("Survey response created with ID:", surveyResponse.id);

    // Create attraction visits if any
    if (validatedData.attractionVisits && validatedData.attractionVisits.length > 0) {
      console.log(`Creating ${validatedData.attractionVisits.length} attraction visits`);
      for (const visit of validatedData.attractionVisits) {
        // Find or create the attraction
        let attraction = await prisma.touristAttraction.findUnique({
          where: { name: visit.attractionName },
        });

        if (!attraction) {
          attraction = await prisma.touristAttraction.create({
            data: { name: visit.attractionName },
          });
          console.log(`Created new attraction: ${visit.attractionName}`);
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
      console.log("All attraction visits created successfully");
    }

    console.log("Survey submission completed successfully");
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
    
    // Handle Zod validation errors
    if (error && typeof error === 'object' && 'name' in error && error.name === "ZodError") {
      const zodError = error as any;
      const errorMessages = zodError.errors?.map((e: any) => `${e.path.join('.')}: ${e.message}`).join(', ');
      console.error("Validation errors:", errorMessages);
      return NextResponse.json(
        { success: false, error: `Validation failed: ${errorMessages}` },
        { status: 400 }
      );
    }

    // Handle Prisma errors
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as any;
      console.error("Prisma error code:", prismaError.code);
      
      if (prismaError.code === 'P2002') {
        return NextResponse.json(
          { success: false, error: "Duplicate entry detected" },
          { status: 409 }
        );
      }
    }

    // Generic error
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { success: false, error: `Failed to submit survey: ${errorMessage}` },
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

