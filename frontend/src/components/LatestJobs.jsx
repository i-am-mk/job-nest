import LatestJobCard from "./LatestJobCard";

const jobs = [
  { id: 1, title: "Frontend Developer", location: "Remote", company: "Tech Corp" },
  { id: 2, title: "Backend Developer", location: "New York, NY", company: "Innovate Solutions" },
  { id: 3, title: "Full Stack Developer", location: "San Francisco, CA", company: "StartUp Inc." },
  { id: 4, title: "Data Scientist", location: "Austin, TX", company: "DataMinds" },
  { id: 5, title: "Mobile App Developer", location: "Remote", company: "AppHub" },
  { id: 6, title: "UI/UX Designer", location: "Chicago, IL", company: "Creative Studio" }
];

const LatestJobs = () => {
  return (
    <div className="px-4 py-8 lg:px-20">
      <div className="font-bold text-2xl mb-6 text-center lg:text-left">
        <span className="text-purple-600">Latest & Top</span> Job Openings
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <LatestJobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
