

'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { FaSearch, FaStar } from 'react-icons/fa';
import { HoverEffect } from '../components/ui/card-hover-effect';
import { Navbar } from './Navbar';

interface Professor {
  professor: string;
  title:string;
  subject: string;
  review: string;
  star: number;
}

export function Professor() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isClient, setIsClient] = useState<boolean>(false);
  const [professors, setProfessors] = useState<Professor[]>([]);

  useEffect(() => {
    // Ensure the component renders only on the client side
    setIsClient(true);

    // Fetch data from review.json
    const fetchProfessors = async () => {
      const response = await fetch('/review.json');
      const data = await response.json();
      setProfessors(data.reviews);
    };

    fetchProfessors();
  }, []);

  // Handle search input
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter professors based on search query
  const filteredProfessors = professors.filter(prof =>
      prof.professor.toLowerCase().includes(searchQuery) ||
      prof.subject.toLowerCase().includes(searchQuery) ||
      prof.review.toLowerCase().includes(searchQuery) ||
      prof.subject.toLowerCase().includes(searchQuery)
  );

  if (!isClient) {
    return null; // Prevent server-side rendering of the dynamic content
  }

  return (
    <><Navbar /><div className="min-h-screen bg-black flex flex-col items-center pt-10">
      {/* Search Bar */}
      <div className="w-full flex justify-center mb-8 ">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Professors..."
            className="rounded-full min-w-[40vw] pl-14 p-3 my-10 mt-16 text-white/80 w-80 shadow-lg  border-[1px] border-blue-500 bg-transparent focus:outline-none" // searchbar color 
            value={searchQuery}
            onChange={handleSearchChange} />
          <button className="absolute left-3 top-[11vh] transform -translate-y-1/2 p-2 bg-transparent rounded-full shadow-lg">
            <FaSearch className="w-6 h-6 text-blue-500/80 text-sm" />
          </button>
        </div>
      </div>

      {/* Professors Grid with HoverEffect */}
      <div className="max-w-5xl mx-auto px-8 ">
        <HoverEffect
          items={filteredProfessors.map(prof => ({
            title: ` ${prof.professor}`,
            description: (
              <div className="">
                <p>Subject: {prof.subject}</p>
                <p>Review: {prof.review}</p>
                <div className="flex items-center mt-2">
                  <span>Stars:</span>
                  <div className="flex ml-2">
                    {/* Render stars based on the rating */}
                    {Array.from({ length: prof.star }, (_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
            ),
            link: 'https://via.placeholder.com/150', // Placeholder image, replace with actual link if available
            img: 'https://via.placeholder.com/150', // Placeholder image, replace with actual image if available
          }))} />
      </div>
    </div></>
  );
}

export default Professor;
