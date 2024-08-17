import { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        if (selectedCompany) {
            setInput({ ...input, companyId: selectedCompany._id });
        } else {
            setInput({ ...input, companyId: "" });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Logging input data for debugging
        console.log('Input data:', input);

        // Check if required fields are filled
        if (!input.title || !input.description || !input.companyId) {
            toast.error('Please fill all required fields.');
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.error('Error response:', error.response?.data);
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-teal-100 to-blue-100">
            <Navbar />
            <div className='flex items-center justify-center w-screen my-10'>
                <form onSubmit={submitHandler} className='p-10 max-w-4xl border border-gray-300 shadow-xl rounded-lg bg-white'>
                    <div className='grid grid-cols-2 gap-6'>
                        {/* Title Field */}
                        <div>
                            <Label className="text-blue-700">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus:ring-blue-500 focus:border-blue-500 border-gray-300 my-2 p-2 rounded-md bg-blue-50"
                                required
                            />
                        </div>

                        {/* Description Field */}
                        <div>
                            <Label className="text-blue-700">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus:ring-blue-500 focus:border-blue-500 border-gray-300 my-2 p-2 rounded-md bg-blue-50"
                                required
                            />
                        </div>

                        {/* Requirements Field */}
                        <div>
                            <Label className="text-blue-700">Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus:ring-blue-500 focus:border-blue-500 border-gray-300 my-2 p-2 rounded-md bg-blue-50"
                            />
                        </div>

                        {/* Salary Field */}
                        <div>
                            <Label className="text-blue-700">Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus:ring-blue-500 focus:border-blue-500 border-gray-300 my-2 p-2 rounded-md bg-blue-50"
                            />
                        </div>

                        {/* Location Field */}
                        <div>
                            <Label className="text-blue-700">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus:ring-blue-500 focus:border-blue-500 border-gray-300 my-2 p-2 rounded-md bg-blue-50"
                            />
                        </div>

                        {/* Job Type Field */}
                        <div>
                            <Label className="text-blue-700">Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus:ring-blue-500 focus:border-blue-500 border-gray-300 my-2 p-2 rounded-md bg-blue-50"
                            />
                        </div>

                        {/* Experience Level Field */}
                        <div>
                            <Label className="text-blue-700">Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus:ring-blue-500 focus:border-blue-500 border-gray-300 my-2 p-2 rounded-md bg-blue-50"
                            />
                        </div>

                        {/* Number of Positions Field */}
                        <div>
                            <Label className="text-blue-700">No of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus:ring-blue-500 focus:border-blue-500 border-gray-300 my-2 p-2 rounded-md bg-blue-50"
                            />
                        </div>

                        {/* Select Company Field */}
                        {
                            companies.length > 0 && (
                                <div className='col-span-2'>
                                    <Label className="text-blue-700">Select a Company</Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full mt-2 p-3 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-blue-50 shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-md bg-white shadow-lg border border-gray-300 max-h-60 overflow-auto">
                                            <SelectGroup>
                                                {
                                                    companies.map((company) => (
                                                        <SelectItem 
                                                            key={company._id} 
                                                            value={company?.name?.toLowerCase()} 
                                                            className="px-4 py-2 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
                                                        >
                                                            {company.name}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        }
                    </div>

                    {/* Submit Button */}
                    <div className='mt-6'>
                        {
                            loading ? 
                            <Button className="w-full bg-blue-600 text-white flex justify-center items-center">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                                Please wait
                            </Button> 
                            : 
                            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                                Post New Job
                            </Button>
                        }
                    </div>

                    {/* No Company Warning */}
                    {
                        companies.length === 0 && 
                        <p className='text-xs text-red-600 font-bold text-center my-3'>
                            *Please register a company first, before posting a job
                        </p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob;
