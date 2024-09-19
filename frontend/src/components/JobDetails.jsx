import axios from "axios";
import { Badge, Button } from "./ui";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "./utils/constant";
import { setJob } from "@/redux/jobSlice";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "./common/Navbar";

const JobDetails = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { job } = useSelector((store) => store.job);
  const { id } = useParams();

  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${JOB_API_ENDPOINT}/job/${id}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          const jobData = response.data.job || {};
          dispatch(setJob(jobData));
          setIsApplied(
            jobData.applications?.some(
              (application) => application.userId === user?.id
            ) || false
          );
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [dispatch, id, user?.id]);

  const applyHandler = async () => {
    if (!user || !user.profile || !user.profile.resume) {
      toast.error("User profile or resume is missing.");
      return;
    }

    try {
      const response = await axios.post(
        `${APPLICATION_API_ENDPOINT}/apply`,
        {
          userId: user.id,
          jobId: id,
          resume: user.profile.resume,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setIsApplied(true);
      }
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const formattedDate = formatDate("2024-09-17T09:00:00.000Z");

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto my-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="font-semibold text-2xl">
              {job?.title || "Job Title"}
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <Badge className="bg-green-500 text-white px-3 py-1 rounded-full font-bold">
                {job?.status || "Status"}
              </Badge>
            </div>
          </div>
          {user && (
            <Button
              disabled={isApplied}
              onClick={applyHandler}
              className={`${
                isApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-300"
              } text-black px-4 py-2 rounded-lg font-semibold`}
            >
              {isApplied ? "Already Applied" : "Apply"}
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="font-bold border-b pb-2 text-lg">Job Description</h2>
          <p>{job?.description || "No description available."}</p>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <span className="font-bold">Role: </span>
              <span>{job?.title || "N/A"}</span>
            </div>
            <div>
              <span className="font-bold">Company: </span>
              <span>{job?.company?.name || "N/A"}</span>
            </div>
            <div>
              <span className="font-bold">Location: </span>
              <span>{job?.location || "N/A"}</span>
            </div>
            <div>
              <span className="font-bold">Salary: </span>
              <span>{job?.salary || "N/A"}</span>
            </div>
            <div>
              <span className="font-bold">Application Deadline: </span>
              <span>{job?.applicationDeadline || "N/A"}</span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-bold">Requirements:</h3>
            <ul className="list-disc list-inside space-y-2">
              {(job?.requirements || []).map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="text-gray-500 flex items-center gap-2">
              <Calendar size={16} />
              <span className="text-sm">{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
