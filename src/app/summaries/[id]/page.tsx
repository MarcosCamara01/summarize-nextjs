import React from 'react';
import { Summary } from '@/components/summary/Summary';

type Props = {
    params: {
        id: string;
    };
};

const SummaryPage = async ({ params }: Props) => {
  let summary = [];
    console.log(params.id)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/summary?id=${params.id}`);

    if (response.ok) {
        summary = await response.json();
    } else {
      console.error('Failed to fetch summary');
    }

  } catch (error) {
    console.error('Failed to fetch summary:', error);
  }
  
  return (
    <Summary
      title={summary.title}
      summary={summary.summary}
    />
  )
}

export default SummaryPage;
