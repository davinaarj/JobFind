import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { LogOut, User2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className='bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 shadow-md'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
        <div>
          <h1 className='text-2xl font-bold text-white'>
            Job<span className='text-gray-400'>Portal</span>
          </h1>
        </div>
        <div className='flex items-center gap-12'>
          <ul className='flex font-medium items-center gap-5 text-white'>
            {user && user.role === 'recruiter' ? (
              <>
                <li className='hover:text-gray-400 transition-colors'><Link to="/admin/companies">Companies</Link></li>
                <li className='hover:text-gray-400 transition-colors'><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li className='hover:text-gray-400 transition-colors'><Link to="/">Home</Link></li>
                <li className='hover:text-gray-400 transition-colors'><Link to="/jobs">Jobs</Link></li>
                <li className='hover:text-gray-400 transition-colors'><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {!user ? (
            <div className='flex items-center gap-2'>
              <Link to="/login">
                <button className="px-4 py-2 border border-gray-600 rounded bg-gray-800 text-white hover:bg-gray-700 transition-colors">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 border border-gray-600 rounded bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                  Sign Up
                </button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="w-10 h-10 cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                    className="rounded-full"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="p-4 bg-gray-800 border border-gray-600 rounded shadow-lg w-80">
                <div className='flex gap-4'>
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                      className="rounded-full"
                    />
                  </Avatar>
                  <div>
                    <h4 className='font-medium text-white'>{user?.fullname}</h4>
                    <p className='text-sm text-gray-400'>{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className='flex flex-col gap-3 my-2 text-gray-400'>
                  {user && user.role === 'student' && (
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <User2 className='text-blue-500' />
                      <Button variant="link">
                        <Link to="/profile" className='text-blue-500 hover:underline'>View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className='flex items-center gap-2 cursor-pointer'>
                    <LogOut className='text-red-500' />
                    <Button onClick={logoutHandler} variant="link" className='text-red-500 hover:underline'>
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
