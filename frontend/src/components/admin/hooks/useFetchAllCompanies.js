import { COMPANY_API_ENDPOINT } from "@/utils";
import { setCompanies } from "@/redux/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFetchAllCompanies = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${COMPANY_API_ENDPOINT}/companies`, {
          params: { id: user.id },
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (response.data.success) {
          dispatch(setCompanies(response.data.companies));
        } else {
          console.error("Failed to fetch companies:", response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompanies();
  }, []);
};

export default useFetchAllCompanies;
