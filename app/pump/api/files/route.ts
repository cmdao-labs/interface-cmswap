import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/config/pinata";

export const config = {api: { bodyParser: false }};

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;
        const upload = await pinata.upload.file(file)
        return NextResponse.json(upload, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json( { error: "Internal Server Error" }, { status: 500 } );
    }
}
