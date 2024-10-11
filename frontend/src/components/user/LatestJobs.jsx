import { useSelector } from "react-redux";
import { LatestJobCard } from "../user";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import PropTypes from "prop-types";

const LatestJobs = () => {
  useGetAllJobs();
  const { jobs } = useSelector((store) => store.job);

  return (
    <div className="px-4 py-8 lg:px-20">
      <div className="font-bold text-2xl mb-6 text-center lg:text-left">
        <span className="text-purple-600">Latest & Top</span> Job Openings
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs && jobs.length > 0 ? (
          jobs.map((job, index) => <LatestJobCard key={index} job={job} />)
        ) : (
          <p>No job listings available.</p>
        )}
      </div>
    </div>
  );
};

LatestJobs.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
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
    })
  ),
};

export default LatestJobs;
