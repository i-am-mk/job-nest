import { useNavigate } from "react-router-dom";
import Navbar from "../../common/Navbar";
import { Button, Input } from "../../ui";
import CompaniesTable from "./CompaniesTable";
import { useState } from "react";

const Companies = () => {
  const navigate = useNavigate();
  const [searchCompanyFilter, setSearchCompanyFilter] = useState("");
  const handleChange = (event) => setSearchCompanyFilter(event.target.value);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 my-10">
        <div className="flex justify-between items-center">
          <Input
            type="text"
            placeholder="Filter companies by name..."
            className="border rounded-md p-2 max-w-xs"
            aria-label="Filter companies by name"
            onChange={handleChange}
          />
          <Button
            className="bg-primary text-white"
            onClick={() => navigate("/admin/createcompany")}
          >
            Create New Company
          </Button>
        </div>
      </div>
      <CompaniesTable searchCompanyFilter={searchCompanyFilter} />
    </div>
  );
};

export default Companies;
