"use client"

import { CountTokensResponse } from "@/components/count-tokens";

export const saveSummary = async (message: any, userId: string, inputTokens: null | CountTokensResponse, outputTokens: null | CountTokensResponse) => {
    const separator: string = ':';
    const separatorIndex: number = message.indexOf(separator);
    const title: string = message.slice(0, separatorIndex + 1).trim();
    const bodyText: string = message.slice(separatorIndex + 1).trim();
    const titleWithoutSeparator: string = title.replace(':', '').trim();

    if (bodyText !== "I'm sorry, but the text you have provided is not valid.") {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/summary`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: titleWithoutSeparator,
                    summary: bodyText,
                    userId,
                    inputTokens: inputTokens?.tokens_count,
                    outputTokens: outputTokens?.tokens_count
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Summary saved with ID:', data.id);
            } else {
                console.error('Failed to save summary');
            }
        } catch (error) {
            console.error('Error while saving summary:', error);
        }
    } else {
        console.log('Text provided is not valid.');
    }
}