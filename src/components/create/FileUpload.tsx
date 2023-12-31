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
        <input type="file" onChange={handleFileChange} />
    );
}

export default FileUpload;
