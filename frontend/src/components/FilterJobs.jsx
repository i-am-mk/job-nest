import { useState } from "react";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui";

const FilterJobs = () => {
  const [filters, setFilters] = useState({
    jobType: "",
    location: "",
    industry: "",
    experience: "",
    salary: "",
    searchQuery: "",
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearchChange = (event) => {
    setFilters({ ...filters, searchQuery: event.target.value });
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-md">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 mb-4">
          <select
            name="jobType"
            value={filters.jobType}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Job Type</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>

          <select
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Location</option>
            <option value="remote">Remote</option>
            <option value="onsite">Onsite</option>
            {/* Add more locations as needed */}
          </select>

          <select
            name="industry"
            value={filters.industry}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Industry</option>
            <option value="technology">Technology</option>
            <option value="finance">Finance</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            {/* Add more industries as needed */}
          </select>

          <select
            name="experience"
            value={filters.experience}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Experience Level</option>
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior Level</option>
          </select>

          <select
            name="salary"
            value={filters.salary}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Salary Range</option>
            <option value="0-50000">0 - 50,000</option>
            <option value="50000-100000">50,000 - 100,000</option>
            <option value="100000-150000">100,000 - 150,000</option>
            <option value="150000+">150,000+</option>
          </select>
        </div>

        <input
          type="text"
          name="searchQuery"
          value={filters.searchQuery}
          onChange={handleSearchChange}
          placeholder="Search"
          className="p-2 border border-gray-300 rounded-md w-full mb-4"
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-300"
            >
              Apply Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-4 bg-white text-gray-900 shadow-lg rounded-lg">
            <p className="text-lg font-semibold mb-2">Filters Applied:</p>
            <div className="flex flex-col gap-2">
              <p>
                <strong>Job Type:</strong> {filters.jobType || "Any"}
              </p>
              <p>
                <strong>Location:</strong> {filters.location || "Any"}
              </p>
              <p>
                <strong>Industry:</strong> {filters.industry || "Any"}
              </p>
              <p>
                <strong>Experience Level:</strong> {filters.experience || "Any"}
              </p>
              <p>
                <strong>Salary Range:</strong> {filters.salary || "Any"}
              </p>
              <p>
                <strong>Search Query:</strong> {filters.searchQuery || "None"}
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default FilterJobs;
