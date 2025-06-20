import { ContactMethod, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
   try {
      const notes = await prisma.note.findMany({
         orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(notes);
   } catch (error) {
      console.error("Failed to fetch notes:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
   }
}

export async function POST(request: NextRequest) {
   try {
      const body = await request.json();

      const { name, content, canvasserName, contactMethod, followUpNeeded, contactEmail } =
         body;

      if (!name || !contactMethod) {
         return NextResponse.json(
            { error: "Missing required fields: name and contactMethod" },
            { status: 400 }
         );
      }

      // Ensure contactMethod is a valid enum value
      if (!Object.values(ContactMethod).includes(contactMethod)) {
         return NextResponse.json(
            {
               error: `Invalid contactMethod: must be one of ${Object.values(
                  ContactMethod
               ).join(", ")}`,
            },
            { status: 400 }
         );
      }

      const newNote = await prisma.note.create({
         data: {
            name,
            content,
            canvasserName,
            contactMethod,
            contactEmail,
            followUpNeeded: Boolean(followUpNeeded),
         },
      });

      return NextResponse.json(newNote, { status: 201 });
   } catch (error) {
      console.error("POST /api/notes error:", error);
      return NextResponse.json({ error: "Failed to create note" }, { status: 500 });
   }
}
