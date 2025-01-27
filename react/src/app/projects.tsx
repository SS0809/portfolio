import React, { useState, useEffect } from 'react';
import { getRedisData } from './redis.js'; // Import Redis functions.

export default function Projects(): JSX.Element {
  const [repositoryDataList, setRepositoryDataList] = useState<any[]>([]);

  useEffect(() => {
    const repositoryNames = [
      'blackhole', 'proximity', 'wallpy', 'blackhole_js', 'getinsta', 'core',
      'coreUI', 'cloudie', 'controller', 'musicplayer', 'PortfolioBuilder',
      'DataApi', 'whatsappUIclone', 'portfolio'
    ];
  
    const fetchRepositories = async () => {
      try {
        // Fetch all data concurrently
        const fetchedDataList = await Promise.all(
          repositoryNames.map(async (repoName) => {
            const data = await getRedisData(repoName);
            if (!data) {
              console.warn(`Key "${repoName}" not found in Redis`);
              return null; // Handle missing data gracefully
            }
            // Wait for 1 second
            await new Promise((resolve) => setTimeout(resolve, 1000));
            
            return data;
          })
        );
  
        // Filter out null values (keys not found in Redis)
        const validDataList = fetchedDataList.filter((data) => data !== null);
  
        // Update the state with valid data
        setRepositoryDataList(validDataList);
  
        // Log the final count of successfully fetched repositories
        console.log(`Successfully fetched ${validDataList.length} repositories.`);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };
  
    fetchRepositories();  

  }, []);


  return (
    <main>
      <div className="mb-16 p-12 grid text-center lg:max-w-8xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {repositoryDataList.map((repositoryData, index) => (
          <a
            key={index}
            className="group rounded-lg px-5 py-4 transition-all transform hover:translate-y-2 hover:shadow-lg hover:scale-105"
            style={{
              transition: 'transform 0.3s, box-shadow 0.3s',
              willChange: 'transform, box-shadow',
            }}
          >
            <h2 className="mb-3 text-2xl font-bold">{repositoryData.name}</h2>
            <h6
              className="mb-1 text-1xl"
              style={{ color: repositoryData?.open_issues === 0 ? 'green' : 'orange' }}
            >
              {repositoryData?.open_issues} open_issues
            </h6>
            <h6 className="mb-1 text-1xl" style={{ color: 'purple' }}>
              {repositoryData?.message}
            </h6>
            <h6
              className="mb-1 text-1xl"
              style={{ color: repositoryData?.size > 1000 ? 'orange' : 'green' }}
            >
              {repositoryData?.size} KB
            </h6>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">{repositoryData.description}</p>
            {repositoryData.link && (
              <a
                href={repositoryData.link}
                className="m-2 inline-block px-3 py-1 text-sm font-bold text-white bg-gray-900 rounded hover:bg-purple-900"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live URL
              </a>
            )}
            {repositoryData.html_url && (
              <a
                href={repositoryData.html_url}
                className="m-2 inline-block px-3 py-1 text-sm font-bold text-white bg-gray-900 rounded hover:bg-purple-900"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            )}
          </a>
        ))}
      </div>
    </main>
  );
}
