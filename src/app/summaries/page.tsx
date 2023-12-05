import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Summaries } from '@/components/summary/Summaries';
import { Title } from '@/components/common/Title';

const SummariesPage = async () => {
  let summaries = [];

  try {
    const session: any = await getServerSession(authOptions);
    const userId = session?.user?._id;

    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/summary?userId=${userId}`, { cache: 'no-store' });

    if (response.ok) {
      summaries = await response.json();
    } else {
      console.error('Failed to fetch summaries');
    }
  } catch (error) {
    console.error('Failed to fetch summaries:', error);
  }

  return (
    <>
      <Title
        title='Your summaries'
      />

      <section className='py-12 px-3.5 min-[350px]:px-6 sm:px-12'>
        <Summaries
          summaries={summaries}
        />
      </section>
    </>
  )
}

export default SummariesPage;
