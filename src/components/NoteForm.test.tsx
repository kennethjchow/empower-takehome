import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import NoteForm from "./NoteForm";
import { jest } from "@jest/globals";

global.fetch = jest.fn(() =>
   Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
   })
) as unknown as typeof fetch;

const renderWithMantine = (ui: React.ReactElement) => {
   return render(<MantineProvider>{ui}</MantineProvider>);
};

describe("NoteForm", () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   it("shows validation alert if required fields are missing", async () => {
      const onSuccess = jest.fn();
      window.alert = jest.fn();

      renderWithMantine(<NoteForm onSuccess={onSuccess} />);

      fireEvent.click(screen.getByRole("button", { name: /submit/i }));

      await waitFor(() => {
         expect(window.alert).toHaveBeenCalledWith(
            "Contact name, email, and method are required."
         );
      });
      expect(onSuccess).not.toHaveBeenCalled();
   });

   // ... rest of your tests using renderWithMantine ...
});
