import { connectDB } from "@/libs/mongodb";
import Summary from "@/models/Summary";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: Request, context: any) {
    try {
        await connectDB();
        let response = [];
        const { searchParams } = new URL(request.url);
        const userEmail = searchParams.get('userEmail');
        const _id = searchParams.get('id');

        if (userEmail) {
            response = await Summary.find({ userEmail });
            response.reverse();
        } else if (_id) {
            response = await Summary.findById({ _id });
        }
        
        return NextResponse.json(response);

    } catch (error) {
        console.error('Failed to fetch summaries.', error);
        return NextResponse.json({ error: 'Failed to fetch summaries.' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();

        const { title, summary, userEmail, inputTokens, outputTokens } = await request.json();

        const summaryToSave = new Summary({
            title,
            summary,
            userEmail,
            inputTokens,
            outputTokens
        });

        const savedSummary = await summaryToSave.save();

        return NextResponse.json(savedSummary, { status: 201 });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        } else {
            console.error("Error in saving summary:", error);
            return NextResponse.error();
        }
    }
}

export async function PUT(request: Request) {
    try {
        await connectDB();

        const { summaryId, title, summary, inputTokens, outputTokens } = await request.json();

        const summaryToUpdate = await Summary.findById(summaryId);

        if (!summaryToUpdate) {
            return NextResponse.json(
                { message: "Summary not found" },
                { status: 404 }
            );
        }

        if (title) {
            summaryToUpdate.title = title;
        }

        if (summary) {
            summaryToUpdate.summary = summary;
            summaryToUpdate.inputTokens = inputTokens;
            summaryToUpdate.outputTokens = outputTokens;
        }

        await summaryToUpdate.save();

        console.log(summaryToUpdate);

        return NextResponse.json(
            {
                message: "Summary updated successfully",
                updatedSummary: {
                    id: summaryToUpdate._id,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        } else {
            console.error("Error during summary update:", error);
            return NextResponse.error();
        }
    }
}

export async function DELETE(request: Request) {
    try {
        await connectDB();

        const { summaryId } = await request.json();

        await Summary.findOneAndDelete(summaryId);

        return NextResponse.json(
            { message: "Summary deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error during summary deletion:", error);
        return NextResponse.error();
    }
}