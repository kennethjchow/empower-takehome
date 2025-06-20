"use client";

import { useState } from "react";
import { Button, Textarea, TextInput, Select } from "@mantine/core";

/**
 * A form component for submitting notes after canvassing or contact.
 *
 * This component captures:
 * - The contact's name and email
 * - The canvasser's name
 * - The method of contact (e.g., in-person, phone)
 * - Freeform note content
 *
 * Validates required fields and email format before sending the data
 * to the `/api/notes` endpoint via POST.
 *
 * @param {Function} onSuccess - A callback that runs after a successful submission.
 */
export default function NoteForm({ onSuccess }: { onSuccess: () => void }) {
   // State for form fields
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

   /**
    * Simple email format validator.
    *
    * @param {string} email - The email string to validate.
    * @returns {boolean} True if the email is valid.
    */
   const isValidEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
   };

   /**
    * Handles form submission:
    * - Validates required fields
    * - Checks for valid email
    * - Sends POST request to the server
    * - Calls onSuccess callback if successful
    */
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
            contactEmail,
            followUpNeeded: false, // this could be extended as a user option
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
