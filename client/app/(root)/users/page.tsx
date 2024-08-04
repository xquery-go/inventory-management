import { PageTitle } from "@/components/helpers";
import { DataTable } from "@/components/shared";
import { usersTableHeaders } from "@/lib/data";
import React from "react";

const UserPage = () => {
  return (
    <section className="section">
      <PageTitle title="Users" desc="View all signed up users." />
      <DataTable headers={usersTableHeaders} isUsers />
    </section>
  );
};

export default UserPage;
