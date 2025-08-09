import React, { useState, useEffect } from 'react';
import { getRedisDataBatch } from './redis.js'; // Updated import

export default function Projects(): JSX.Element {
  const [repositoryDataList, setRepositoryDataList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const repositoryNames = [
      'gsinfra','razorpay-next','blackhole', 'proximity', 'wallpy', 'blackhole_js', 
      'getinsta', 'core', 'coreUI', 'cloudie', 'controller', 'musicplayer', 
      'PortfolioBuilder', 'DataApi', 'whatsappUIclone', 'portfolio'
    ];

    const fetchRepositories = async () => {
      try {
        setLoading(true);
        // Fetch all repositories in parallel using batch operation
        const repositoryData = await getRedisDataBatch(repositoryNames);
        
        // Filter out null/undefined results and set state once
        const validData = repositoryData.filter(data => data !== null && data !== undefined);
        setRepositoryDataList(validData);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  if (loading) {
    return (
      <main>
        <div className="mb-16 p-12 text-center">
          <div className="animate-pulse">Loading repositories...</div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="mb-16 p-12 grid text-center lg:max-w-8xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {repositoryDataList.map((repositoryData, index) => (
          <div
            key={repositoryData.name || index} // Use name as key for better performance
            className="group rounded-lg px-8 py-10 transition-all transform hover:translate-y-2 hover:shadow-lg hover:scale-105"
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
          </div>
        ))}
      </div>
    </main>
  );
}