'use client';
import { ChevronRightIcon, CommandLineIcon, UserIcon, FolderIcon, DocumentIcon } from '@heroicons/react/20/solid';
import Projects from "./projects";
import Aboutme from "./aboutMe";
import Snowfall from 'react-snowfall';
import React, { useState, useEffect, useRef } from 'react';
import Codeforces from './Codeforces';
import Leetcode from './Leetcode';
import CodeChef from './CodeChef';

interface MenuItem {
  id: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

interface Commands {
  [key: string]: string | (() => void);
}

export default function Home(): JSX.Element {
  const [selectedComponent, setSelectedComponent] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>(['Welcome to SS Portfolio Terminal']);
  const [isTerminalFocused, setIsTerminalFocused] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [services, setServices] = useState([
    { name: 'Spring Boot', port: 8080, status: 'running', pid: 12345, uptime: '2h 15m' },
    { name: 'MySQL', port: 3306, status: 'running', pid: 23456, uptime: '4h 32m' },
    { name: 'React Dev', port: 3000, status: 'running', pid: 34567, uptime: '1h 08m' },
    { name: 'Next.js', port: 3001, status: 'running', pid: 45678, uptime: '45m' },
    { name: 'Flutter', port: 0, status: 'building', pid: 56789, uptime: '12m' },
    { name: 'Docker', port: 2376, status: 'running', pid: 67890, uptime: '8h 12m' }
  ]);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    // Set initial time and update every second
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };
    
    updateTime(); // Set initial time
    const timeInterval = setInterval(updateTime, 1000);
    
    // Update service uptimes and stats every 10 seconds
    const updateServices = () => {
      setServices(prevServices => 
        prevServices.map(service => ({
          ...service,
          // Randomly update some stats for realism
          uptime: service.status === 'running' ? 
            `${Math.floor(Math.random() * 8 + 1)}h ${Math.floor(Math.random() * 60)}m` : 
            service.uptime
        }))
      );
    };
    
    const servicesInterval = setInterval(updateServices, 10000);
    
    return () => {
      clearInterval(timeInterval);
      clearInterval(servicesInterval);
    };
  }, []);

  const commands: Commands = {
    'help': 'Available commands: about, projects, codechef, leetcode, codeforces, clear, ls, ps, services',
    'about': () => setSelectedComponent(0),
    'projects': () => setSelectedComponent(1),
    'codechef': () => setSelectedComponent(2),
    'leetcode': () => setSelectedComponent(3),
    'codeforces': () => setSelectedComponent(4),
    'ls': 'about.md  projects/  codechef.profile  leetcode.profile  codeforces.profile',
    'ps': 'SHOW_SERVICES',
    'services': 'SHOW_SERVICES',
    'clear': 'CLEAR_TERMINAL',
    'whoami': 'Software Developer & Competitive Programmer',
    'pwd': '/home/ss/portfolio',
    'date': 'CURRENT_TIME',
  };

  const handleTerminalCommand = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      const command = terminalInput.trim().toLowerCase();
      
      if (command === '') {
        // Do nothing for empty command
        return;
      }

      // Handle clear command specially
      if (command === 'clear') {
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      }
      
      const newHistory = [...terminalHistory, `ss@portfolio:~$ ${terminalInput}`];
      
      if (commands[command]) {
        if (typeof commands[command] === 'function') {
          (commands[command] as () => void)();
          newHistory.push(`Navigating to ${command}...`);
        } else {
          const result = commands[command] as string;
          if (result === 'CURRENT_TIME') {
            newHistory.push(currentTime);
          } else if (result === 'SHOW_SERVICES') {
            newHistory.push('PID    NAME           PORT   STATUS     UPTIME');
            services.forEach(service => {
              newHistory.push(`${service.pid}   ${service.name.padEnd(12)} ${service.port === 0 ? 'N/A'.padEnd(4) : String(service.port).padEnd(4)}  ${service.status.padEnd(8)} ${service.uptime}`);
            });
          } else if (result !== 'CLEAR_TERMINAL') {
            newHistory.push(result);
          }
        }
      } else {
        newHistory.push(`bash: ${command}: command not found`);
        newHistory.push('Type "help" for available commands');
      }
      
      setTerminalHistory(newHistory);
      setTerminalInput('');
      
      // Scroll terminal to bottom
      setTimeout(() => {
        const terminal = document.getElementById('terminal-output');
        if (terminal) terminal.scrollTop = terminal.scrollHeight;
      }, 100);
    }
  };

  const menuItems: MenuItem[] = [
    { id: 0, label: "about.md", icon: DocumentIcon, path: "~/about.md" },
    { id: 1, label: "projects/", icon: FolderIcon, path: "~/projects/" },
    { id: 2, label: "codechef.profile", icon: DocumentIcon, path: "~/codechef.profile" },
    { id: 3, label: "leetcode.profile", icon: DocumentIcon, path: "~/leetcode.profile" },
    { id: 4, label: "codeforces.profile", icon: DocumentIcon, path: "~/codeforces.profile" },
  ];

  const currentItem = menuItems.find(item => item.id === selectedComponent);

  return (
    <main className="min-h-screen bg-gray-900 text-green-400 font-mono overflow-hidden">
      {/* Matrix-style background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(0,255,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <Snowfall 
        snowflakeCount={15} 
        color="#00ff0020"
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 1
        }}
      />

      {/* Terminal Window */}
      <div className={`min-h-screen p-4 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          
          {/* Terminal Header */}
          <div className="bg-gray-800 rounded-t-lg border border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-700 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <CommandLineIcon className="h-4 w-4" />
                <span className="text-sm">ss@portfolio: ~/</span>
              </div>
              <div className="w-16"></div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-4 bg-black rounded-b-lg min-h-48 max-h-72 overflow-y-auto" id="terminal-output">
              {terminalHistory.map((line, index) => (
                <div key={index} className="text-green-400 text-sm mb-1 leading-relaxed">
                  {line}
                </div>
              ))}
              
              {/* Terminal Input */}
              <div className="flex items-center text-green-400 text-sm mt-2">
                <span className="text-blue-400">ss@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-purple-400">~</span>
                <span className="text-white">$ </span>
                <input
                  ref={terminalInputRef}
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={handleTerminalCommand}
                  onFocus={() => setIsTerminalFocused(true)}
                  onBlur={() => setIsTerminalFocused(false)}
                  className="bg-transparent border-none outline-none flex-1 text-green-400 ml-1"
                  placeholder="Type 'help' for commands..."
                  autoFocus
                />
                <span className={`w-2 h-4 bg-green-400 ${isTerminalFocused ? 'animate-pulse' : ''}`}>█</span>
              </div>
            </div>
          </div>

          {/* Services Monitor Terminal */}
          <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 shadow-2xl">
            <div className="px-4 py-3 bg-gray-700 rounded-t-lg border-b border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm ml-3">System Monitor</span>
                </div>
                <span className="text-green-400 text-xs">htop - services</span>
              </div>
            </div>
            
            <div className="p-4 bg-black text-green-400 text-xs font-mono max-h-48 overflow-y-auto">
              <div className="mb-2 text-blue-400">
                PID    NAME           PORT   STATUS     UPTIME    MEMORY
              </div>
              {services.map((service, index) => (
                <div key={index} className="flex justify-between items-center py-1 hover:bg-gray-800/50 rounded px-1">
                  <div className="flex items-center space-x-4">
                    <span className="text-yellow-400 w-8">{service.pid}</span>
                    <span className="text-white w-20">{service.name}</span>
                    <span className="text-purple-400 w-8">
                      {service.port === 0 ? 'N/A' : service.port}
                    </span>
                    <span className={`w-12 ${
                      service.status === 'running' ? 'text-green-400' : 
                      service.status === 'building' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {service.status}
                    </span>
                    <span className="text-gray-400 w-12">{service.uptime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      service.status === 'running' ? 'bg-green-400 animate-pulse' : 
                      service.status === 'building' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'
                    }`}></div>
                    <span className="text-gray-500 text-xs">
                      {Math.floor(Math.random() * 500 + 50)}MB
                    </span>
                  </div>
                </div>
              ))}
              <div className="mt-3 pt-2 border-t border-gray-700 text-gray-500">
                <div className="flex justify-between">
                  <span>CPU: {Math.floor(Math.random() * 30 + 10)}%</span>
                  <span>RAM: {Math.floor(Math.random() * 40 + 30)}%</span>
                  <span>Load: {(Math.random() * 2).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* File System Navigation */}
          <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 shadow-2xl">
            <div className="px-4 py-3 bg-gray-700 rounded-t-lg border-b border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FolderIcon className="h-5 w-5 text-yellow-400" />
                  <span className="text-gray-300">File Explorer</span>
                </div>
                <span className="text-gray-500 text-sm">{currentItem?.path}</span>
              </div>
            </div>
            
            <div className="p-4 bg-gray-900">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedComponent(item.id)}
                      className={`group flex flex-col items-center p-4 rounded-lg transition-all duration-200 ${
                        selectedComponent === item.id 
                          ? 'bg-gray-700 border border-blue-500/50 text-blue-400' 
                          : 'hover:bg-gray-800 border border-transparent text-gray-400 hover:text-green-400'
                      }`}
                    >
                      <IconComponent className={`h-8 w-8 mb-2 ${
                        item.label.endsWith('/') ? 'text-yellow-400' : 'text-blue-400'
                      } group-hover:scale-110 transition-transform`} />
                      <span className="text-xs text-center font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Quick Commands */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-gray-500 text-sm">Quick commands:</span>
                {['help', 'ls', 'ps', 'clear'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => {
                      if (cmd === 'clear') {
                        setTerminalHistory([]);
                      } else {
                        setTerminalInput(cmd);
                        terminalInputRef.current?.focus();
                      }
                    }}
                    className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-green-400 text-xs rounded border border-gray-600 hover:border-green-500/50 transition-all"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Window */}
          <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 shadow-2xl">
            {/* Content Header */}
            <div className="px-4 py-3 bg-gray-700 rounded-t-lg border-b border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ChevronRightIcon className="h-4 w-4 text-green-400" />
                  <span className="text-gray-300 font-medium">
                    {currentItem?.label || "Welcome"}
                  </span>
                </div>
                <span className="text-green-400 text-sm">
                  {currentTime || '--:--:--'}
                </span>
              </div>
            </div>

            {/* Dynamic Component Content */}
            <div className="p-6 bg-gray-900 rounded-b-lg min-h-96">
              <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {selectedComponent === 0 && <Aboutme />}
                {selectedComponent === 1 && <Projects />}
                {selectedComponent === 2 && <CodeChef />}
                {selectedComponent === 3 && <Leetcode />}
                {selectedComponent === 4 && <Codeforces />}
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="mt-2 bg-gray-700 rounded px-4 py-2 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Online</span>
              </span>
              <span>Terminal Ready</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>{terminalHistory.length} lines</span>
              <span>UTF-8</span>
              <span>ss@portfolio</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}