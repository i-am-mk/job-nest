import PropTypes from "prop-types";
import {
  Avatar,
  AvatarImage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui";
import { useSelector } from "react-redux";
import { Edit2, MoreHorizontal } from "lucide-react";
import useFetchAllCompanies from "./hooks/useFetchAllCompanies";

const CompanyDetailsTable = ({ searchCompanyFilter }) => {
  useFetchAllCompanies();
  const { companies } = useSelector((store) => store.company);
  const filteredCompanies = companies.filter((company) => {
    return company.name
      .toLowerCase()
      .includes(searchCompanyFilter.toLowerCase());
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Table>
        <TableCaption>Registered Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Logo</TableHead>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Location</TableHead>
            <TableHead className="text-left">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies && filteredCompanies.length > 0 ? (
            filteredCompanies.map((company, index) => (
              <TableRow key={index} className="hover:bg-gray-100">
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} alt={company.name} />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name || "N/A"}</TableCell>
                <TableCell>{company.location || "N/A"}</TableCell>
                <TableCell>
                  {new Date(company.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-2">
                      <div
                        onClick={() => {}}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No companies available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

CompanyDetailsTable.propTypes = {
  searchCompanyFilter: PropTypes.string.isRequired,
};

export default CompanyDetailsTable;
