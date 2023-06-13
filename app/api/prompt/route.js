import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, response) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    // response.headers.set("Cache-Control", "no-cache"); // Disable caching

    return new Response(JSON.stringify(prompts), { status: 200 });
    // return {
    //   status: 200,
    //   headers: {
    //     "Cache-Control": "no-cache", // Disable caching
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(prompts),
    // };
  } catch (error) {
    console.error("Failed to fetch all prompts:", error); // Log the error for debugging purposes
    return new Response("Failed to fetch all prompts", { status: 500 });
    // return {
    //   status: 500,
    //   body: "Failed to fetch all prompts",
    // };
  }
};
