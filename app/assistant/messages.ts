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

const books = [
    'Бедные люди',
    'Униженные и оскорблённые',
    'Преступление и наказание',
    'Игрок',
    'Идиот',
    'Бесы',
    'Подросток',
    'Братья Карамазовы'
];

export const greetingMessage : Message = {
    id: "greeting",
    role: "assistant",
    content: `Привет, я Фёдор! Обсудим книги? Может ${ books[Math.floor(Math.random() * books.length)] }?`,
    createdAt: new Date(),
};