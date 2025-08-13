import React, { useState, useEffect } from 'react';
import { getRedisDataBatch } from './redis.js';


export default function Projects(): JSX.Element {
  const [repositoryDataList, setRepositoryDataList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('name');

  useEffect(() => {
    const repositoryNames = [
      'gsinfra','razorpay-next','blackhole', 'blackhole_js', 'whatsappUIclone', 'portfolio',
      'getinsta', 'core', 'coreUI', 'controller', 'musicplayer', 
      'PortfolioBuilder', 'proximity', 'wallpy', 'cloudie','DataApi', 
    ];

    const fetchRepositories = async () => {
      try {
        setLoading(true);
        const repositoryData = await getRedisDataBatch(repositoryNames);
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

  const sortData = (data: any[]) => {
    switch (sortOption) {
      case 'name':
        return [...data].sort((a, b) => a.name.localeCompare(b.name));
      case 'issues':
        return [...data].sort((a, b) => (a.open_issues || 0) - (b.open_issues || 0));
      case 'size':
        return [...data].sort((a, b) => (a.size || 0) - (b.size || 0));
      case 'liveUrl':
        return [...data].sort((a, b) => {
          const aHas = !!a.link;
          const bHas = !!b.link;
          return Number(bHas) - Number(aHas) || a.name.localeCompare(b.name); // tie-break by name
        });
      default:
        return data;
    }
  };

  if (loading) {
    return (
      <main className="bg-gray-900 min-h-screen text-white">
        <div className="mb-16 p-12 text-center">
          <div className="animate-pulse text-gray-400">Loading repositories...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-900 min-h-screen text-white relative">
      {/* Sort dropdown */}
      <div className="flex justify-end pr-12 mb-4">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-gray-800 text-gray-200 border border-gray-700 px-3 py-1 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="name">Sort by Name</option>
          <option value="issues">Sort by Open Issues</option>
          <option value="size">Sort by Size</option>
          <option value="liveUrl">Sort by Live URL</option>
        </select>
      </div>

      <div className="mb-16 p-12 grid gap-6 text-center lg:max-w-8xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {sortData(repositoryDataList).map((repositoryData, index) => (
          <div
            key={repositoryData.name || index}
            className="group rounded-lg px-8 py-10 bg-gray-800 transition-all transform hover:translate-y-2 hover:shadow-lg hover:scale-105"
          >
            <h2 className="mb-3 text-2xl font-bold text-white">{repositoryData.name}</h2>
            <h6
              className="mb-1 text-1xl"
              style={{ color: repositoryData?.open_issues === 0 ? 'lightgreen' : 'orange' }}
            >
              {repositoryData?.open_issues} open_issues
            </h6>
            <h6 className="mb-1 text-1xl text-purple-400">
              {repositoryData?.message}
            </h6>
            <h6
              className="mb-1 text-1xl"
              style={{ color: repositoryData?.size > 1000 ? 'orange' : 'lightgreen' }}
            >
              {repositoryData?.size} KB
            </h6>
            <p className="m-0 max-w-[30ch] text-sm text-gray-400">{repositoryData.description}</p>
            {repositoryData.link && (
              <a
                href={repositoryData.link}
                className="m-2 inline-block px-3 py-1 text-sm font-bold text-white bg-purple-700 rounded hover:bg-purple-900"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live URL
              </a>
            )}
            {repositoryData.html_url && (
              <a
                href={repositoryData.html_url}
                className="m-2 inline-block px-3 py-1 text-sm font-bold text-white bg-gray-700 rounded hover:bg-purple-900"
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
