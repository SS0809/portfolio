import { Octokit } from "@octokit/core";
const git_token = process.env.git_token;
const octokit = new Octokit({ auth: git_token });

export default async function fetchData(repo) {
    try {
        // Fetch repository information
        const { data } = await octokit.request('GET /repos/{owner}/{repo}', {
            owner: 'ss0809',
            repo: repo,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        
        console.log("Repository Description:", data.description);

        // Fetch commits for the repository
        const commitsResponse = await octokit.request('GET /repos/{owner}/{repo}/commits', {
            owner: 'ss0809',
            repo: repo,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        
        const commitMessage = commitsResponse.data[0]?.commit?.message;
        console.log("Commit Message:", commitMessage);

        // Return required repository information
        return {
            name: data.name,
            description: data.description,
            html_url: data.html_url,
            open_issues: data.open_issues,
            size: data.size,
            link: data.homepage,
            message: commitMessage
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
}


//TODO redis integrate , rate limit api for github & save cache to redis 
