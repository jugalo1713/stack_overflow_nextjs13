"use server";

import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";
import User from "../database/user.model";

// export async function getAllUsers(params: GetAllUsersParams) {
//   try {
//     connectToDatabase();
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId, limit = 3 } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }
    //find the interactions for the user and group by tags...
    //Interaction...

    return [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2" },
      { _id: "3", name: "tag3" },
    ];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
