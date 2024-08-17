import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover } from '@headlessui/react';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])


    return (
        <div className="overflow-x-auto bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg shadow-lg">
            <Table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
                <TableCaption className="text-lg font-semibold text-purple-700 mb-4">
                    A list of your recently registered companies
                </TableCaption>
                <TableHeader>
                    <TableRow className="bg-purple-100">
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                            Logo
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">
                            Name
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
                    {companies.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan="4" className="px-6 py-4 text-center text-purple-500">
                                You haven't registered any company yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterCompany?.map((company) => (
                            <TableRow key={company._id} className="hover:bg-purple-50 transition-colors">
                                <TableCell className="px-6 py-4 whitespace-nowrap">
                                    <Avatar>
                                        <AvatarImage src={company.logo || ""} className="object-cover w-10 h-10 rounded-full" />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                                    {company.name}
                                </TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap text-gray-600">
                                    {company.createdAt.split("T")[0]}
                                </TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap text-right">
                                    <Popover className="relative">
                                        <Popover.Button className="focus:outline-none">
                                            <MoreHorizontal className="cursor-pointer text-purple-500 hover:text-purple-700 transition-colors" />
                                        </Popover.Button>
                                        <Popover.Panel className="absolute z-10 w-32 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none mt-2">
                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)}   className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-purple-100 transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                                <span>Edit</span>
                                            </div>
                                        </Popover.Panel>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default CompaniesTable;
