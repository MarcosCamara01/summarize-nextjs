export const summaryWithTitle = (message: string) => {
    const separator: string = ':';
    const separatorIndex: number = message?.indexOf(separator);
    const title: string = message?.slice(0, separatorIndex + 1).trim();
    const bodyText: string = message?.slice(separatorIndex + 1).trim();
    const titleWithoutSeparator: string = title?.replace(':', '').trim();

    return {
        title: titleWithoutSeparator,
        summary: bodyText,
    }
}