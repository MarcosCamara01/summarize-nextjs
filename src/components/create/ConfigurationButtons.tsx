type LanguageButtonProps = {
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

export const LanguageButton: React.FC<LanguageButtonProps> = ({ setLanguage }) => {
    const SUPPORTED_LANGUAGES = ["Default", "Spanish", "English", "Deutsch", "Dutch", "French", "Italian"]

    return (
        <div data-bs-theme="dark">
            <select
                className="text-white bg-background-secondary border border-solid border-border-primary px-3 py-1.5 rounded"
                onChange={(e) => {
                    setLanguage(e.target.value)
                }}
            >
                {
                    SUPPORTED_LANGUAGES.map((lang: string) => (
                        <option key={lang} value={lang}>
                            {lang}
                        </option>
                    ))
                }
            </select>
        </div>
    );
}
