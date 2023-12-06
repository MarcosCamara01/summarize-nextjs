'use server';

import { encoding_for_model } from "@dqbd/tiktoken";

export async function countTokens(data: string) {
  try {
    const text = data;
    const model = "gpt-3.5-turbo";

    const text_trimmed = text.trim();

    const tokenizer = encoding_for_model(model);
    const tokens = tokenizer.encode(text_trimmed);
    tokenizer.free();

    return {
      characters: text_trimmed.length,
      words: text_trimmed.split(/\s+/).length,
      tokens: tokens,
      tokens_count: tokens.length
    }
  } catch (error: any) {
    return {
      error: {
        message: error?.message || 'Unknown error'
      }
    }
  }
}

export type CountTokensResponse = Awaited<ReturnType<typeof countTokens>>;