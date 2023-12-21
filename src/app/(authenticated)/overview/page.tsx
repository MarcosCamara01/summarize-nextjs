import { isMobileDevice } from '@/utils/responsive';
import Redirect from '@/components/overview/Redirect';

import DesktopPage from './(desktop)';
import MobilePage from './(mobile)';

const OverviewPage = async () => {
  const mobile = isMobileDevice();

  const Page = mobile ? MobilePage : DesktopPage;

  return (
    <>
      <Redirect />
      <Page />
    </>
  );
};

export default OverviewPage;