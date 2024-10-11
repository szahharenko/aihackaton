export type Role = "user" | "assistant";

export interface Message {
    id: string;
    role: Role;
    content: string;
    createdAt: Date
}

export const thinkingMessage: Message = {
    id: "...",
    role: "assistant",
    content: "_Thinking..._",
    createdAt: new Date(),
}

export const greetingMessage : Message = {
    id: "greeting",
    role: "assistant",
    content: `Hei there! I'm your assistant. How can I help you today?`,
    createdAt: new Date(),
};