import { useAppliedJob } from "./hooks";
import { useSelector } from "react-redux";

const getStatusBadge = (status) => {
  switch (status) {
    case "PENDING":
      return (
        <span className="bg-yellow-100 text-yellow-800 py-1 px-3 rounded-full">
          Pending
        </span>
      );
    case "REVIEWED":
      return (
        <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
          Reviewed
        </span>
      );
    case "INTERVIEW":
      return (
        <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full">
          Interview
        </span>
      );
    case "REJECTED":
      return (
        <span className="bg-red-100 text-red-800 py-1 px-3 rounded-full">
          Rejected
        </span>
      );
    case "ACCEPTED":
      return (
        <span className="bg-green-200 text-green-900 py-1 px-3 rounded-full">
          Accepted
        </span>
      );
    default:
      return (
        <span className="bg-gray-100 text-gray-600 py-1 px-3 rounded-full">
          Unknown
        </span>
      );
  }
};

const AppliedJob = () => {
  useAppliedJob();
  const { application } = useSelector((store) => store.application);

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Applied Jobs</h3>
      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="py-3 px-4 text-left border-b">Date</th>
            <th className="py-3 px-4 text-left border-b">Job Role</th>
            <th className="py-3 px-4 text-left border-b">Company</th>
            <th className="py-3 px-4 text-left border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {application && application.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-600">
                No applied jobs
              </td>
            </tr>
          ) : (
            (application || []).map((job) => (
              <tr key={job.id} className="hover:bg-gray-100">
                <td className="py-3 px-4 text-left border-b text-gray-600">
                  {`${new Date(job.jobId.createdAt).toLocaleString()}`}
                </td>
                <td className="py-3 px-4 text-left border-b text-gray-800">
                  {job.jobId.title}
                </td>
                <td className="py-3 px-4 text-left border-b text-gray-800">
                  {job.jobId.company.name}
                </td>
                <td className="py-3 px-4 text-left border-b">
                  {getStatusBadge(job.status)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedJob;
