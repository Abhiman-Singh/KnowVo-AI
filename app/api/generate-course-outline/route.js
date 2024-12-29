import { courseOutline } from "@/configs/AiModal";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { courseId, topic, studyType, difficultyLevel, createdBy } = await req.json();
    
    const PROMPT = `Generate a study material for ${topic} for ${studyType} and level of difficulty will be ${difficultyLevel} with summery of course, List of Chapters along with summery for each chapter,emoji for each chapter, Topic list in each chapter, All result in JSON format`;

    const aiResp = await courseOutline.sendMessage(PROMPT);
    const aiResult = JSON.parse(aiResp.response.text());

    const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId,
        courseType: studyType,
        createdBy,
        topic,
        difficultyLevel,
        courseLayout: aiResult,
    }).returning({resp:STUDY_MATERIAL_TABLE});

    const result= await inngest.send({
        name: 'notes.generate',
        data: {
            course: dbResult[0].resp
        }

    })

    console.log(result);

    return NextResponse.json({result:dbResult[0]})

    

    
}