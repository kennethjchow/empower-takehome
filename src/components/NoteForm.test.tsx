import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import NoteForm from "./NoteForm";

jest.mock("@mantine/core", () => ({
   Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
   Textarea: ({ label, id, ...props }: any) => (
      <div>
         <label htmlFor={id}>{label}</label>
         <textarea id={id} {...props} />
      </div>
   ),
   TextInput: ({ label, id, ...props }: any) => (
      <div>
         <label htmlFor={id}>{label}</label>
         <input type="text" id={id} {...props} />
      </div>
   ),
   Select: ({ label, data, value, onChange, id, ...props }: any) => (
      <div>
         <label htmlFor={id}>{label}</label>
         <select
            id={id}
            value={value === null ? "" : value}
            onChange={(e) => onChange(e.target.value)}
            {...props}
         >
            <option value="" disabled hidden>
               Pick one
            </option>
            {data.map((item: { value: string; label: string }) => (
               <option key={item.value} value={item.value}>
                  {item.label}
               </option>
            ))}
         </select>
      </div>
   ),
}));

global.fetch = jest.fn();

const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});

describe("NoteForm", () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   it("should render all form fields and submit button", () => {
      render(<NoteForm onSuccess={() => {}} />);

      expect(screen.getByText("Contact Name")).toBeInTheDocument();
      expect(screen.getByText("Contact Email")).toBeInTheDocument();
      expect(screen.getByText("Canvasser Name")).toBeInTheDocument();
      expect(screen.getByText("Contact Method")).toBeInTheDocument();
      expect(screen.getByText("Notes")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
   });

   it("should show an alert if required fields are missing on submit", async () => {
      render(<NoteForm onSuccess={() => {}} />);
      const user = userEvent.setup(); // Initialize user-event for simulating user actions

      await user.click(screen.getByRole("button", { name: "Submit" }));

      expect(mockAlert).toHaveBeenCalledWith("Contact name, email, and method are required.");
      expect(fetch).not.toHaveBeenCalled();
   });

   //Needs test for successful submission
});
