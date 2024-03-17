"use client";
import Hero from "@/app/components/Hero";
import { useState } from "react";

export default function EditCustomer({ params }: { params: { id: string } }) {
  const { id } = params;
  const [openCreateArea, setOpenCreateArea] = useState(false);

  return (
    <Hero
      openCreateArea={openCreateArea}
      setOpenCreateArea={setOpenCreateArea}
    />
  );
}
