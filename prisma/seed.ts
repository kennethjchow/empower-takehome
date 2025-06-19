import { PrismaClient, ContactMethod } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
   const sampleNotes = [
      {
         name: "Maria Lopez",
         contactEmail: "maria.lopez@example.com",
         content:
            "Supports our candidate, especially interested in education policy. Might volunteer.",
         canvasserName: "Jamal Rivera",
         contactMethod: ContactMethod.in_person,
         followUpNeeded: true,
      },
      {
         name: "John Kim",
         contactEmail: "john.kim@example.com",
         content: "Undecided, asked about healthcare reform. Wants a flyer emailed.",
         canvasserName: "Sophie Zhang",
         contactMethod: ContactMethod.phone,
         followUpNeeded: true,
      },
      {
         name: "Aisha Hassan",
         contactEmail: "aisha.hassan@example.com",
         content: "Strong supporter. Voted early last election. Shared canvassing tips.",
         canvasserName: "David Green",
         contactMethod: ContactMethod.in_person,
         followUpNeeded: false,
      },
      {
         name: "Robert Johnson",
         contactEmail: "robert.johnson@example.com",
         content: "No answer. Left a door hanger.",
         canvasserName: "Emily Nguyen",
         contactMethod: ContactMethod.door_hanger,
         followUpNeeded: false,
      },
   ];

   for (const note of sampleNotes) {
      await prisma.note.create({ data: note });
   }
}

main()
   .catch((e) => {
      console.error(e);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
