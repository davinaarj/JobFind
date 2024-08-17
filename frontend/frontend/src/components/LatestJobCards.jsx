import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className="p-5 rounded-md shadow-lg bg-gray-50 border border-gray-200 cursor-pointer transition-transform transform hover:scale-105"
        >
            <div>
                <h1 className="font-semibold text-xl text-gray-900">{job?.company?.name}</h1>
                <p className="text-sm text-gray-600">India</p>
            </div>
            <div>
                <h1 className="font-bold text-lg my-2 text-gray-800">{job?.title}</h1>
                <p className="text-sm text-gray-700">{job?.description}</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge className="text-gray-900 bg-gray-100 border border-gray-300 font-bold" variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className="text-gray-900 bg-gray-100 border border-gray-300 font-bold" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-gray-900 bg-gray-100 border border-gray-300 font-bold" variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
