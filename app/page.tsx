import OpenAIAssistant from "./assistant/openai-assistant";

const assistantId = process.env.OPENAI_ASSISTANT_ID;
const welcomeMessage = process.env.WELCOME_MESSAGE;

export default function Home() {
  if(!assistantId) {
    return <div>Assistant ID not found. Please add variable <strong>OPENAI_ASSISTANT_ID</strong></div>
  }
  return <OpenAIAssistant assistantId={assistantId} welcomeMessage={welcomeMessage} />;
}
