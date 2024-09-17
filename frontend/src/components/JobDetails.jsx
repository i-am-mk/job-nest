import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";
import { useState } from "react";

const job = {
  title: "Frontend Developer",
  company: "Tech Corp",
  location: "Remote",
  description:
    "Join our dynamic team to build cutting-edge web applications with React.js and modern technologies.",
  requirements: [
    "Proficient in React, JavaScript, and CSS.",
    "Experience with RESTful APIs and GraphQL.",
    "Familiarity with Git and version control.",
  ],
  jobType: "Full-Time",
  salary: "$80,000 - $100,000",
  position: "Senior",
  postedDate: "2 days ago",
  status: "Active",
  applied: false,
  applicationDeadline: "30th September 2024",
};

const JobDetails = () => {
  const [isApplied, setIsApplied] = useState(job.applied);

  return (
    <div className="max-w-5xl mx-auto my-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-semibold text-2xl">{job.title}</h1>
          <div className="flex items-center gap-4 mt-4">
            <Badge className="bg-green-500 text-white px-3 py-1 rounded-full font-bold">
              {job.status}
            </Badge>
            <Badge className="bg-blue-500 text-white px-3 py-1 rounded-full font-bold">
              {job.position}
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          onClick={() => setIsApplied(true)}
          className={`${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-300"
          } text-black px-4 py-2 rounded-lg font-semibold`}
        >
          {isApplied ? "Already Applied" : "Apply"}
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="font-bold border-b pb-2 text-lg">Job Description</h2>
        <p>{job.description}</p>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <span className="font-bold">Role: </span>
            <span>{job.title}</span>
          </div>
          <div>
            <span className="font-bold">Company: </span>
            <span>{job.company}</span>
          </div>
          <div>
            <span className="font-bold">Location: </span>
            <span>{job.location}</span>
          </div>
          <div>
            <span className="font-bold">Salary: </span>
            <span>{job.salary}</span>
          </div>
          <div>
            <span className="font-bold">Application Deadline: </span>
            <span>{job.applicationDeadline}</span>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-bold">Requirements:</h3>
          <ul className="list-disc list-inside space-y-2">
            {job.requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <div className="text-gray-500 flex items-center gap-2">
            <Calendar size={16} />
            <span className="text-sm">{job.postedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
