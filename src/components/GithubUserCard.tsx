import { GithubUser } from "../entities/GithubUser"

interface GithubUserCardProps {
  user: GithubUser
}

export function GithubUserCard({user}: GithubUserCardProps) {
  return (
    <div className="w-full p-3 rounded-lg flex gap-3 bg-slate-600 text-white cursor-pointer shadow-sm hover:shadow-lg transition-shadow">
      <div className="self-center">
        <img
          className="w-24 h-w-24 rounded-lg"
          src={user.avatar_url}
          alt={user.login}
        />
      </div>

      <div className="flex flex-col justify-center">
        <h1 className="font-bold">{user.login}</h1>

        <h2>{user.name}</h2>

        <h3>{user.company}</h3>

        <h4>{user.location}</h4>

        <h4>{user.public_repos} public repos</h4>

        <h4>Followers: {user.followers} | Following: {user.following}</h4>
      </div>
    </div>
  )
}