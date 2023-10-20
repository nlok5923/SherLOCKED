import { OpenAI } from "langchain/llms/openai";

const model = new OpenAI({
  modelName: "gpt-3.5-turbo-16k",
  openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const getLLMResponse = async ({ question = "", statement = "" }) => {
  if (!question) return null;

  const template = `
      Model Name: (Bot Created by Biomi)
  
      Description: Your goal is to answer the questions in most appropriate ways and as precise as possible
      
      Instruction: You will be given a statement and a question and you'll have to answer the question with one word or as directed and the answer should only be derived from that statement only and in case if the answer is not avalaible in the statement please return "-" as answer.
      ----------------------------------------------------------------------------------------
      Statement:-
      ${statement}
  
      ----------------------------------------------------------------------------------------
      Question: ${question}
      `;

  try {
    const res1 = await model.call(template);
    return res1;
  } catch (error) {
    console.log({ error });
    console.log(error.response);
  }
};

export default getLLMResponse;
