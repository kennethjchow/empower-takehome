import { GET, POST } from "@/app/api/notes/route";
import { PrismaClient, ContactMethod } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

jest.mock("@prisma/client", () => {
   const mockPrismaClient = {
      note: {
         findMany: jest.fn(),
         create: jest.fn(),
      },
      $connect: jest.fn(),
      $disconnect: jest.fn(),
   };
   return {
      PrismaClient: jest.fn(() => mockPrismaClient),
      ContactMethod: {
         in_person: "in_person",
         phone: "phone",
         email: "email",
         door_hanger: "door_hanger",
      },
   };
});

jest.mock("next/server", () => {
   const mockNextResponse = {
      json: jest.fn((data, init) => ({
         json: () => Promise.resolve(data),
         status: init?.status || 200,
         headers: new Headers(init?.headers),
      })),
   };
   return {
      NextRequest: jest.fn(),
      NextResponse: mockNextResponse,
   };
});

const prisma = new PrismaClient();

describe("/api/notes API Tests", () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   describe("GET /api/notes", () => {
      it("should return a list of notes", async () => {
         const mockNotes = [
            {
               id: "1",
               name: "Note 1",
               contactMethod: ContactMethod.email,
               createdAt: new Date(),
            },
            {
               id: "2",
               name: "Note 2",
               contactMethod: ContactMethod.phone,
               createdAt: new Date(),
            },
         ];
         (prisma.note.findMany as jest.Mock).mockResolvedValue(mockNotes);

         const response = await GET({} as NextRequest);
         const responseBody = await response.json();

         expect(response.status).toBe(200);
         expect(responseBody).toEqual(mockNotes);
         expect(prisma.note.findMany).toHaveBeenCalledWith({
            orderBy: { createdAt: "desc" },
         });
      });

      it("should handle server errors when fetching notes", async () => {
         (prisma.note.findMany as jest.Mock).mockRejectedValue(new Error("Database error"));
         const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

         const response = await GET({} as NextRequest);
         const responseBody = await response.json();

         expect(response.status).toBe(500);
         expect(responseBody).toEqual({ error: "Internal Server Error" });
         expect(consoleErrorSpy).toHaveBeenCalledWith(
            "Failed to fetch notes:",
            expect.any(Error)
         );
         consoleErrorSpy.mockRestore();
      });
   });

   describe("POST /api/notes", () => {
      it("should create a new note successfully", async () => {
         const requestBody = {
            name: "New Note",
            content: "Content for new note.",
            canvasserName: "John Doe",
            contactMethod: "in_person",
            followUpNeeded: true,
         };
         const createdNote = {
            id: "3",
            ...requestBody,
            contactMethod: ContactMethod.in_person,
         };
         (prisma.note.create as jest.Mock).mockResolvedValue(createdNote);

         const mockRequest = {
            json: jest.fn().mockResolvedValue(requestBody),
         } as unknown as NextRequest;
         const response = await POST(mockRequest);
         const responseBody = await response.json();

         expect(response.status).toBe(201);
         expect(responseBody).toEqual(createdNote);
      });

      it("should return 400 if required fields (name or contactMethod) are missing", async () => {
         const requestBody = { content: "Some content", contactMethod: "email" };
         const mockRequest = {
            json: jest.fn().mockResolvedValue(requestBody),
         } as unknown as NextRequest;
         const response = await POST(mockRequest);
         const responseBody = await response.json();

         expect(response.status).toBe(400);
         expect(responseBody).toEqual({
            error: "Missing required fields: name and contactMethod",
         });
         expect(prisma.note.create).not.toHaveBeenCalled();
      });

      it("should return 400 if contactMethod is invalid", async () => {
         const requestBody = { name: "Note", contactMethod: "bad_method" };
         const mockRequest = {
            json: jest.fn().mockResolvedValue(requestBody),
         } as unknown as NextRequest;
         const response = await POST(mockRequest);

         expect(response.status).toBe(400);
         expect(prisma.note.create).not.toHaveBeenCalled();
      });
   });
});
