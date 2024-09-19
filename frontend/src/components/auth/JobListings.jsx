import { useState, useEffect } from "react";
import FilterJobs from "../FilterJobs";
import LatestJobCard from "../LatestJobCard";
import Navbar from "../common/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";

const JobListings = () => {
  useGetAllJobs();
  const { jobs } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  const handleFilterChange = (filters) => {
    const updatedJobs = jobs.filter((job) => {
      return true;
    });
    setFilteredJobs(updatedJobs);
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="w-1/4 p-4">
          <FilterJobs onFilterChange={handleFilterChange} />
        </div>
        <div className="w-3/4 p-4 flex flex-wrap gap-4">
          <div className="w-1/2">
            {filteredJobs
              .filter((_, i) => i % 2 === 0)
              .map((job) => (
                <LatestJobCard key={job._id} job={job} />
              ))}
          </div>
          <div className="w-1/2">
            {filteredJobs
              .filter((_, i) => i % 2 !== 0)
              .map((job) => (
                <LatestJobCard key={job._id} job={job} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobListings;
