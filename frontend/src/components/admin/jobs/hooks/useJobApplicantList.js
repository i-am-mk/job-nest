import { APPLICATION_API_ENDPOINT } from "@/components/utils/constant";
import axios from "axios";
import { toast } from "sonner";

const useJobApplicantList = () => {
  const handleStatusChange = async (id, status) => {
    try {
      const response = await axios.post(
        `${APPLICATION_API_ENDPOINT}/${id}/updateStatus`,
        { id: id, status: status },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { handleStatusChange };
};

export default useJobApplicantList;
