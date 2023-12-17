import { isMobileDevice } from '@/utils/responsive';

import DesktopPage from './(desktop)';
import MobilePage from './(mobile)';

export default async function SingleSummary({ params: { id: summaryId } }: { params: { id: string } }) {
    const mobile = isMobileDevice();

    const Page = mobile ? MobilePage : DesktopPage;

    return (
        <>
            <Page
                summaryId={summaryId}
            />
        </>
    );
}