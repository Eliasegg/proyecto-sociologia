import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { universityCode, responses } = await req.json();

  try {
    const university = await prisma.university.upsert({
      where: { code: universityCode },
      update: {},
      create: { code: universityCode },
    });

    const responsePromises = responses.map(
      async (response: { questionId: string; answer?: string }) => {
        // Ensure questionId is an integer
        const questionId = parseInt(response.questionId, 10);

        // Check if the question exists, if not, create it
        const question = await prisma.question.upsert({
          where: { id: questionId },
          update: {},
          create: {
            id: questionId,
            text: `Question ${questionId}`,
          },
        });

        // Create the response only if answer exists
        if (response.answer) {
          return await prisma.response.create({
            data: {
              universityId: university.id,
              questionId: question.id,
              answer: response.answer,
            },
          });
        } else {
          // Handle cases where the answer is missing
          return null;
        }
      }
    );

    // Wait for all promises to resolve
    await Promise.all(responsePromises);

    return new Response("Responses saved successfully.", {
      status: 200,
    });
  } catch (error) {
    console.error("Error saving responses:", error);
    return new Response(`An error occurred while saving responses: ${error}`, {
      status: 500,
    });
  }
}
