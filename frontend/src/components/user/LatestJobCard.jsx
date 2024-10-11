import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui";
import { Bookmark, Calendar, Save } from "lucide-react";
import PropTypes from "prop-types";

const LatestJobCard = ({ job }) => {
  const navigate = useNavigate();

  const {
    company = {},
    title = "Job Title",
    location = "Location",
    description = "No description available.",
    requirements = [],
    jobType = "N/A",
    position = "N/A",
    salary = "N/A",
    postedDate = "Date not specified",
    _id = "id",
  } = job || {};

  const handleViewDetails = () => {
    navigate(`/details/${_id}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 relative mb-4">
      <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
        <Bookmark size={18} />
      </button>

      <div className="flex items-center mb-4">
        <img
          src={company.logo || "/default-logo.png"} // Fallback to a default image if logo is missing
          alt="Company Logo"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h2 className="font-semibold text-xl text-gray-800">{title}</h2>
          <p className="text-gray-600 text-sm">
            {company.name || "Company Name"} - {location}
          </p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>

      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
        {requirements.length > 0 ? (
          requirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))
        ) : (
          <li>No requirements specified.</li>
        )}
      </ul>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Badge className="bg-blue-600 text-white py-1 px-3 rounded-full">
            {jobType}
          </Badge>
          <Badge className="bg-purple-600 text-white py-1 px-3 rounded-full">
            {position}
          </Badge>
        </div>
        <span className="font-medium text-gray-800">{salary}</span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-gray-500 flex items-center gap-2">
          <Calendar size={16} />
          <span className="text-sm">{postedDate}</span>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition">
            <Save size={16} />
            <span className="text-sm">Save for Later</span>
          </button>
          <button
            onClick={handleViewDetails}
            className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

LatestJobCard.propTypes = {
  job: PropTypes.shape({
    company: PropTypes.shape({
      logo: PropTypes.string,
      name: PropTypes.string,
    }),
    title: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    requirements: PropTypes.arrayOf(PropTypes.string),
    jobType: PropTypes.string,
    position: PropTypes.string,
    salary: PropTypes.string,
    postedDate: PropTypes.string,
    _id: PropTypes.string,
  }),
};

export default LatestJobCard;
