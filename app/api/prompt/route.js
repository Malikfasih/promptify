import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async ({ request, response }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");
    response.setHeader("Cache-Control", "no-cache");
    response.status(200).json(prompts);
    // return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error("this is an error", error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
