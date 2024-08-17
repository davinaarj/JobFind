import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: '',
  });
  const { loading, user } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) formData.append('file', input.file);

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow items-center justify-center">
        <div className="bg-gray-900 shadow-lg rounded-lg p-10 max-w-3xl w-full">
          <h1 className="text-2xl font-bold text-white mb-8">Sign Up</h1>
          <form onSubmit={submitHandler}>
            <div className="mb-6">
              <Label htmlFor="fullname" className="text-gray-400">
                Full Name
              </Label>
              <Input
                type="text"
                id="fullname"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="Davina RJ"
                className="mt-2 block w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 rounded-md"
              />
            </div>

            <div className="mb-6">
              <Label htmlFor="email" className="text-gray-400">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="davina@gmail.com"
                className="mt-2 block w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 rounded-md"
              />
            </div>

            <div className="mb-6">
              <Label htmlFor="phoneNumber" className="text-gray-400">
                Phone Number
              </Label>
              <Input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="8080808080"
                className="mt-2 block w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 rounded-md"
              />
            </div>

            <div className="mb-6">
              <Label htmlFor="password" className="text-gray-400">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="q1w2e3"
                className="mt-2 block w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 rounded-md"
              />
            </div>

            <div className="mb-8">
              <Label className="text-gray-400">Role</Label>
              <RadioGroup className="flex gap-8 mt-4">
                <div className="flex items-center">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                    className="cursor-pointer bg-gray-800 border-gray-600"
                  />
                  <Label htmlFor="student" className="ml-3 text-gray-400 cursor-pointer">
                    Student
                  </Label>
                </div>
                <div className="flex items-center">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                    className="cursor-pointer bg-gray-800 border-gray-600"
                  />
                  <Label htmlFor="recruiter" className="ml-3 text-gray-400 cursor-pointer">
                    Recruiter
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mb-8">
              <Label htmlFor="file" className="text-gray-400">
                Profile
              </Label>
              <Input
                accept="image/*"
                type="file"
                id="file"
                onChange={changeFileHandler}
                className="mt-2 block w-full cursor-pointer bg-gray-800 border border-gray-600 text-gray-400 rounded-md"
              />
            </div>

            {loading ? (
              <Button className="w-full bg-gray-700 text-white py-3 rounded-md flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700"
              >
                Signup
              </Button>
            )}

            <p className="mt-6 text-sm text-center text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
