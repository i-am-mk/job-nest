import useAppliedJob from "./hooks/useAppliedJob";
import { useSelector } from "react-redux";

const AppliedJob = () => {
  useAppliedJob();
  const { application } = useSelector((store) => store.application);
  console.log("applied jobs application", application);
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4 ">
        Applied Jobs
      </h3>
      <table className="w-full bg-white ">
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
                <td className="py-3 px-4 text-left border-b text-gray-800">
                  {job.status}
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
