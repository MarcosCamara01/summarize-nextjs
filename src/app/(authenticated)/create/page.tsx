import { isMobileDevice } from '@/utils/responsive';

import DesktopPage from './(desktop)';
import MobilePage from './(mobile)';

export default function Summarize() {
    const mobile = isMobileDevice();

    const Page = mobile ? MobilePage : DesktopPage;

    return (
        <>
            <Page />
        </>
    );
};