"use server"

import { CountTokensResponse } from "@/components/count-tokens";
import { summaryWithTitle } from "./summaryWithTitle";

export const saveSummary = async (message: any, userId: string, inputTokens: null | CountTokensResponse, outputTokens: null | CountTokensResponse) => {
    const content = summaryWithTitle(message);

    if (content.summary !== "I'm sorry, but the text you have provided is not valid.") {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/summary`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: content.title,
                    summary: content.summary,
                    userId,
                    inputTokens: inputTokens?.tokens_count,
                    outputTokens: outputTokens?.tokens_count
                }),
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error('Failed to save summary');
                return 'Failed to save summary';
            }
        } catch (error) {
            console.error('Error while saving summary:', error);
            return 'Failed to save summary';
        }
    } else {
        console.log('Text provided is not valid.');
        return 'Text provided is not valid.';
    }
}