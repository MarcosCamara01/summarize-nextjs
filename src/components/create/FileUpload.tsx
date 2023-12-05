import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.css';

interface FileUploadProps {
    setInput: React.Dispatch<React.SetStateAction<string>>;
}

const FileUpload: React.FC<FileUploadProps> = ({ setInput }) => {
    const handleProcessFile = (error: any, text: any) => {
        if (!error) {
            setInput(text.serverId)
        } else {
            console.error('Error processing the file:', error);
        }
    };

    return (
        <FilePond
            server={{
                process: '/api/upload/pdf',
                fetch: null,
                revert: null,
            }}
            onprocessfile={handleProcessFile}
        />
    );
}

export default FileUpload;