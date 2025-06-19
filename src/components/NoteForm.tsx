"use client";

import { useState } from "react";
import { Button, Textarea, TextInput, Select } from "@mantine/core";

export default function NoteForm({ onSuccess }: { onSuccess: () => void }) {
   const [contactName, setContactName] = useState("");
   const [contactEmail, setContactEmail] = useState("");
   const [canvasserName, setCanvasserName] = useState("");
   const [content, setContent] = useState("");
   const [contactMethod, setContactMethod] = useState<string | null>(null);

   const contactMethods = [
      { value: "in_person", label: "In-Person" },
      { value: "phone", label: "Phone" },
      { value: "email", label: "Email" },
      { value: "door_hanger", label: "Door Hanger" },
   ];

   const isValidEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
   };

   const handleSubmit = async () => {
      if (!contactName || !contactEmail || !contactMethod) {
         alert("Contact name, email, and method are required.");
         return;
      }

      if (!isValidEmail(contactEmail)) {
         alert("Please enter a valid email address.");
         return;
      }

      const res = await fetch("/api/notes", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            name: contactName,
            canvasserName,
            content,
            contactMethod,
            followUpNeeded: false, // you can make this dynamic if needed
         }),
      });

      if (res.ok) {
         onSuccess();
      } else {
         alert("error");
      }
   };

   return (
      <>
         <TextInput
            label="Contact Name"
            placeholder="Who did you talk to?"
            value={contactName}
            onChange={(e) => setContactName(e.currentTarget.value)}
            required
         />
         <TextInput
            label="Contact Email"
            placeholder="hello@example.com"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.currentTarget.value)}
            required
         />
         <TextInput
            label="Canvasser Name"
            placeholder="Your name"
            value={canvasserName}
            onChange={(e) => setCanvasserName(e.currentTarget.value)}
         />
         <Select
            label="Contact Method"
            placeholder="Pick one"
            data={contactMethods}
            value={contactMethod}
            onChange={setContactMethod}
         />
         <Textarea
            label="Notes"
            placeholder="What did they say?"
            value={content}
            onChange={(e) => setContent(e.currentTarget.value)}
         />
         <Button mt="md" onClick={handleSubmit}>
            Submit
         </Button>
      </>
   );
}
