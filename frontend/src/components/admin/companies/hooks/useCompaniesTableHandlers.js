import { COMPANY_API_ENDPOINT } from "@/components/utils/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useCompaniesTableHandlers = () => {
  const navigate = useNavigate();
  const handler = async (id) => {
    try {
      const response = await axios.get(`${COMPANY_API_ENDPOINT}/${id}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        navigate(`/admin/companies/${id}`, {
          state: { company: response.data.company },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error?.message);
    }
  };
  return { handler };
};

export default useCompaniesTableHandlers;
