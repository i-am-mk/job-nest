import { Badge } from "./ui/badge";
import { Bookmark, Calendar, Save } from "lucide-react";

const job = {
  id: 1,
  title: "Frontend Developer",
  company: "Tech Corp",
  location: "Remote",
  description: "Join our dynamic team to build cutting-edge web applications with React.js and modern technologies.",
  requirements: [
    "Proficient in React, JavaScript, and CSS.",
    "Experience with RESTful APIs and GraphQL.",
    "Familiarity with Git and version control."
  ],
  jobType: "Full-Time",
  salary: "$80,000 - $100,000",
  position: "Senior",
  postedDate: "2 days ago",
  logoUrl: "https://via.placeholder.com/50",
};

const LatestJobCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 relative mb-4">
      <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
        <Bookmark size={18} />
      </button>

      <div className="flex items-center mb-4">
        <img src={job.logoUrl} alt="Company Logo" className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h2 className="font-semibold text-xl text-gray-800">{job.title}</h2>
          <p className="text-gray-600 text-sm">{job.company} - {job.location}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{job.description}</p>

      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
        {job.requirements.map((requirement, index) => (
          <li key={index}>{requirement}</li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Badge className="bg-blue-600 text-white py-1 px-3 rounded-full">
            {job.jobType}
          </Badge>
          <Badge className="bg-purple-600 text-white py-1 px-3 rounded-full">
            {job.position}
          </Badge>
        </div>
        <span className="font-medium text-gray-800">{job.salary}</span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-gray-500 flex items-center gap-2">
          <Calendar size={16} />
          <span className="text-sm">{job.postedDate}</span>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition">
            <Save size={16} />
            <span className="text-sm">Save for Later</span>
          </button>
          <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
            View Details
          </button>
        </div>
      </div>

    </div>
  );
};

export default LatestJobCard;
