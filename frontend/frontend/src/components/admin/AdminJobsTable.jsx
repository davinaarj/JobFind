import { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Log the allAdminJobs and searchJobByText to ensure they are available
        console.log("All Jobs:", allAdminJobs);
        console.log("Search Text:", searchJobByText);

        if (allAdminJobs) {
            const filteredJobs = allAdminJobs.filter((job) => {
                if (!searchJobByText) {
                    return true;
                }
                return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
                       job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs([]); // Set to empty array if no jobs are found
        }
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-lg">
            {filterJobs.length > 0 ? (
                <Table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <TableCaption className="text-lg font-semibold text-purple-700 mb-4">
                        A list of your recently posted jobs
                    </TableCaption>
                    <TableHeader>
                        <TableRow className="bg-purple-100">
                            <TableHead className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                                Company Name
                            </TableHead>
                            <TableHead className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                                Role
                            </TableHead>
                            <TableHead className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                                Date
                            </TableHead>
                            <TableHead className="px-6 py-3 text-right text-xs font-medium text-purple-700 uppercase tracking-wider">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filterJobs.map((job) => (
                            <TableRow key={job._id} className="hover:bg-purple-50 transition-colors">
                                <TableCell className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                                    {job?.company?.name || "N/A"}
                                </TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap text-gray-600">
                                    {job?.title || "N/A"}
                                </TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap text-gray-600">
                                    {job?.createdAt ? job.createdAt.split("T")[0] : "N/A"}
                                </TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="text-purple-500 hover:text-purple-700 transition-colors" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 mt-2">
                                            <div onClick={() => navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-purple-100 transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-purple-100 transition-colors mt-2">
                                                <Eye className="w-4 h-4" />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className="text-center text-gray-500">No jobs found.</p>
            )}
        </div>
    );
}

export default AdminJobsTable;
