export type IUser = {
    username: string;
    email: string;
    password: string;
};

export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
};