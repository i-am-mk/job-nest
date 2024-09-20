import Navbar from "@/components/common/Navbar";
import { Avatar, AvatarImage } from "@/components/ui";
import { Calendar } from "lucide-react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const CompanyDetails = () => {
  const location = useLocation();
  const company = location.state.company || {};
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10">
        <div className="flex items-center mb-6">
          <Avatar className="w-24 h-24 mr-4 border-2 border-gray-300">
            <AvatarImage src={company.logo} alt={`${company.name} Logo`} />
          </Avatar>
          <h1 className="font-semibold text-2xl">{company.name}</h1>
        </div>

        <div className="space-y-4">
          <h2 className="font-bold border-b pb-2 text-lg">Description</h2>
          <p>{company.description || "No description available."}</p>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <span className="font-bold">Location: </span>
              <span>{company.location || "N/A"}</span>
            </div>
            <div>
              <span className="font-bold">Website: </span>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {company.website || "N/A"}
              </a>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <div className="text-gray-500 flex items-center gap-2">
                <span>Created At</span>
                <Calendar size={16} />
                <span className="text-sm">{formatDate(company.createdAt)}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <div className="text-gray-500 flex items-center gap-2">
                <span>Updated At</span>
                <Calendar size={16} />
                <span className="text-sm">{formatDate(company.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

CompanyDetails.propTypes = {
  company: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default CompanyDetails;
