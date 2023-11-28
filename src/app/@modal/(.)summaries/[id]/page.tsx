import Frame from '@/components/frame/Frame'
import Modal from '@/components/modal/Modal'

export default async function PhotoModal({ params: { id: summaryId } }: { params: { id: string } }) {
    let summary = [];

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/summary?id=${summaryId}`);

        if (response.ok) {
            summary = await response.json();
        } else {
            console.error('Failed to fetch summaries');
        }
        
    } catch (error) {
        console.error('Failed to fetch summaries:', error);
    }
    
    return (
        <Modal>
            <Frame summary={summary} />
        </Modal>
    )
}