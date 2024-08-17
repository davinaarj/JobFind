import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="p-4">
            <Table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <TableCaption className="text-lg font-semibold text-gray-700">A list of your recent applicants</TableCaption>
                <TableHeader className="bg-blue-600 text-white">
                    <TableRow>
                        <TableHead className="px-4 py-2">Full Name</TableHead>
                        <TableHead className="px-4 py-2">Email</TableHead>
                        <TableHead className="px-4 py-2">Contact</TableHead>
                        <TableHead className="px-4 py-2">Resume</TableHead>
                        <TableHead className="px-4 py-2">Date</TableHead>
                        <TableHead className="px-4 py-2 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <TableRow key={item._id} className="hover:bg-gray-100">
                                <TableCell className="border-t px-4 py-2">{item?.applicant?.fullname}</TableCell>
                                <TableCell className="border-t px-4 py-2">{item?.applicant?.email}</TableCell>
                                <TableCell className="border-t px-4 py-2">{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell className="border-t px-4 py-2">
                                    {
                                        item.applicant?.profile?.resume 
                                        ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> 
                                        : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell className="border-t px-4 py-2">{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="border-t px-4 py-2 text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="cursor-pointer text-gray-600" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 bg-white shadow-lg rounded-md">
                                     {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div 
                                                            onClick={() => statusHandler(status, item?._id)} 
                                                            key={index} 
                                                            className='flex items-center my-2 px-4 py-2 cursor-pointer hover:bg-blue-100'
                                                        >
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable;
