import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    return (
        <div className="p-4">
            <Table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <TableCaption className="text-lg font-semibold text-gray-700">A list of your applied jobs</TableCaption>
                <TableHeader className="bg-indigo-600 text-white">
                    <TableRow>
                        <TableHead className="px-4 py-2 text-left">Date</TableHead>
                        <TableHead className="px-4 py-2 text-left">Job Role</TableHead>
                        <TableHead className="px-4 py-2 text-left">Company</TableHead>
                        <TableHead className="px-4 py-2 text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center p-4">
                                You haven't applied for any job yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className="hover:bg-gray-100">
                                <TableCell className="border-t px-4 py-2 text-left">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="border-t px-4 py-2 text-left">{appliedJob.job?.title}</TableCell>
                                <TableCell className="border-t px-4 py-2 text-left">{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="border-t px-4 py-2 text-right">
                                    <Badge className={`px-2 py-1 rounded-full text-white ${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default AppliedJobTable;
