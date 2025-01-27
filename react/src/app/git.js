import { Octokit } from "@octokit/core";
const git_token = process.env.GIT_TOKEN;
const octokit = new Octokit({ auth: git_token });
import { getRedisData } from "./redis";
// Main function
const main = async () => {
    // Example usage
    const repoName = 'proximity';
    try {
            // const data = await getRedisData(repoName);
            //     if (!data) {
            //       console.warn(`Key "${repoName}" not found in Redis`);
            //       return null; // Handle missing data gracefully
            //     }
        console.log(`Data for key "${JSON.stringify(fetchData(repoName))}":`);
        // console.log('Final data:', dataa);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Run main function
// main().catch((err) => console.error('Error in main:', err));

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
