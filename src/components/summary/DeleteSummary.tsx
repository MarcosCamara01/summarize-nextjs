import React from 'react';
import { FaRegTrashAlt } from "react-icons/fa";

interface DeleteSummaryProps {
    summaryId: string;
    summaryIdToDelete: string | null
    onDelete: Function
}

export const DeleteSummary = ({ summaryId, summaryIdToDelete, onDelete }: DeleteSummaryProps) => {
    console.log(summaryId)
    const deleteSummary = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/summary`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    summaryId
                }),
            });

            if (response.ok) {
                onDelete(summaryId);
                const data = await response.json();
                console.log(data.message);
            } else {
                console.error('Failed to delete summary');
            }
        } catch (error) {
            console.error('Error while deleting summary:', error);
        }
    }

    return (
        <button
            onClick={deleteSummary}
            className={`absolute top-[-15px] right-[-15px] rounded-full 
                    bg-white w-[32px] h-[32px] flex items-center justify-center
                    transition-opacity duration-150 ease-in-out
                ${summaryIdToDelete === summaryId ? "opacity-100" : "opacity-0"}
            `}>
            <FaRegTrashAlt className='text-black' />
        </button>
    );
};