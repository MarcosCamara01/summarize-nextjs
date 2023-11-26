import { connectDB } from "@/libs/mongodb";
import Summary from "@/models/Summary";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request: Request) {
    try {
        await connectDB();

        const { title, summary, userId } = await request.json();

        const summaryToSave = new Summary({
            title,
            summary,
            userId
        });

        const savedSummary = await summaryToSave.save();

        console.log(savedSummary);

        return NextResponse.json(
            {
                id: savedSummary._id,
            },
            { status: 201 }
        );
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

        const { summaryId, title, summary } = await request.json();

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

        const summary = await Summary.findById(summaryId);

        if (!summary) {
            return NextResponse.json(
                { message: "Summary not found" },
                { status: 404 }
            );
        }

        await summary.remove();

        return NextResponse.json(
            { message: "Summary deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error during summary deletion:", error);
        return NextResponse.error();
    }
}