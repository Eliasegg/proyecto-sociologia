import { PrismaClient } from "@prisma/client";
import { questions } from "../../components/questions";

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
				// Obtener la pregunta y la opción seleccionada
				const question = questions.find((q) => q.id === response.questionId);
				if (!question) throw new Error(`Question with ID ${response.questionId} not found`);

				let reply = "No answer";
				if (response.answer) {
					const selectedOption =
						question.options[response.answer as "option1" | "option2"];
					if (selectedOption) {
						reply = selectedOption.text;
					}
				}

				// Crear o actualizar la pregunta en la base de datos
				const dbQuestion = await prisma.question.upsert({
					where: { id: parseInt(response.questionId, 10) },
					update: { text: question.question },
					create: { id: parseInt(response.questionId, 10), text: question.question },
				});

				// Guardar la pregunta y la respuesta específicas
				return await prisma.response.create({
					data: {
						universityId: university.id,
						questionId: dbQuestion.id,
						questionText: question.question,
						answerText: reply,
					},
				});
			}
		);

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
