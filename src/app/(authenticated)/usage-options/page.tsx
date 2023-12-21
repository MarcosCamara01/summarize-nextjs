import { NewKey } from "@/components/account/NewKey";
import { isMobileDevice } from "@/utils/responsive";

const UsageOptions = async () => {
    const mobile = isMobileDevice();

    return (
        <NewKey
            isMobile={mobile}
        />
    );
};

export default UsageOptions;