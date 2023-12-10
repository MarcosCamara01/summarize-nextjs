import Frame from '@/components/frame/Frame'
import Modal from '@/components/modal/Modal'
import { getSingleSummary } from '@/helpers/getSummaries'

export default async function PhotoModal({ params: { id: summaryId } }: { params: { id: string } }) {
    const summary = await getSingleSummary(summaryId);
    
    return (
        <Modal>
            <Frame summary={summary} />
        </Modal>
    )
}