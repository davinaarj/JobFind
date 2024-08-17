import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/'); // Navigate to Home on successful login
        toast.success(res.data.message);
      } else {
        toast.error('Login failed. Please try again.');
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred.');
      }
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
        <div className="bg-gray-900 shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6">Login</h1>
          <form onSubmit={submitHandler}>
            <div className="mb-5">
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
                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 rounded-md"
              />
            </div>

            <div className="mb-5">
              <Label htmlFor="password" className="text-gray-400">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="******"
                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 rounded-md"
              />
            </div>

            <div className="mb-6">
              <Label className="text-gray-400">Role</Label>
              <RadioGroup className="flex gap-4 mt-3">
                <div className="flex items-center">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                    className="cursor-pointer bg-gray-800 border-gray-600"
                  />
                  <Label htmlFor="student" className="ml-2 text-gray-400 cursor-pointer">
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
                  <Label htmlFor="recruiter" className="ml-2 text-gray-400 cursor-pointer">
                    Recruiter
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {loading ? (
              <Button className="w-full bg-gray-700 text-white py-2 rounded-md flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
              >
                Login
              </Button>
            )}

            <p className="mt-4 text-sm text-center text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
