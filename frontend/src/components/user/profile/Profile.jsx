import { useState } from "react";
import { Avatar, AvatarImage, Badge, Button } from "@/components/ui";
import { Mail, Phone, Link as LinkIcon, Pen } from "lucide-react";
import { UpdateProfileDialog } from "../profile";
import { useSelector } from "react-redux";
import { AppliedJob } from "../appliedjob";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);

  if (!user) return <p className="text-gray-600">Loading...</p>;

  return (
    <>
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
          <AppliedJob />
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
