import { CompaniesHeader, CompaniesTable } from "../companies";
import { useState } from "react";

const Companies = () => {
  const [searchCompanyFilter, setSearchCompanyFilter] = useState("");

  return (
    <>
      <CompaniesHeader setSearchCompanyFilter={setSearchCompanyFilter} />
      <CompaniesTable searchCompanyFilter={searchCompanyFilter} />
    </>
  );
};

export default Companies;
