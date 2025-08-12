'use client'
import CreateTaskModal from "@/components/create-feedback-dialogou";
import { Button } from "@mui/material";
import { useState } from "react";
import DashboardPage from "./dashboard/page";
import Head from "next/head";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <>
     <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>
    <DashboardPage/>

    </>
  );
}
