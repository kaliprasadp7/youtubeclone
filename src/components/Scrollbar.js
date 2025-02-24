import React, { useRef, useState, useEffect, useContext } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import DataContext from '../context/DataContext';


const keywords = ['All', 'Music', 'Jukebox', 'Mixes', 'T-Series', 'Albums', 'Amit Trivedi', 'Indian pop music', 'Music Arrangements', 'Aamir FaKhanda', 'Mohammed Rafi', 'Folk dances', 'Dramedy'];

function Scrollbar(props) {

    const context = useContext(DataContext);
  const { searchVideos} = context;

    const scrollContainer = useRef(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const scrollLeft = () => {
        if (scrollContainer.current) {
            scrollContainer.current.scrollLeft -= 100; // Adjust scroll distance
            // isAtStart == true ? scrollContainer.current.
            checkScrollPosition(); // Update visibility of buttons
        }
    }

    const scrollRight = () => {
        if (scrollContainer.current) {
            scrollContainer.current.scrollLeft += 100; // Adjust scroll distance
            checkScrollPosition(); // Update visibility of buttons
        }
    }

    // Check scroll position to update button visibility
    const checkScrollPosition = () => {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
        setIsAtStart(scrollLeft === 0);
        setIsAtEnd(Math.round(scrollLeft + clientWidth) >= Math.round(scrollWidth));
    };

    useEffect(() => {
        const container = scrollContainer.current;
        container.addEventListener('scroll', checkScrollPosition);
        checkScrollPosition(); // Initial check

        return () => {
            container.removeEventListener('scroll', checkScrollPosition);
        };
    }, []);

    return (
        <div className={`flex items-center gap-3 max-w-[94vw] ${props.isOpen && 'pl-[12vw]'}`}>
            {!isAtStart && <div className="p-2 rounded-full hover:bg-[#e5e5e5] cursor-pointer" onClick={scrollLeft}>
                <FaAngleLeft className='text-xl' />
            </div>}
            <div ref={scrollContainer} className="flex gap-3 items-center overflow-hidden whitespace-nowrap scroll-smooth">
                {keywords.map((keyword, index) => {
                    return <div key={index} onClick={() => searchVideos(keyword)} className='px-3 cursor-pointer py-1 h-fit border rounded-xl bg-[#e5e5e5] hover:bg-[#e5e5e5]' ><span className='inline font-semibold'>{keyword}</span></div>
                })}
            </div>
            {!isAtEnd && <div className="p-2 rounded-full hover:bg-[#e5e5e5] cursor-pointer" onClick={scrollRight}>
                <FaAngleRight className='text-xl' />
            </div>}
        </div>
    )
}

export default Scrollbar
