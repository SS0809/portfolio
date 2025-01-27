import React, { useState, useEffect } from 'react';
import fetchData from './git.js'; // Assuming fetchData fetches data from GitHub API.
import { getRedisData, setRedisData } from './redis.js'; // Import Redis functions.

export default function Projects(): JSX.Element {
  const [repositoryDataList, setRepositoryDataList] = useState<any[]>([]);

  useEffect(() => {
    const repositoryNames = [
      'blackhole', 'proximity', 'wallpy', 'blackhole_js', 'getinsta', 'core',
      'coreUI', 'cloudie', 'controller', 'musicplayer', 'PortfolioBuilder',
      'DataApi', 'whatsappUIclone', 'portfolio'
    ];

    // Wrapper to ensure atomicity for `getRedisData`.
    const fetchRepositoryDataAtomically = async (repoName: string) => {
      try {
        // Attempt to get data from Redis.
        const cachedData = await getRedisData(repoName);
        if (cachedData) {
          return cachedData; // Return cached data if available.
        }

        // If not in cache, fetch from GitHub API.
        const apiData = await fetchData(repoName);

        // Update Redis with new data for future use.
        await setRedisData(repoName, apiData);

        return apiData;
      } catch (error) {
        console.error(`Error fetching data for ${repoName}:`, error);
        return null;
      }
    };

    const fetchRepositoriesIncrementally = async () => {
      for (const repoName of repositoryNames) {
        const repositoryData = await fetchRepositoryDataAtomically(repoName);

        if (repositoryData) {
          setRepositoryDataList((prevList) => [...prevList, repositoryData]);
        }
      }
    };

    fetchRepositoriesIncrementally();
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
