import { useState } from 'react';
import { Label } from '../ui/label';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error('Company name is required.');
            return;
        }
    
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName: companyName.trim() }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
    
            if (res && res.data && res.data.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res.data.company._id;
                navigate(`/admin/companies/${companyId}`);
            } else {
                toast.error('Failed to create the company. Please try again.');
            }
        } catch (error) {
            console.error("Error in registering the company:", error);
            toast.error(error.response?.data?.message || 'Failed to create the company. Please try again.');
        }
    };
    

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 sm:p-10 bg-white shadow-lg rounded-lg mt-10">
                <div className="mb-8">
                    <h1 className="font-bold text-3xl text-gray-800">Your Company Name</h1>
                    <p className="text-gray-600 mt-2">
                        What would you like to name your company? You can change this later.
                    </p>
                </div>

                <div className="mb-6">
                    <Label className="text-gray-700 font-semibold">Company Name</Label>
                    <Input
                        type="text"
                        className="my-2 mt-3 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="JobHunt, Microsoft, etc."
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        className="border border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-2 rounded-lg"
                        onClick={() => navigate("/admin/companies")}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg"
                        onClick={registerNewCompany}
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CompanyCreate;
