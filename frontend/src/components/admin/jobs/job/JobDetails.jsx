import { Badge } from "../../../../components/ui";
import { Calendar } from "lucide-react";
import { useLocation } from "react-router-dom";
import Navbar from "../../../common/Navbar";

const JobDetails = () => {
  const location = useLocation();
  const job = location.state.job || {};

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto my-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="font-semibold text-2xl">
              {job?.title || "Job Title"}
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <Badge className="bg-green-500 text-white px-3 py-1 rounded-full font-bold">
                {job?.status || "Status"}
              </Badge>
              <span className="text-gray-600">
                Total Applicants: {job.applications.length || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-bold border-b pb-2 text-lg">Job Description</h2>
          <p>{job?.description || "No description available."}</p>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <span className="font-bold">Role: </span>
              <span>{job?.title || "N/A"}</span>
            </div>
            <div>
              <span className="font-bold">Company: </span>
              <span>{job?.company?.name || "N/A"}</span>
            </div>
            <div>
              <span className="font-bold">Location: </span>
              <span>{job?.location || "N/A"}</span>
            </div>
            <div>
              <span className="font-bold">Salary: </span>
              <span>{job?.salary || "N/A"}</span>
            </div>
            <div>
              <span className="font-bold">Application Deadline: </span>
              <span>{job?.applicationDeadline || "N/A"}</span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-bold">Requirements:</h3>
            <ul className="list-disc list-inside space-y-2">
              {(job?.requirements || []).map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="text-gray-500 flex items-center gap-2">
              <Calendar size={16} />
              <span className="text-sm">{formatDate(job.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
