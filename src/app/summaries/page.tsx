import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Summaries } from '@/components/summary/Summaries';

const SummariesPage = async () => {
  let summaries = [];

  try {
    const session: any = await getServerSession(authOptions);
    const userId = session?.user?._id;

    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/summary?userId=${userId}`);

    if (response.ok) {
      summaries = await response.json();
    } else {
      console.error('Failed to fetch summaries');
    }
  } catch (error) {
    console.error('Failed to fetch summaries:', error);
  }
  
  return (
    <Summaries
      summaries={summaries}
    />
  )
}

export default SummariesPage;
