import { PageTitle } from "@/components/helpers";
import { DataTable } from "@/components/shared";
import { usersTableHeaders } from "@/lib/data";
import React from "react";

const UserPage = () => {
  return (
    <section className="section">
      <PageTitle title="Users" desc="View all signed up users." />
      <div className="mt-8">
        <DataTable headers={usersTableHeaders} isUsers />
      </div>
    </section>
  );
};

export default UserPage;
