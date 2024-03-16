import React, { useState, useEffect } from 'react';
import { fetchData } from './git'; // Assuming fetchData is exported from git.js

export default function Projects(): JSX.Element {
  const [repositoryDataList, setRepositoryDataList] = useState<any[]>([]);

  useEffect(() => {
    const repositoryNames = [ 'blackhole' , 'blackhole_js' , 'getinsta', 'core', 'cloudie', 'controller', 'musicplayer', 'PortfolioBuilder', 'DataApi' , 'whatsappUIclone' , 'portfolio' ];

    const fetchRepositoryData = async () => {
      const repositoryDataPromises = repositoryNames.map(async (repoName) => {
        try {
          const data = await fetchData(repoName);
          return data;
        } catch (error) {
          console.error(`Error fetching repository data for ${repoName}:`, error);
          return null;
        }
      });

      const repositoryData = await Promise.all(repositoryDataPromises);
      setRepositoryDataList(repositoryData.filter(Boolean));
    };

    fetchRepositoryData();
  }, []);

  return (
    <main>
      <div className="mb-16 p-12 grid text-center lg:max-w-8xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {repositoryDataList.map((repositoryData, index) => (
          <a
            key={index}
            href={repositoryData.html_url}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-2xl" >{repositoryData.name}</h2>
            <a className="mb-3 text-1xl" href={repositoryData.link} style={{color:'blue'}}>LINK</a>
            <h6 className="mb-1 text-1xl"
            style={{ color: repositoryData?.open_issues === 0 ? 'green' : 'orange' }}
          >{ repositoryData?.open_issues } open_issues</h6>
          <h6 className="mb-1 text-1xl"
            style={{ color: 'purple' }}
          > { repositoryData?.message }</h6>
          <h6 className="mb-1 text-1xl" style={{ color: repositoryData?.size > 1000 ? 'orange' : 'green' }}
          >{ repositoryData?.size } KB</h6>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">{repositoryData.description}</p>
          </a>
        ))}
      </div>
    </main>
    
  );
}
