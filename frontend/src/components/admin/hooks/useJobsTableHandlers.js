import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useJobsTableHandlers = () => {
  const navigate = useNavigate();
  const handler = async ({ path, id }) => {
    try {
      let response = null;
      if (path === "job") {
        response = await axios.get(`${JOB_API_ENDPOINT}/job/${id}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          navigate(`/admin/jobs/${id}`, {
            state: {
              job: response.data.job,
            },
          });
        }
      } else {
        console.log(path, id, path, id);
        response = await axios.get(
          `${APPLICATION_API_ENDPOINT}/job/${id}/applicants`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          navigate(`/admin/jobs/${id}/applicants`, {
            state: {
              applications: response.data.job.applications,
            },
          });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error?.message);
    }
  };

  return { handler };
};

export default useJobsTableHandlers;
