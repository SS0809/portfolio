'use client';

import { useState } from 'react';

interface RepositoryData {
  name: string;
  open_issues?: number;
  message?: string;
  size?: number;
  description?: string;
  link?: string;
  html_url?: string;
}

interface ProjectListClientProps {
  repositories: RepositoryData[];
}

export default function ProjectListClient({ repositories }: ProjectListClientProps) {
  const [openPreviews, setOpenPreviews] = useState<Record<string, boolean>>({});
  const [loadedPreviews, setLoadedPreviews] = useState<Record<string, boolean>>({});

  const togglePreview = (key: string) => {
    setOpenPreviews((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!repositories.length) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-black/40 p-10 text-center shadow-[0_25px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Projects</p>
        <h3 className="mt-4 text-3xl font-semibold text-white">No repository data available</h3>
        <p className="mt-4 text-base leading-7 text-gray-400">The project list is empty right now. Check back later or connect your repository feed.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {repositories.map((repo, index) => {
        const key = repo.name || String(index);
        const isOpen = !!openPreviews[key];
        const isLoaded = !!loadedPreviews[key];

        return (
          <article key={key} className="rounded-[1.75rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_25px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl">
            <h3 className="text-2xl font-semibold text-white">{repo.name}</h3>
            <p className="mt-3 text-sm leading-6 text-gray-400">{repo.description || 'Repository details coming soon.'}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-300">
              <span className="rounded-full border border-white/10 px-3 py-1">Issues: {repo.open_issues ?? 0}</span>
              <span className="rounded-full border border-white/10 px-3 py-1">Size: {repo.size ?? 0} KB</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {repo.link && (
                <>
                  <a href={repo.link} className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/20" target="_blank" rel="noreferrer">
                    Live URL
                  </a>
                  <button
                    type="button"
                    onClick={() => togglePreview(key)}
                    aria-expanded={isOpen}
                    className="rounded-full bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-200 transition hover:bg-purple-500/20"
                  >
                    {isOpen ? 'Hide preview' : 'Live preview'}
                  </button>
                </>
              )}
              {repo.html_url && (
                <a href={repo.html_url} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}
            </div>

            {isOpen && repo.link && (
              <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black">
                <div className="flex items-center justify-between border-b border-white/10 bg-zinc-950 px-3 py-2 text-xs text-gray-400">
                  <span className="truncate">{repo.link}</span>
                  <a href={repo.link} target="_blank" rel="noreferrer" className="shrink-0 pl-3 text-blue-300 hover:underline">
                    Open ↗
                  </a>
                </div>
                <div className="relative h-72 w-full sm:h-80">
                  {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 text-sm text-gray-500">
                      Loading preview…
                    </div>
                  )}
                  <iframe
                    src={repo.link}
                    title={`${repo.name} live preview`}
                    loading="lazy"
                    onLoad={() => setLoadedPreviews((prev) => ({ ...prev, [key]: true }))}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    className="h-full w-full border-0"
                  />
                </div>
                <p className="border-t border-white/10 bg-zinc-950 px-3 py-2 text-xs text-gray-500">
                  Some sites block embedding — use &ldquo;Open ↗&rdquo; if this stays blank.
                </p>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}