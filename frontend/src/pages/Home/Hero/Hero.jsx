import React from 'react';
import bgImg from '../../../assets/home/banner-1.jpeg';
import { Link } from 'react-router-dom'


const Hero = () => {
  return (
    <div className='min-h-screen bg-cover' style={{ backgroundImage: `url(${bgImg})`}}>
        <div className='min-h-screen flex justify-start pl-11 items-center text-white bg-black bg-opacity-60  '>
            <div>
                <div className='space-y-4'>
                    <p className='md:text-4xl text-2xl'>We Provide</p>
                    <h1 className='md:text-4xl text-2xl'>Best Chess Course Online</h1>
                    <div className='md:w-1/2'>
                        <p>Chess websites pair players based on a chess 
                           rating system; after a game ends, ratings are 
                           updated immediately and players may search for 
                           a new game using their updated ratings.</p>
                    </div>

                    <div className='flex flex-wrap items-center gap-5'>
                       <Link to="/register"> <button className='px-7 py-3 rounded-lg bg-secondary font-bold uppercase'>Join Today</button> </Link>
                       <Link to="/classes"><button className='px-7 py-3 rounded-lg border hover:bg-secondary font-bold uppercase'>View Courses</button> </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero