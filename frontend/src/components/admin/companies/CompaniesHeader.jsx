import { Button, Input } from "@/components/ui";
import { useNavigate } from "react-router-dom";

const CompaniesHeader = ({ setSearchCompanyFilter }) => {
  const navigate = useNavigate();
  const handleChange = (event) => setSearchCompanyFilter(event.target.value);
  return (
    <div className="max-w-6xl mx-auto p-6 my-10">
      <div className="flex justify-between items-center">
        <Input
          type="text"
          placeholder="Filter companies by name..."
          className="border rounded-md p-2 max-w-xs"
          aria-label="Filter companies by name"
          onChange={handleChange}
        />
        <Button
          className="bg-primary text-white"
          onClick={() => navigate("/admin/createcompany")}
        >
          Create New Company
        </Button>
      </div>
    </div>
  );
};

export default CompaniesHeader;
