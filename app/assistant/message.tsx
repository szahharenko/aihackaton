import { AiOutlineRobot, AiOutlineUser } from "react-icons/ai";
import { Message } from "./messages";
import Markdown from "react-markdown";

export function OpenAIAssistantMessage({message}: {message:Message}) {
    return (
        <div className="flex">
            <div className="role">
                {message.role === "user" ? <AiOutlineUser /> : <AiOutlineRobot />}
            </div>
            <div className="message">
                <Markdown>
                    {message.content}
                </Markdown>
            </div>
        </div>
    )
}