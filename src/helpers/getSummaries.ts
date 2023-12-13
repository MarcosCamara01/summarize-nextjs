"use server"

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Session } from "next-auth";
import { SummaryDoc } from "@/models/Summary";

export const getSummaries = async (): Promise<SummaryDoc[] | undefined> => {
    try {
        const session: Session | null = await getServerSession(authOptions);
        const userEmail = session?.user?.email;

        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/summary?userEmail=${userEmail}`, { cache: 'no-store' });

        if (response.ok) {
            const summaries: SummaryDoc[] = await response.json();
            return summaries;
        } else {
            console.error('Failed to fetch summaries');
        }
    } catch (error) {
        console.error('Failed to fetch summaries:', error);
    }
}

export const getSingleSummary = async (summaryId: string): Promise<SummaryDoc | undefined> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/summary?id=${summaryId}`);

        if (response.ok) {
            const summary: SummaryDoc = await response.json();
            return summary;
        } else {
            console.error('Failed to fetch summaries');
        }
        
    } catch (error) {
        console.error('Failed to fetch summaries:', error);
    }
}