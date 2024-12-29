import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { chapters, courseId, type } = await req.json();

    // Add the condition for 'QA' in the prompt generation
    const PROMPT = type === 'Flashcard' 
        ? `Generate the flashcard on topic: ${chapters} in JSON format with front and back content, Maximum 15`
        : type === 'Quiz'
        ? `Generate Quiz on topic: ${chapters} with Question and Options along with correct answer in JSON format, (Max 10)`
        : type === 'Question/Answer'
        ? `Generate Question and Answer on topic: ${chapters} in JSON format, (Max 10)`
        : '';

    if (!PROMPT) {
        return NextResponse.json({ error: 'Invalid study type' }, { status: 400 });
    }

    // Insert Record to DB, update the status to Generating...
    const result = await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
        courseId: courseId,
        type: type,
    }).returning({ id: STUDY_TYPE_CONTENT_TABLE.id });

    // Trigger inngest function
    inngest.send({
        name: 'studyType.content',
        data: {
            studyType: type,
            prompt: PROMPT,
            courseId: courseId,
            recordId: result[0].id
        }
    });

    return NextResponse.json(result[0].id);
}
