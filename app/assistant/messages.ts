export type Role = "user" | "assistant";

export interface Message {
    id: string;
    role: Role;
    content: string;
    createdAt: Date
}

export const thinkingMessage: Message = {
    id: "Thinking...",
    role: "assistant",
    content: "_Thinking..._",
    createdAt: new Date(),
}

export const greetingMessage : Message = {
    id: "greeting",
    role: "assistant",
    content: "Hei, i'm your Forsta studio assistant. How can I help you?",
    createdAt: new Date(),
};