"use client";
import Hero from "@/app/components/Hero";
import { useState } from "react";

export default function EditCustomer({ params }: { params: { id: string } }) {
  const { id } = params;
  const [openCreateArea, setOpenCreateArea] = useState(false);

  return (
    <div className="flex w-full min-h-screen flex-col">
      <div className="flex w-full flex-1 justify-center mt-0 p-4 sm:mt-32 sm:p-0">
        <main className="flex flex-col w-full sm:w-4/5 p-4 bg-gray-100 rounded-lg shadow-lg">
          <Hero
            openCreateArea={openCreateArea}
            setOpenCreateArea={setOpenCreateArea}
          />
        </main>
      </div>
    </div>
  );
}
