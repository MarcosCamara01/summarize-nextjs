import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import PDFParser from 'pdf2json';

export async function POST(req: NextRequest) {
    try {
        const formData: FormData = await req.formData();
        const uploadedFiles = formData.getAll('file');
        let fileName = '';
        let parsedText = '';

        if (uploadedFiles && uploadedFiles.length > 0) {
            const uploadedFile = uploadedFiles[0];

            if (uploadedFile instanceof File) {
                fileName = uuidv4();
                const tempFilePath = `C:\\Users\\marco\\AppData\\Local\\Temp\\${fileName}.pdf`;
                const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

                await fs.writeFile(tempFilePath, fileBuffer);

                const pdfParser = new (PDFParser as any)(null, 1);

                pdfParser.on('pdfParser_dataError', (errData: any) =>
                    console.error('Error processing the PDF file:', errData.parserError)
                );

                const pdfPromise = new Promise((resolve, reject) => {
                    pdfParser.on('pdfParser_dataReady', () => {
                        parsedText = (pdfParser as any).getRawTextContent();
                        fs.unlink(tempFilePath).then(() => {
                            resolve(parsedText);
                        });
                    });
                });

                pdfParser.loadPDF(tempFilePath);

                await pdfPromise;

                return new NextResponse(parsedText);
            } else {
                console.error('The uploaded file is not a valid file.');
            }
        } else {
            console.error('No files were found.');
        }

        return new NextResponse('The PDF file could not be processed.', { status: 400 });
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        return new NextResponse('An error occurred while processing the request.', { status: 500 });
    }
}
