import React from 'react';

interface FileUploadProps {
    setInput: React.Dispatch<React.SetStateAction<string>>;
}

const FileUpload: React.FC<FileUploadProps> = ({ setInput }) => {
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('/api/upload/pdf', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.text();
                    setInput(data)
                } else {
                    throw new Error('Error uploading file');
                }
            } catch (error) {
                console.error('Error processing the file:', error);
            }
        }
    };

    return (
        <input
            className="h-[35px] block w-full text-sm border rounded cursor-pointer text-gray-400 outline-none
             bg-background-secondary border-border-primary placeholder-gray-400 file:h-[35px] file:bg-background-secondary 
             file:border-0 file:text-white file:border-r file:border-solid file:border-border-primary"
            aria-describedby="file_i nput_help"
            id="file_input" type="file"
            onChange={handleFileChange}
        />
    );
}

export default FileUpload;
