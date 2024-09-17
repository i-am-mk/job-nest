import { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Mail, Phone, Link as LinkIcon, Pen } from "lucide-react";
import Navbar from "./common/Navbar";
import { Button } from "./ui/button";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

const sampleJobHistory = [
  {
    id: 1,
    date: "2024-08-01",
    role: "Frontend Developer",
    company: "Tech Solutions",
    status: "Applied",
  },
  {
    id: 2,
    date: "2024-08-15",
    role: "UX Designer",
    company: "Creative Minds",
    status: "Interviewed",
  },
  {
    id: 3,
    date: "2024-09-01",
    role: "Backend Developer",
    company: "Dev Hub",
    status: "Offer Extended",
  },
];

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [jobHistory, setJobHistory] = useState([]);

  useEffect(() => {
    setJobHistory(sampleJobHistory);
  }, [user]);

  if (!user) return <p className="text-gray-600">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-6 bg-white">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex flex-col gap-6 mb-8">
            <div className="flex items-start gap-6">
              <Avatar className="w-32 h-32">
                <AvatarImage
                  src={
                    user.profile.profilePhoto || "https://github.com/shadcn.png"
                  }
                  alt={`${user.firstName} ${user.lastName}`}
                />
              </Avatar>
              <div>
                <div className="flex">
                  <h1 className="text-4xl font-bold text-gray-800">{`${user.firstName} ${user.lastName}`}</h1>
                  <Button
                    className="border-none cursor-pointer"
                    variant="outline"
                    onClick={() => setOpenProfileDialog(true)}
                  >
                    <Pen />
                  </Button>
                </div>
                <p className="text-gray-600 text-lg mt-1">{user.role}</p>
                <p className="text-gray-600 mt-4">{user.profile.bio}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Mail className="mr-2" />
                    <a
                      href={`mailto:${user.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {user.email}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="mr-2" />
                    {user.phoneNumber}
                  </div>
                </div>
                {user.profile.skills.length > 0 ? (
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {user.profile.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          className="bg-blue-600 text-white py-1 px-3 rounded-full"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}
                {user.profile.resume ? (
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Resume
                    </h3>
                    <a
                      href={user.profile.resume}
                      target="_blank"
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <LinkIcon className="w-4 h-4" />
                      {user.profile.resumeOriginalName}
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

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
                {jobHistory.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-600">
                      No applied jobs
                    </td>
                  </tr>
                ) : (
                  jobHistory.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-100">
                      <td className="py-3 px-4 text-left border-b text-gray-600">
                        {job.date}
                      </td>
                      <td className="py-3 px-4 text-left border-b text-gray-800">
                        {job.role}
                      </td>
                      <td className="py-3 px-4 text-left border-b text-gray-800">
                        {job.company}
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
        </div>
        <UpdateProfileDialog
          openProfileDialog={openProfileDialog}
          setOpenProfileDialog={setOpenProfileDialog}
        />
      </div>
    </>
  );
};

export default Profile;
