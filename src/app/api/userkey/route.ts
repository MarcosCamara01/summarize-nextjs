import { connectDB } from "@/libs/mongodb";
import UserKey from "@/models/UserKey";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        const response = await UserKey.findOne({ email });

        return NextResponse.json(response);

    } catch (error) {
        console.error('Failed to fetch summaries.', error);
        return NextResponse.json({ error: 'Failed to fetch summaries.' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await connectDB();

        const { email, apiKey } = await request.json();

        const keyToUpdate = await UserKey.findOneAndUpdate({ email: email }, { apiKey: apiKey });

        return NextResponse.json(
            {
                message: "UserKey updated successfully",
                keyToUpdate
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
            console.error("Error during userKey update:", error);
            return NextResponse.error();
        }
    }
}

export async function DELETE(request: Request) {
    try {
        await connectDB();

        const { email } = await request.json();

        const userKey = await UserKey.findOneAndDelete(email);

        return NextResponse.json(
            { message: "UserKey deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error during userKey item deletion:", error);
        return NextResponse.error();
    }
}