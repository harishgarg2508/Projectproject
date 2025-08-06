'use client'
import CreateTaskModal from "@/components/create-feedback-dialogou";
import { Button } from "@mui/material";
import { useState } from "react";
import DashboardPage from "./dashboard/page";
export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <>
    <DashboardPage/>

    </>
  );
}
