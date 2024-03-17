"use client";
import CreateCustomerForm from "@/app/components/ClientUserForm";
import Hero from "@/app/components/Hero";
import LoadingDots from "@/app/components/LoadingDots";
import { getCustomer } from "@/app/services/api";
import CustomerProps from "@/app/types/customer.type";
import { useEffect, useState } from "react";

export default function EditCustomer({ params }: { params: { id: string } }) {
  const { id } = params;
    const [customer, setCustomer] = useState<CustomerProps>();

  useEffect(() => {
    getCustomer(id).then((response: any) => {
      setCustomer(response.data);
    });
  }, [id]);

  const [openCreateArea, setOpenCreateArea] = useState(false);

  return (
    <div className="flex w-full min-h-screen flex-col">
      <div className="flex w-full flex-1 justify-center mt-0 p-4 sm:mt-32 sm:p-0">
        <main className="flex flex-col w-full sm:w-4/5 p-4 bg-gray-100 rounded-lg shadow-lg">
          <Hero
            openCreateArea={openCreateArea}
            setOpenCreateArea={setOpenCreateArea}
          />
          {
            <div id="user_details_container" className="mt-8">
              {
                customer ? (
                  <CreateCustomerForm
                    customer={customer}
                    setCustumer={setCustomer}
                    editMode={!openCreateArea}
                    setOpenCreateArea={setOpenCreateArea}
                  />
                ) : <LoadingDots />
              }
            </div>
          }
        </main>
      </div>
    </div>
  );
}
