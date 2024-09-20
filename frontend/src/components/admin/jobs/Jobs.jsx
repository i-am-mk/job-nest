import { useNavigate } from "react-router-dom";
import Navbar from "../../common/Navbar";
import { Button, Input } from "../../ui";
import JobsTable from "./JobsTable";
import { useState } from "react";

const Jobs = () => {
  const navigate = useNavigate();
  const [searchJobFilter, setSearchJobFilter] = useState("");
  const handleChange = (event) => setSearchJobFilter(event.target.value);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 my-10">
        <div className="flex justify-between items-center">
          <Input
            type="text"
            placeholder="Search jobs by title..."
            className="border rounded-md p-2 max-w-xs"
            aria-label="Search jobs by title"
            onChange={handleChange}
          />
          <Button
            className="bg-primary text-white"
            onClick={() => navigate("/admin/createjob")}
          >
            Create New Job
          </Button>
        </div>
      </div>
      <JobsTable searchJobFilter={searchJobFilter} />
    </div>
  );
};

export default Jobs;
