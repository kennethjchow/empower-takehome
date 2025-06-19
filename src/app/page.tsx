"use client";

import NoteForm from "@/components/NoteForm";
import { Box, Button, Drawer, Flex, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";

export default function GettingStartedExample() {
   const [notes, setNotes] = useState<any[]>([]);

   const [opened, { open, close }] = useDisclosure(false);
   const fetchNotes = async () => {
      try {
         const res = await fetch(`/api/notes`);
         if (!res.ok) throw new Error("Failed to fetch job listings");
         const data = await res.json();
         setNotes(data);
      } catch (error) {
         console.error("Error fetching jobs:", error);
      }
   };

   const onSuccess = () => {
      fetchNotes();
      close();
   };

   useEffect(() => {
      fetchNotes();
   }, []);
   return (
      <Box mx="xl" mt="lg">
         <Flex justify="space-between" mb="lg">
            <Title order={2}>Canvas App</Title>
            <Button onClick={open}>New Note</Button>
         </Flex>
         <Drawer opened={opened} onClose={close} title="New Note" position="right">
            <NoteForm onSuccess={onSuccess} />
         </Drawer>
         <DataTable
            withTableBorder
            borderRadius="sm"
            highlightOnHover
            // provide data
            records={notes}
            columns={[
               {
                  accessor: "id",
                  // this column has a custom title
                  title: "#",
                  // right-align column
                  textAlign: "right",
               },
               { accessor: "name" },
               { accessor: "canvasserName" },
               { accessor: "contactMethod" },
            ]}
            //  onRowClick={}
         />
      </Box>
   );
}
