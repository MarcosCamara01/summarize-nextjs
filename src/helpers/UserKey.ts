"use server"

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Session } from "next-auth";
import UserKey, { UserKeyDocument } from "@/models/UserKey";
import { connectDB } from "@/libs/mongodb";

export const getUserKey = async (): Promise<UserKeyDocument | undefined> => {
    try {
        const session: Session | null = await getServerSession(authOptions);
        const email = session?.user?.email;

        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/userkey?email=${email}`);

        if (response.ok) {
            const userKey: UserKeyDocument = await response.json();
            if (userKey) {
                return userKey;
            } else {
                return undefined;
            }
        } else {
            console.error('Failed to fetch userKey');
            return undefined;
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

        const simplifiedResponse = {
            email: response.email,
            apiKey: response.apiKey,
        };
        
        return simplifiedResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
}