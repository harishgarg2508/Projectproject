'use client'
import CreateTaskModal from "@/components/createTaskDialog ";
import { Button } from "@mui/material";
import { useState } from "react";
export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <>
    {/* <Button variant="contained" onClick={() => setOpen(true)}>
      Create Task
    </Button>
    <CreateTaskModal open={open} onClose={() => setOpen(false)} /> */}

      hello
    </>
  );
}
