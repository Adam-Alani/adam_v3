import { Octokit } from "@octokit/rest";


const octokit = new Octokit({
})

export default async function getRepositories() {
    const { data } = await octokit.request("/users/Adam-Alani/repos");
    return data;
}
