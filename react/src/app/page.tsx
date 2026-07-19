import CodeChef from './CodeChef';
import Codeforces from './Codeforces';
import Leetcode from './Leetcode';
import ProjectListClient from './ProjectListClient';
import ScreenshotGallery from './ScreenshotGallery';
import ThemeToggle from './themetoggle';
import { getRedisDataBatch } from './redis.js';

interface RepositoryData {
  name: string;
  open_issues?: number;
  message?: string;
  size?: number;
  description?: string;
  link?: string;
  html_url?: string;
}

interface MobileApp {
  name: string;
  status: string;
  description: string;
  link?: string;
  icon?: string;
  screenshots?: string[];
}

const repositoryNames = [
  'railwayfrontend', 'gsinfra', 'razorpay-next', 'blackhole', 'blackhole_js', 'whatsappUIclone', 'portfolio',
  'getinsta', 'core', 'coreUI', 'controller', 'musicplayer',
  'PortfolioBuilder', 'proximity', 'wallpy', 'cloudie', 'DataApi',
];

const mobileApps: MobileApp[] = [
  {
    name: 'Rail Track',
    status: 'Published on Play Store',
    description: 'A backend-driven Android app released on Google Play with cloud sync and analytics.',
    link: '#',
    icon: '/railtrack/railtrack.png',
    screenshots: [
      '/railtrack/utilities1.png',
      '/railtrack/utilities2.png',
    ],
  },
  {
    name: 'Beta Service App',
    status: 'Closed testing on Play Store',
    description: 'A mobile app currently in closed testing with early access users for backend service validation.',
    link: '#',
    icon: '/blean/blean.png',
    screenshots: [
      '/blean/activities1.png',
      '/blean/activities2.png',
    ],
  },
];

export default async function Home(): Promise<JSX.Element> {
  let repositoryDataList: RepositoryData[] = [];
  let hasProjectError = false;

  try {
    const repositoryData = await getRedisDataBatch(repositoryNames) as (RepositoryData | null | undefined)[];
    repositoryDataList = repositoryData.filter((item): item is RepositoryData => item !== null && item !== undefined);
  } catch (error) {
    console.error('Error fetching repository data:', error);
    hasProjectError = true;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-white">
      <div className="absolute inset-0 bg-white dark:bg-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(100,116,139,0.06),transparent_35%)] dark:bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.08),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.05),transparent_20%)] opacity-50 dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.06),transparent_20%)]" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="fixed inset-x-0 top-6 z-50 mx-auto flex justify-center px-4">
          <nav className="flex flex-wrap items-center justify-center gap-3 rounded-full border border-zinc-900/10 bg-white/70 px-4 py-2 text-xs text-zinc-600 shadow-[0_18px_45px_rgba(168,85,247,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/10 dark:text-gray-300 dark:shadow-[0_18px_45px_rgba(168,85,247,0.12)]">
            <a className="rounded-full bg-zinc-900/10 px-3 py-1 text-zinc-900 dark:bg-zinc-800/80 dark:text-white" href="#home">Home</a>
            <a className="px-3 py-1 transition-colors hover:text-zinc-900 dark:hover:text-white" href="#projects">Projects</a>
            <a className="px-3 py-1 transition-colors hover:text-zinc-900 dark:hover:text-white" href="#activity">Open Source Activity</a>
            <a className="px-3 py-1 transition-colors hover:text-zinc-900 dark:hover:text-white" href="#about">About</a>
            <a className="px-3 py-1 transition-colors hover:text-zinc-900 dark:hover:text-white" href="#blog">Blog</a>
            <a className="px-3 py-1 transition-colors hover:text-zinc-900 dark:hover:text-white" href="#contact">Contact</a>
            <span className="h-5 w-px bg-zinc-900/20 dark:bg-white/20" />
            <ThemeToggle />
          </nav>
        </header>

        <section id="home" className="flex min-h-screen items-center justify-center px-6 py-20">
          <div className="w-full max-w-5xl text-center">

            {/* Top Pill */}
            <div className="inline-flex rounded-full border border-zinc-900/10 bg-zinc-900/5 px-4 py-2 text-sm text-zinc-600 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
              Student Backend Developer
            </div>

            {/* Massive Inline Heading (Mohit's Style) */}
            <h1 className="mt-8 text-5xl font-black tracking-tighter text-zinc-900 sm:text-7xl md:text-8xl dark:text-white">
              Hi, I&apos;m <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Saurabh Saraswat</span>
            </h1>

            {/* Prominent Monospace Subtitle */}
            <h2 className="mt-6 font-mono text-2xl text-zinc-500 sm:text-4xl dark:text-gray-400">
              Backend Developer
            </h2>

            {/* Unified Description Paragraph */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-lg dark:text-gray-400">
              A person with a high passion for Server Side Technologies and Cloud Services. I am a Student Backend developer who enjoys building resilient systems, scalable cloud services, and backend-first experiences.
            </p>

            {/* Tech Stack Pills (Styled to match the sleeker dark theme) */}
            <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs text-zinc-500 sm:text-sm dark:text-gray-400">
              {['NodeJs', 'MongoDB', 'Redis', 'Docker', 'Docker Swarm', 'AWS', 'AZURE', 'Flutter', 'React', 'React Native', 'PhP', 'Bash'].map((tech) => (
                <span key={tech} className="rounded-full border border-zinc-900/10 bg-zinc-900/5 px-3 py-1 transition hover:border-zinc-900/20 hover:text-zinc-900 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:text-white">
                  {tech}
                </span>
              ))}
            </div>

            {/* Buttons aligned to match Mohit's layout */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href="#projects" className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                View Projects
                <span className="ml-2 text-lg leading-none">→</span>
              </a>
              <a href="#mobile-apps" className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-transparent px-7 py-3.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-900/5 hover:border-zinc-400 dark:border-zinc-700 dark:text-white dark:hover:bg-white/5 dark:hover:border-zinc-500">
                Mobile Apps
              </a>
              <a href="#contact" className="px-6 py-3 text-sm font-semibold text-zinc-600 transition hover:text-zinc-900 dark:text-gray-300 dark:hover:text-white">
                Contact Me
              </a>
            </div>

          </div>
        </section>

        <section id="projects" className="bg-zinc-50/60 py-20 dark:bg-zinc-950/60">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 rounded-[2rem] border border-zinc-900/10 bg-white/60 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-black/40 dark:shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
              <div className="inline-flex rounded-full border border-zinc-900/10 px-4 py-2 text-sm text-zinc-600 dark:border-white/10 dark:text-gray-300">
                Projects
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                Building server-side systems and production-ready service architecture.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-500 dark:text-gray-400">
                Explore the repositories that showcase backend development, cloud services, and system-level engineering with modern tooling.
              </p>
            </div>

            {hasProjectError ? (
              <div className="rounded-[2rem] border border-zinc-900/10 bg-white/60 p-10 text-center shadow-[0_25px_80px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-black/40 dark:shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 dark:text-gray-400">Projects</p>
                <h3 className="mt-4 text-3xl font-semibold text-zinc-900 dark:text-white">Unable to load repository data</h3>
                <p className="mt-4 text-base leading-7 text-zinc-500 dark:text-gray-400">Something went wrong while fetching the project list. Please try again later.</p>
              </div>
            ) : (
              <ProjectListClient repositories={repositoryDataList} />
            )}
          </div>
        </section>

        <section id="activity" className="bg-zinc-50/60 py-20 dark:bg-zinc-950/60">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 rounded-[2rem] border border-zinc-900/10 bg-white/60 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-black/40 dark:shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
              <div className="inline-flex rounded-full border border-zinc-900/10 px-4 py-2 text-sm text-zinc-600 dark:border-white/10 dark:text-gray-300">
                Open Source Activity
              </div>
              {/* <h2 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                Sleek competitive programming and profile stats.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-500 dark:text-gray-400">
                A theme-aware activity board that highlights CodeChef, Codeforces, and LeetCode profile updates.
              </p> */}
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              <div className="rounded-[1.75rem] border border-zinc-900/10 bg-white p-6 shadow-[0_25px_70px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-zinc-950/90 dark:shadow-[0_25px_70px_rgba(0,0,0,0.18)]">
                <p className="text-sm uppercase tracking-[0.35em] text-zinc-400 dark:text-gray-500">CODECHEF</p>
                <h3 className="mt-3 text-2xl font-semibold text-zinc-900 dark:text-white">Rating History</h3>
                <div className="mt-6 overflow-hidden rounded-3xl bg-zinc-100 p-4 dark:bg-black">
                  <div className="flex h-24 items-center justify-center rounded-3xl bg-zinc-100 text-sm font-medium text-red-500 dark:bg-black dark:text-red-400">
                    Failed to fetch data
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-zinc-900/10 bg-white p-6 shadow-[0_25px_70px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-zinc-950/90 dark:shadow-[0_25px_70px_rgba(0,0,0,0.18)]">
                <p className="text-sm uppercase tracking-[0.35em] text-zinc-400 dark:text-gray-500">CODEFORCES</p>
                <h3 className="mt-3 text-2xl font-semibold text-zinc-900 dark:text-white">Profile Snapshot</h3>
                <div className="mt-6 overflow-hidden rounded-3xl bg-zinc-100 p-5 dark:bg-black">
                  <div className="rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-900">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 p-2 text-white flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                          <path d="M4 12h4l2-6 2 12 2-8 4 8" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-sky-500 dark:text-sky-400">saurabh45215</p>
                        <p className="text-sm text-zinc-500 dark:text-gray-400">Newbie (max: Newbie)</p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {[
                        ['Contest Rating', '395'],
                        ['Max Contest Rating', '395'],
                        ['Rated Contests', '1'],
                        ['Problems Solved', '25'],
                        ['Submissions', '108'],
                        ['Friend of', '0'],
                        ['Contribution', '0'],
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950/80">
                          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-gray-300">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-sky-500 text-sky-500 dark:border-sky-400 dark:text-sky-400">•</span>
                            <span>{label}</span>
                          </div>
                          <span className="text-sm font-semibold text-zinc-900 dark:text-white">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-zinc-900/10 bg-white p-6 shadow-[0_25px_70px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-zinc-950/90 dark:shadow-[0_25px_70px_rgba(0,0,0,0.18)]">
                <p className="text-sm uppercase tracking-[0.35em] text-zinc-400 dark:text-gray-500">LEETCODE</p>
                <h3 className="mt-3 text-2xl font-semibold text-zinc-900 dark:text-white">Problem Solving Profile</h3>
                <div className="mt-6 overflow-hidden rounded-3xl bg-zinc-100 p-5 dark:bg-black">
                  <div className="flex items-center gap-4 rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="h-16 w-16 rounded-2xl bg-zinc-200 bg-[url('https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80')] bg-cover bg-center dark:bg-zinc-800" />
                    <div>
                      <p className="text-lg font-semibold text-cyan-600 dark:text-cyan-300">Saurabh Saraswat</p>
                      <p className="text-sm text-zinc-500 dark:text-gray-400">saurabh45215</p>
                      <p className="text-sm text-zinc-500 dark:text-gray-400">Rank <span className="font-semibold text-zinc-900 dark:text-white">830864</span></p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-gray-300">
                    {[
                      ['Location', 'India'],
                      ['Education', 'Techno...'],
                      ['Website', 'Link'],
                      ['GitHub', 'SS0809'],
                      ['LinkedIn', 'saurabh...'],
                      ['X', 'saurabh...'],
                      ['Skills', 'java-8, ...'],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950/80">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-zinc-500 dark:border-zinc-700 dark:text-gray-400">•</span>
                        <div className="flex-1 text-sm text-zinc-500 dark:text-gray-400">
                          <span className="block text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-slate-500">{label}</span>
                          <span>{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section id="mobile-apps" className="bg-zinc-50/70 py-20 dark:bg-zinc-950/70">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 rounded-[2rem] border border-zinc-900/10 bg-white/60 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-black/40 dark:shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
              <div className="inline-flex rounded-full border border-zinc-900/10 px-4 py-2 text-sm text-zinc-600 dark:border-white/10 dark:text-gray-300">
                Mobile Apps
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                Mobile applications on Play Store and closed testing.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-500 dark:text-gray-400">
                View the mobile apps that are either published publicly or available through closed testing.
              </p>
            </div>
 
            <div className="grid gap-6 md:grid-cols-2">
              {mobileApps.map((app) => (
                <div key={app.name} className="rounded-[1.75rem] border border-zinc-900/10 bg-white/80 p-6 shadow-[0_25px_70px_rgba(0,0,0,0.05)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-zinc-950/80 dark:shadow-[0_25px_70px_rgba(0,0,0,0.18)]">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-zinc-900/10 bg-zinc-100 dark:border-white/10 dark:bg-zinc-800">
                      {app.icon ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={app.icon}
                          alt={`${app.name} icon`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect x="6" y="2" width="12" height="20" rx="2" />
                            <path d="M11 18h2" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 dark:text-gray-400">Mobile App</p>
                      <h3 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-white">{app.name}</h3>
                      <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">{app.status}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-zinc-500 dark:text-gray-400">{app.description}</p>
 
                  {app.screenshots && app.screenshots.length > 0 && (
                    <ScreenshotGallery appName={app.name} screenshots={app.screenshots} />
                  )}
 
                  {app.link && (
                    <a href={app.link} className="mt-6 inline-flex">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                        alt="Get it on Google Play"
                        className="h-12 w-auto"
                      />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-zinc-50/70 py-20 dark:bg-zinc-950/70">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-[2rem] border border-zinc-900/10 bg-white/60 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-black/40 dark:shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
              <div className="inline-flex rounded-full border border-zinc-900/10 px-4 py-2 text-sm text-zinc-600 dark:border-white/10 dark:text-gray-300">
                About
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                Backend engineering meets cloud-first thinking.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-500 dark:text-gray-400">
                I specialize in server-side development, cloud deployments, and backend infrastructure for modern applications. I build systems that scale, stay reliable, and connect with mobile and web experiences.
              </p>
            </div>
          </div>
        </section>

        <section id="blog" className="bg-zinc-50/70 py-20 dark:bg-zinc-950/70">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-[2rem] border border-zinc-900/10 bg-white/60 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.06)] backdrop-blur-xl text-center dark:border-white/10 dark:bg-black/40 dark:shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
              <div className="inline-flex rounded-full border border-zinc-900/10 px-4 py-2 text-sm text-zinc-600 dark:border-white/10 dark:text-gray-300">
                Blog
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                Writing about backend systems, cloud services, and service reliability.
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-base leading-7 text-zinc-500 dark:text-gray-400">
                Check back soon for blog posts on backend architecture, cloud deployments, and practical server-side tooling.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-zinc-50/70 py-20 dark:bg-zinc-950/70">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-[2rem] border border-zinc-900/10 bg-white/60 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-black/40 dark:shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
              <div className="inline-flex rounded-full border border-zinc-900/10 px-4 py-2 text-sm text-zinc-600 dark:border-white/10 dark:text-gray-300">
                Contact
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
                Let&apos;s build backend systems together.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-500 dark:text-gray-400">
                Reach out if you want help with server-side architecture, cloud services, or mobile backend integrations.
              </p>
              <div className="mt-8 inline-flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="mailto:hello@example.com" className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-100">
                  Email Me
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-transparent px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 dark:border-zinc-700 dark:text-white dark:hover:border-zinc-500">
                  View GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}