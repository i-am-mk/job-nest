import PropTypes from "prop-types";
import {
  Avatar,
  AvatarImage,
  Badge,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui";
import { useSelector } from "react-redux";
import { Edit2, Eye, MoreHorizontal, Trash } from "lucide-react";
import useFetchAllJobs from "./hooks/useFetchAllJobs";
import useJobsTableHandlers from "./hooks/useJobsTableHandlers";

const JobDetailsTable = ({ searchJobFilter }) => {
  useFetchAllJobs();
  const { jobs } = useSelector((store) => store.job);
  const { handler } = useJobsTableHandlers();
  const filteredJobs = jobs.filter((job) => {
    return job?.title?.toLowerCase().includes(searchJobFilter.toLowerCase());
  });

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Company Logo</TableHead>
            <TableHead className="text-left">Job Title</TableHead>
            <TableHead className="text-left">Created At</TableHead>
            <TableHead className="text-left">Status</TableHead>
            <TableHead className="text-left">Total Applicants</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <TableRow
                key={index}
                className="transition duration-150 ease-in-out"
              >
                <TableCell>
                  <Avatar>
                    <AvatarImage src={job.logo} alt={job.title} />
                  </Avatar>
                </TableCell>
                <TableCell className="text-gray-800">
                  {job.title || "N/A"}
                </TableCell>
                <TableCell className="text-gray-600">
                  {new Date(job.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${getStatusBadgeColor(job.status)} py-1 px-3 rounded-full pointer-events-none`}
                  >
                    {job.status || "N/A"}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-800">
                  {job.applications.length}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer transition duration-150" />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2 rounded-md shadow-lg bg-white border border-gray-300">
                      <div
                        onClick={() => handler({ path: "job", id: job._id })}
                        className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-100"
                      >
                        <Eye className="w-4 text-gray-600" />
                        <span className="text-gray-800">Details</span>
                      </div>
                      <div
                        onClick={() =>
                          handler({ path: "applicants", id: job._id })
                        }
                        className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-100"
                      >
                        <Eye className="w-4 text-gray-600" />
                        <span className="text-gray-800">
                          {job.applications.length > 1
                            ? "Applicants"
                            : "Applicant"}
                        </span>
                      </div>
                      {/* <div
                        onClick={() => {}}
                        className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-100"
                      >
                        <Edit2 className="w-4 text-blue-600" />
                        <span className="text-blue-800">Edit</span>
                      </div>
                      <div
                        onClick={() => {}}
                        className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-100"
                      >
                        <Trash className="w-4 text-red-600" />
                        <span className="text-red-800">Remove</span>
                      </div> */}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500 py-4">
                No jobs available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

JobDetailsTable.propTypes = {
  searchJobFilter: PropTypes.string.isRequired,
};

export default JobDetailsTable;
