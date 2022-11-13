import { router } from "../router";
import { GithubUserCard } from "../components/GithubUserCard";
import { API_URL } from "../config/api";
import { GithubUser } from "../entities/GithubUser";


export function ListUsers() {
  const { loaderData: { users }, Link } = router.useMatch('/root/')

  return (
    <div className="p-4 max-w-screen-md w-full">
      <h1 className="text-xl font-bold text-zinc-200">
        List all GitHub users:
      </h1>

      <div className="mt-4 flex flex-col gap-3">
        {users?.map(user => (
          <Link
            key={user.id}
            to="/:username"
            params={{
              username: user.login
            }}
          >
            <GithubUserCard
              user={user}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export async function fetchUsers() {
  const response = await fetch(`${API_URL}/users?since=0`)

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`)
  }

  const users = await response.json()

  return users as GithubUser[]
}