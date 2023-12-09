import Frame from '@/components/frame/Frame';

export default async function PhotoPage({ params: { id: summaryId } }: { params: { id: string } }) {
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
        <div className="container mx-auto my-10">
            <div className="w-1/2 mx-auto">
                <Frame summary={summary} />
            </div>
        </div>
    )
}