import { Title } from '@/components/common/Title';
import CreateSummary from '@/components/create/CreateSummary';

export default function Summarize() {

    return (
        <>
            <Title
                title='Create a summary'
            />

            <section className="w-full min-h-[70vh] flex flex-col items-center justify-center">
                <CreateSummary />
            </section>
        </>
    )
}