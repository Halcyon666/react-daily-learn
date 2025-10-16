import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

// 🚨👉 ALERT: Read message below! You've been warned! 👈🚨
// If you're following along on your local machine instead of
// here on Scrimba, make sure you don't commit your API keys
// to any repositories and don't deploy your project anywhere
// live online. Otherwise, anyone could inspect your source
// and find your API keys/tokens. If you want to deploy
// this project, you'll need to create a backend of some kind,
// either your own or using some serverless architecture where
// your API calls can be made. Doing so will keep your
// API keys private.
const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

const anthropic = new Anthropic({
  // Make sure you set an environment variable in Scrimba
  // for ANTHROPIC_API_KEY
  apiKey,
  baseURL: "https://api.siliconflow.cn",
  dangerouslyAllowBrowser: true,
});

export async function getRecipeFromChefClaude(ingredientsArr: string[]) {
  const ingredientsString = ingredientsArr.join(", ");

  const msg = await anthropic.messages.create({
    model: "Qwen/Qwen3-32B",
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
      },
    ],
  });

  // index 0 is thinking block and 1 is the answer
  return msg.content[1].text;
}

/**
 * 流式生成食谱
 * @param ingredientsArr 配料数组
 * @param onChunk 每次收到新内容时触发（追加字符串）
 */
export async function getRecipeFromChefClaudeStream(
  ingredientsArr: string[],
  onChunk: (text: string) => void
) {
  const ingredientsString = ingredientsArr.join(", ");

  // 调用流式接口
  const stream = await anthropic.messages.stream({
    model: "Qwen/Qwen3-32B",
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
      },
    ],
  });

  // 持续读取事件流
  for await (const event of stream) {
    if (event.type === "content_block_delta") {
      const delta = (event as any).delta;
      if (delta?.type === "text_delta" && delta?.text) {
        onChunk(delta.text); // 每一小段内容触发回调
      }
    }
  }
}
