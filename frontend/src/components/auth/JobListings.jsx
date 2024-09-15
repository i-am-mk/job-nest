// JobPage.jsx
import React, { useState } from 'react';
import FilterJobs from '../FilterJobs';
import LatestJobCard from '../LatestJobCard';
import Navbar from '../common/Navbar';

const jobs = [1,2,3,4,5,6,7,8,9,10];

const JobListings = () => {
  const [filteredJobs, setFilteredJobs] = useState([]);

  const handleFilterChange = (filters) => {
    console.log('Filters applied:', filters);
  };

  return (
    <>
    <div>
      <Navbar />
    </div>
    <div className="flex">
      <div className="w-1/4 p-4">
        <FilterJobs />
      </div>
      <div className="w-1/3 p-4">
        {jobs.filter((e,i)=>i%2==0).map((e,i) => <LatestJobCard key={i}/>)}
      </div>
      <div className="w-1/3 p-4">
        {jobs.filter((e,i)=>i%2!=0).map((e,i) => <LatestJobCard key={i}/>)}
      </div>
    </div>
    </>
  );
};

export default JobListings;
