// Profile.jsx
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Mail, Phone, Link as LinkIcon } from 'lucide-react';
import Navbar from './common/Navbar';

// Sample Data
const sampleProfile = {
  firstName: 'Manoj',
  lastName: 'Kadam',
  email: 'manoj.kadam@example.com',
  phoneNumber: '987-654-3210',
  role: 'RECRUITER',
  profilePicture: 'https://example.com/profile-picture.jpg',
  bio: 'Experienced web developer with a passion for creating user-friendly applications. Proficient in React.js, GraphQL, and modern web technologies.',
  skills: ['React', 'Node.js', 'GraphQL', 'CSS'],
  resumeLink: 'https://drive.google.com/your-resume-link'
};

const sampleJobHistory = [
  { id: 1, date: '2024-08-01', role: 'Frontend Developer', company: 'Tech Solutions', status: 'Applied' },
  { id: 2, date: '2024-08-15', role: 'UX Designer', company: 'Creative Minds', status: 'Interviewed' },
  { id: 3, date: '2024-09-01', role: 'Backend Developer', company: 'Dev Hub', status: 'Offer Extended' }
];

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [jobHistory, setJobHistory] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setProfile(sampleProfile);
    setJobHistory(sampleJobHistory);
  }, []);

  if (!profile) return <p className="text-gray-600">Loading...</p>;

  return (
    <>
    <Navbar />
    <div className="min-h-screen p-6 bg-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Section */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-start gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={profile.profilePicture || 'https://via.placeholder.com/150'} alt={`${profile.firstName} ${profile.lastName}`} />
            </Avatar>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">{`${profile.firstName} ${profile.lastName}`}</h1>
              <p className="text-gray-600 text-lg mt-1">{profile.role}</p>
              <p className="text-gray-600 mt-4">{profile.bio}</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-600">
                  <Mail className="mr-2" />
                  <a href={`mailto:${profile.email}`} className="text-blue-600 hover:underline">{profile.email}</a>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="mr-2" />
                  {profile.phoneNumber}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} className="bg-blue-600 text-white py-1 px-3 rounded-full">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Resume</h3>
                <a href={profile.resumeLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                  <LinkIcon className="w-4 h-4" />
                  View Resume
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Job History Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 ">Applied Jobs</h3>
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
                  <td colSpan="4" className="text-center py-4 text-gray-600">No applied jobs</td>
                </tr>
              ) : (
                jobHistory.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-100">
                    <td className="py-3 px-4 text-left border-b text-gray-600">{job.date}</td>
                    <td className="py-3 px-4 text-left border-b text-gray-800">{job.role}</td>
                    <td className="py-3 px-4 text-left border-b text-gray-800">{job.company}</td>
                    <td className="py-3 px-4 text-left border-b text-gray-800">{job.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
