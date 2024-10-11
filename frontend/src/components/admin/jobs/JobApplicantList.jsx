import PropTypes from "prop-types";
import {
  Avatar,
  AvatarImage,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useJobApplicantList } from "../hooks";

const JobApplicantList = () => {
  const location = useLocation();
  const applications = location.state.applications || [];
  const { handleStatusChange } = useJobApplicantList();
  const [applicantStatus, setApplicantStatus] = useState(
    applications.map((app) => app.status)
  );

  const updateStatus = async (index, newStatus, applicationId) => {
    const updatedStatuses = [...applicantStatus];
    updatedStatuses[index] = newStatus;
    setApplicantStatus(updatedStatuses);

    await handleStatusChange(applicationId, newStatus); // Update the status on the server
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Applicant Photo</TableHead>
              <TableHead className="text-left">Name</TableHead>
              <TableHead className="text-left">Email</TableHead>
              <TableHead className="text-left">Resume</TableHead>
              <TableHead className="text-left">Application Date</TableHead>
              <TableHead className="text-left">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length > 0 ? (
              applications.map((application, index) => (
                <TableRow key={application._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={application.userId.profile.profilePhoto}
                        alt={`${application.userId.firstName} ${application.userId.lastName}`}
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell className="text-gray-800">
                    {`${application.userId.firstName} ${application.userId.lastName}`}
                  </TableCell>
                  <TableCell className="text-gray-800">
                    {application.userId.email}
                  </TableCell>
                  <TableCell className="text-gray-800">
                    <a
                      href={application.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      View Resume
                    </a>
                  </TableCell>
                  <TableCell className="text-gray-600 text-left">
                    {new Date(application.applicationDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <select
                      value={applicantStatus[index]}
                      onChange={(e) =>
                        updateStatus(index, e.target.value, application._id)
                      }
                      className="border rounded p-1"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="REVIEWED">Reviewed</option>
                      <option value="INTERVIEW">Interview</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="ACCEPTED">Accepted</option>
                    </select>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-gray-500 py-4"
                >
                  No applicants available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

JobApplicantList.propTypes = {
  jobId: PropTypes.string.isRequired,
};

export default JobApplicantList;
