import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge'; // Assuming you have a Badge component

import companyLogo from '../assets/campany.jpeg'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Fixing the calculation for days
    };

    return (
        <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="outline" className="rounded-full p-2 hover:bg-gray-100">
                    <Bookmark className="w-5 h-5 text-gray-600" />
                </Button>
            </div>

            <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-12 h-12"> {/* Adjust size of the logo */}
                    <AvatarImage src={job?.company?.logo || companyLogo} className="object-cover w-full h-full rounded-full" />
                </Avatar>
                <div>
                    <h1 className="font-semibold text-xl text-gray-800">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500">India</p>
                </div>
            </div>

            <div className="mb-4">
                <h1 className="font-bold text-lg text-gray-800">{job?.title}</h1>
                <p className="text-sm text-gray-600">{job?.description}</p>
            </div>

            <div className="flex items-center gap-3 mb-4">
                <Badge className="text-blue-600 font-semibold bg-blue-50 py-1 px-2 rounded-md">{job?.position} Positions</Badge>
                <Badge className="text-red-600 font-semibold bg-red-50 py-1 px-2 rounded-md">{job?.jobtype}</Badge>
                <Badge className="text-purple-600 font-semibold bg-purple-50 py-1 px-2 rounded-md">{job?.salary} LPA</Badge>
            </div>

            <div className="flex items-center gap-4">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                    Details
                </Button>
                <Button className="bg-purple-700 text-white hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-md">
                    Save For Later
                </Button>
            </div>
        </div>
    );
};

export default Job;
