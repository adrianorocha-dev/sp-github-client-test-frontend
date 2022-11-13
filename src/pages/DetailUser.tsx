import { ArrowSquareOut } from 'phosphor-react'
import { ReposTable } from '../components/ReposTable'

import { API_URL } from "../config/api"
import { GithubRepo } from '../entities/GithubRepo'
import { GithubUser } from "../entities/GithubUser"
import { router } from "../router"

export function DetailUser() {
  const { loaderData: { user, repos } } = router.useMatch('/root/:username')

  return (
    <div className="p-4">
      <div className="bg-slate-700 text-zinc-100 p-4 rounded-lg">
        <div className="flex gap-4 items-center">
          <img
            className="w-32 h-32 rounded-full"
            src={user.avatar_url}
            alt={user.login}
          />

          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-bold">{user.id}</h1>

            <a
              className="hover:underline underline-offset-2"
              href={user.html_url}
              target="_blank"
            >
              <h2 className="text-xl font-bold flex gap-1 items-center">
                {user.login}
                <ArrowSquareOut />
              </h2>
            </a>

            <span>{user.name}</span>

            <span className="text-sm">{user.company}</span>

            <span className="text-sm">{user.location}</span>

            {user.public_repos && (
              <span className="text-sm">{user.public_repos} public repos</span>
            )}

            {user.followers && user.following && (
              <span className="text-sm">Followers: {user.followers} | Following: {user.following}</span>
            )}

            {user.created_at && (
              <span className="text-sm">
                Member since: {new Date(user.created_at).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4">
          <h1 className="text-lg">Repos:</h1>

          <ReposTable repos={repos} />
        </div>
      </div>
    </div>
  )
}

export async function fetchUser(username: string) {
  const response = await fetch(`${API_URL}/users/${username}/details`)

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`)
  }

  const user = await response.json()

  return user as GithubUser
}

export async function fetchUserRepos(username: string) {
  const response = await fetch(`${API_URL}/users/${username}/repos`)

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`)
  }

  const repos = await response.json()

  return repos as GithubRepo[]
}