import React from 'react';
import { FiTrash } from "react-icons/fi";

interface DeleteSummaryProps {
    summaryId: string;
    summaryIdToDelete: string | null
    onDelete: Function
}

export const DeleteSummary = ({ summaryId, summaryIdToDelete, onDelete }: DeleteSummaryProps) => {
    const deleteSummary = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/summary`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    summaryIdToDelete
                }),
            });

            if (response.ok) {
                onDelete(summaryIdToDelete);
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
                    transition-all duration-150 ease-in-out hover:bg-gray-300
                    ${summaryIdToDelete === summaryId ? "opacity-100" : "opacity-0"}
            `}>
            <FiTrash className='text-black text-sm' />
        </button>
    );
};