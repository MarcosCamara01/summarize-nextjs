export function Title ({title}: {title: string }) {
    return (
        <div className="py-3 px-6 border-b mt-16 sm:mt-0 border-solid border-border-primary">
            <h1 className="text-2xl font-medium">{title}</h1>
        </div>
    )
}