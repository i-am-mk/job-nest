import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { COMPANY_API_ENDPOINT } from "@/components/utils/constant";
import {
  prepareFormData,
  validateCompanyData,
} from "../utils/createCompanyUtil";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { setCompanies } from "@/redux/companySlice";

const useCreateCompanyHandlers = ({
  companyData,
  setCompanyData,
  setValidationErrors,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { companies } = useSelector((state) => state.company);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: files?.length ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateCompanyData(companyData);
    if (Object.keys(errors).length) {
      setValidationErrors(errors);
      return;
    }

    try {
      const formData = prepareFormData({ ...companyData, userId: user.id });
      const response = await axios.post(
        `${COMPANY_API_ENDPOINT}/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch(setCompanies([...companies, response.data.company]));
        toast.success(response.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  return { handleInputChange, handleSubmit };
};

export default useCreateCompanyHandlers;
