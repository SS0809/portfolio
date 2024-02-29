'use client'
import Image from "next/image";
import Projects from "./projects";
import Aboutme from "./aboutMe";
import React, { useState } from 'react';

export default function Home() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(0);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleProjects = () => {
    setSelectedComponent(1);
    setDropdownOpen(false);
  };

  const toggleAboutme = () => {
    setSelectedComponent(2);
    setDropdownOpen(false);
  };

  return (
    <main>
    <div className="px-96 m-64 absolute after:absolute after:-z-20 after:h-[500px] 
         after:bg-gradient-conic after:from-sky-100 after:via-blue-900 after:blur-3xl 
         after:content-[''] after:dark:from-sky-300 after:dark:via-[#0141ff] 
         after:dark:opacity-40 sm:after:w-[500px] after:rounded-full"></div>
         <div className="flex min-h-screen flex-col items-center justify-between p-24">


      <div className="z-10 max-w-8xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none"
          >
            Toggle Dropdown
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 bg-gray-800 border rounded-md shadow-lg">
              <ul>
                <li className="px-4 py-2 text-black">
                  <button onClick={toggleProjects}>Projects</button>
                </li>
                <li className="px-4 py-2 text-black">
                  <button onClick={toggleAboutme}>About ME</button>
                </li>
              </ul>
            </div>
          )}
        </div>

       


        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://github.com/SS0809"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/avatar.jpg"
              alt="Vercel Logo"
              width={50}
              height={10}
              style={{
                objectFit: "cover",
                borderRadius: "70px",
              }}
              priority
            />
          </a>
        </div>
      </div>




      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {selectedComponent === 1 && <Projects />}
        {selectedComponent === 2 && <Aboutme />}
      </div>
      </div>
    </main>
  );
}
