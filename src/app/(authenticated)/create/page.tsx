import { Title } from '@/components/common/Title';
import CreateSummary from '@/components/create/CreateSummary';

export default function Summarize() {

    return (
        <>
            <Title
                title='Create a summary'
            />

            <section className="w-full min-h-[87vh] sm:min-h-[94vh] flex flex-col items-center justify-center">
                <CreateSummary />
            </section>
        </>
    )
}