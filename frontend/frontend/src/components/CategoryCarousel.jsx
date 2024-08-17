import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % category.length);
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? category.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="w-full max-w-xl mx-auto my-10 px-4">
            <div className="relative">
                <div
                    className="flex space-x-4 overflow-x-auto snap-x snap-mandatory py-4 scrollbar-hide"
                    onTouchStart={prevSlide}
                    onTouchEnd={nextSlide}
                >
                    {category.map((cat, index) => (
                        <div
                            key={index}
                            className={`flex-shrink-0 w-40 snap-center bg-gray-100 border border-gray-300 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out ${index === activeIndex ? "scale-105" : "scale-100"}`}
                        >
                            <button
                                onClick={() => searchJobHandler(cat)}
                                className="w-full py-3 px-4 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-200 transition-colors duration-300 ease-in-out"
                            >
                                {cat}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryCarousel;
