'use client'

import { AssistantStream } from 'openai/lib/AssistantStream';
import { useState, useRef } from "react";
import { AiOutlineUser, AiOutlineRobot, AiOutlineSend } from "react-icons/ai";
import Markdown from 'react-markdown';
import { Message, Role, greetingMessage, thinkingMessage } from './messages';

export default function OpenAIAssistant({assistantId = ""}: {assistantId: string}) {
    const [isLoading, setIsLoading] = useState(false);
    const [threadId, setThreadId] = useState<string|null>(null);
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [streamingMessage, setStreamingMessage] = useState<Message>(thinkingMessage);
    const messageId = useRef(0);
    const addMessage = ({content, role, } : {content: string, role: Role}) => {
        messageId.current ++;
        setMessages((prevMessages) => {
            return[
                ...prevMessages,
                {
                    id: messageId.current.toString(),
                    role,
                    content,
                    createdAt: new Date(),
                }
            ]
        });
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStreamingMessage({...thinkingMessage, createdAt: new Date()});
        setIsLoading(true);
        addMessage({content: prompt, role: "user"});
        setPrompt("");

        const response = await fetch('/api/openai-assistant', {
            method: 'POST',
            body: JSON.stringify({
                assistantId,
                threadId,
                content: prompt,
            }),
        });

        if (!response.body) return;

        const runner = AssistantStream.fromReadableStream(response.body);
        runner.on('messageCreated', (message) => {
            setThreadId(message.thread_id);
        });
        runner.on('textDelta', (_delta, contentSnapshot) => {
            setStreamingMessage({
                ...streamingMessage,
                content: contentSnapshot.value,
            });
        });
        runner.on('messageDone', (message) => {
            const content =  message.content[0].type == "text" ? message.content[0].text.value : "";
            addMessage({content, role: "assistant"});
            setIsLoading(false);
        });
        runner.on('error', (error) => {
            alert("An error occurred. Please try again.");
            console.error(error);
        });
    }

    function handlePromptChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPrompt(e.target.value);
    }

    return (
        <div className="flex flex-col relative">
            <OpenAIAssistantMessage message={greetingMessage} />
            {messages.map(m =>
                <OpenAIAssistantMessage
                    key={m.id}
                    message={m}
                />
            )}
            {isLoading &&
                <OpenAIAssistantMessage
                    message={streamingMessage}
                />
            }
            <form onSubmit={handleSubmit} className="flex">
                <input
                    disabled={isLoading}
                    autoFocus
                    onChange={handlePromptChange}
                    value={prompt}
                    placeholder="prompt" />
                {isLoading ?
                    <button disabled>💬</button>
                    :
                    <button disabled={prompt.length == 0}>
                        <AiOutlineSend />
                    </button>
                }
            </form>
        </div>
    )
}

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
