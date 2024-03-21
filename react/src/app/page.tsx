'use client'
import Image from "next/image";
import Projects from "./projects";
import Aboutme from "./aboutMe";
import CompProg from "./compprog";
import Snowfall from 'react-snowfall'
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
    setSelectedComponent(0);
    setDropdownOpen(false);
  };

  const toggleCompProg = () => {
    setSelectedComponent(2);
    setDropdownOpen(false);
  };

  return (
    <main>
      <Snowfall
        snowflakeCount={20}
        color="gray"
      />
      <div className="p-12 mr-4 absolute after:absolute after:-z-20 after:h-[850px] 
         after:bg-gradient-to-r after:from-sky-100 after:via-blue-100 after:blur-3xl 
         after:content-[''] after:dark:from-sky-500 after:dark:via-[#022fb5] 
         after:dark:opacity-30 sm:after:w-[1800px] after:rounded-2xl">
      </div>



      <div className="flex min-h-screen flex-col items-center justify-between p-12">

        <div className="z-10 max-w-8xl w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-transparent text-white px-4 py-2 rounded-md focus:outline-none"
            >
              Toggle Dropdown
            </button>
            {isDropdownOpen && (
              <div className="p-2 m-4 absolute top-full bg-gray-900 rounded-md shadow-lg">
                <ul>
                  <li className="px-4 py-2">
                    <button onClick={toggleProjects}>Projects</button>
                  </li>
                  <li className="px-4 py-2">
                    <button onClick={toggleAboutme}>About ME</button>
                  </li>
                  <li className="px-4 py-2">
                    <button onClick={toggleCompProg}>Competitive Programming</button>
                  </li>
                  <li className="px-4 py-2">
                    <a href="https://ss0809.github.io/portfolio/" target="_blank" rel="noopener noreferrer">Old Portfolio</a>
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
                alt=" Logo"
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




        <div className="z-10 max-w-6xl w-full items-center justify-between font-mono text-sm lg:flex">
          {selectedComponent === 1 && <Projects />}
          {selectedComponent === 0 && <Aboutme />}
          {selectedComponent === 2 && <CompProg />}
        </div>
      </div>
    </main>
  );
}
