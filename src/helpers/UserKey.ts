"use server"

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Session } from "next-auth";
import UserKey, { UserKeyDocument } from "@/models/UserKey";
import { connectDB } from "@/libs/mongodb";

export const getUserKey = async (): Promise<string | undefined> => {
    try {
        const session: Session | null = await getServerSession(authOptions);
        const email = session?.user?.email;

        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/userkey?email=${email}`);

        if (response.ok) {
            const userKey: UserKeyDocument = await response.json();
            if (userKey) {
                return userKey.apiKey;
            } else {
                return "empty"
            }
        } else {
            console.error('Failed to fetch userKey');
        }
    } catch (error) {
        console.error('Failed to fetch userKey:', error);
    }
}

export const updateUserKey = async (apiKey: string | undefined): Promise<number | undefined> => {
    try {
        if (apiKey === undefined) {
            throw new Error('API Key is undefined');
        }

        const session: Session | null = await getServerSession(authOptions);
        const email = session?.user?.email;

        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/userkey`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                apiKey
            }),
        });

        if (response.ok) {
            return response.status;
        } else {
            console.error('Failed to fetch userKey');
        }
    } catch (error) {
        console.error('Failed to fetch userKey:', error);
    }
}

export const createUserKey = async (apiKey: string | undefined) => {
    try {
        if (apiKey === undefined) {
            throw new Error('API Key is undefined');
        }

        await connectDB();

        const session: Session | null = await getServerSession(authOptions);
        const email = session?.user?.email;

        const response = await UserKey.create({
            email: email,
            apiKey: apiKey
        });

        return response.status;
    } catch (error) {
        console.error(error)
    }
}