import PropTypes from "prop-types";
import {
  Avatar,
  AvatarImage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { useSelector } from "react-redux";
import { Edit2, Eye, MoreHorizontal, Trash } from "lucide-react";
import { useFetchAllCompanies, useCompaniesTableHandlers } from "../hooks";

const CompaniesTable = ({ searchCompanyFilter }) => {
  useFetchAllCompanies();
  const { handler } = useCompaniesTableHandlers();
  const { companies } = useSelector((store) => store.company);
  const filteredCompanies = companies.filter((company) => {
    return company.name
      .toLowerCase()
      .includes(searchCompanyFilter.toLowerCase());
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Logo</TableHead>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Location</TableHead>
            <TableHead className="text-left">Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-100 transition duration-150 ease-in-out"
              >
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} alt={company.name} />
                  </Avatar>
                </TableCell>
                <TableCell className="text-gray-800">
                  {company.name || "N/A"}
                </TableCell>
                <TableCell className="text-gray-600">
                  {company.location || "N/A"}
                </TableCell>
                <TableCell className="text-gray-600">
                  {new Date(company.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer transition duration-150" />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2 rounded-md shadow-lg bg-white border border-gray-300">
                      <div
                        onClick={() => handler(company._id)}
                        className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-100"
                      >
                        <Eye className="w-4 text-gray-600" />
                        <span className="text-gray-800">View</span>
                      </div>
                      <div
                        onClick={() => {}}
                        className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-100"
                      >
                        <Edit2 className="w-4 text-blue-600" />
                        <span className="text-blue-800">Edit</span>
                      </div>
                      <div
                        onClick={() => {}}
                        className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-100"
                      >
                        <Trash className="w-4 text-red-600" />
                        <span className="text-red-800">Remove</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500 py-4">
                No companies available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

CompaniesTable.propTypes = {
  searchCompanyFilter: PropTypes.string.isRequired,
};

export default CompaniesTable;
