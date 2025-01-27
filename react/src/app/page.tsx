'use client';
import { ChevronDownIcon } from '@heroicons/react/20/solid'; // Import the Heroicon
import Image from "next/image";
import Projects from "./projects";
import Aboutme from "./aboutMe";
import CompProg from "./CodeChef";
import Snowfall from 'react-snowfall';
import React, { useState } from 'react';
import Codeforces from './Codeforces';
import Leetcode from './Leetcode';
import CodeChef from './CodeChef';

export default function Home() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(0);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSelection = (componentIndex: React.SetStateAction<number>) => {
    setSelectedComponent(componentIndex);
    setDropdownOpen(false);
  };

  return (
    <main>
      <Snowfall snowflakeCount={20} color="gray" />

      <div
        className="p-12 mr-4 absolute after:absolute after:-z-20 after:h-[850px] 
        after:bg-gradient-to-r after:from-sky-100 after:via-blue-100 after:blur-3xl 
        after:content-[''] after:dark:from-sky-500 after:dark:via-[#022fb5] 
        after:dark:opacity-30 sm:after:w-[1800px] after:rounded-2xl">
      </div>

      <div className="flex min-h-screen flex-col items-center justify-start p-12">
        <div className="z-10 max-w-8xl w-full items-center justify-between font-mono text-sm lg:flex">
          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 bg-transparent hover:bg-grey text-white font-medium px-4 py-2 rounded-md shadow-lg"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              {/* Icon Instead of Text */}
              <ChevronDownIcon className="h-5 w-5" />
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-2 w-56 bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                <ul className="py-1 text-white">
                  <li>
                    <button
                      onClick={() => handleSelection(1)}
                      className="block px-4 py-2 w-full text-left hover:bg-blue-600 rounded"
                    >
                      Projects
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSelection(0)}
                      className="block px-4 py-2 w-full text-left hover:bg-blue-600 rounded"
                    >
                      About Me
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSelection(2)}
                      className="block px-4 py-2 w-full text-left hover:bg-blue-600 rounded"
                    >
                      CodeChef Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSelection(3)}
                      className="block px-4 py-2 w-full text-left hover:bg-blue-600 rounded"
                    >
                      Leetcode Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSelection(4)}
                      className="block px-4 py-2 w-full text-left hover:bg-blue-600 rounded"
                    >
                      Codeforces Profile
                    </button>
                  </li>
                  <li>
                    <a
                      href="https://ss0809.github.io/portfolio/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 w-full text-left hover:bg-blue-600 rounded"
                    >
                      Old Portfolio
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Component Rendering */}
        <div className="z-10 max-w-6xl w-full font-mono text-sm lg:flex">
          {selectedComponent === 1 && <Projects />}
          {selectedComponent === 0 && <Aboutme />}
          {selectedComponent === 2 && <CodeChef />}
        </div>
        {selectedComponent === 3 && <Leetcode />}
        {selectedComponent === 4 && <Codeforces />}
      </div>
    </main>
  );
}
