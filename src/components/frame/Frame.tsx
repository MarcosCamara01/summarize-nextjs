import { SummaryDoc } from "@/models/Summary"

export default function Frame({ summary }: { summary: SummaryDoc }) {
    return (
        <div className="bg-background-secondary rounded border border-solid border-border-primary p-7">
            <h3 className="text-center text-xl font-bold mb-6">{summary.title}</h3>
            <p>{summary.summary}</p>
        </div>
    )
}