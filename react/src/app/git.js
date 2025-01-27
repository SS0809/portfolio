import { Octokit } from "@octokit/core";
const git_token = process.env.GIT_TOKEN;
const octokit = new Octokit({ auth: git_token });
export default async function fetchData(repo) {
    try {
        const { data } = await octokit.request('GET /repos/{owner}/{repo}', {
            owner: 'ss0809',
            repo: repo,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        const commitsResponse = await octokit.request('GET /repos/{owner}/{repo}/commits', {
            owner: 'ss0809',
            repo: repo,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        
        const commitMessage = commitsResponse.data[0]?.commit?.message;
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