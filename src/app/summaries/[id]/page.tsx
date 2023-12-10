import Frame from '@/components/frame/Frame';
import { getSingleSummary } from '@/helpers/getSummaries';

export default async function SingleSummary({ params: { id: summaryId } }: { params: { id: string } }) {
    const summary = await getSingleSummary(summaryId);
    
    return (
        <div className="container mx-auto my-10">
            <div className="w-1/2 mx-auto">
                <Frame summary={summary} />
            </div>
        </div>
    )
}