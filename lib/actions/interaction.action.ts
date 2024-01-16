"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    const { questionId, userId } = params;
    

    //update view count for the question
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) return console.log("User has already viewed");

      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }

    await connectToDatabase();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
