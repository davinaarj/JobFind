import { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black py-24 text-white">
      <div className="max-w-7xl mx-auto text-center px-8">
        <div className="flex flex-col gap-8 my-12">
          <span className="mx-auto px-8 py-3 rounded-full bg-white text-black font-semibold shadow-lg transform transition-transform hover:scale-105">
            No. 1 Job Hunt Website
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-snug">
            Search, Apply & <br /> Get Your{' '}
            <span className="text-gray-300">Dream Jobs</span>
          </h1>
          <p className="mt-6 text-gray-200 text-xl max-w-3xl mx-auto leading-relaxed">
            Discover your next career move with us. Explore thousands of opportunities and find the perfect job that aligns with your skills and goals.
          </p>
          <div className="flex w-full md:w-[70%] lg:w-[60%] shadow-xl border border-transparent bg-white/10 backdrop-blur-lg pl-4 rounded-full items-center gap-4 mx-auto mt-10 transition-shadow hover:shadow-2xl">
            <input
              type="text"
              placeholder="Find your dream jobs"
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow outline-none border-none px-5 py-4 text-black placeholder-gray-400 bg-white rounded-l-full"
            />
            <Button
              onClick={searchJobHandler}
              className="rounded-r-full bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out px-8 py-4 text-white font-bold shadow-lg transform transition-transform hover:scale-105"
            >
              <Search className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
