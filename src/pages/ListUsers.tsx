import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'

import { router } from "../router";
import { GithubUserCard } from "../components/GithubUserCard";
import { API_URL } from "../config/api";
import { GithubUser } from "../entities/GithubUser";

const usersPerPage = 20

export function ListUsers() {
  const { Link } = router.useMatch('/root/')

  const [pageStartIds, setPageStartIds] = useState([0])

  const currentPageStartId = pageStartIds[pageStartIds.length - 1]
  
  const { data: users, error } = useQuery({
    queryKey: ['users', currentPageStartId],
    queryFn: () => fetchUsers(currentPageStartId),
    keepPreviousData: true
  })

  const lastUserId = users?.[users.length - 1]?.id ?? 0;

  function handlePreviousPage() {
    setPageStartIds(current => current.slice(0, -1))
  }

  function handleNextPage() {
    setPageStartIds(current => [...current, lastUserId])
  }

  return (
    <div className="p-4 max-w-screen-md w-full">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold text-zinc-200">
          List all GitHub users:
        </h1>

        <div className="flex gap-1 items-center">
          <button
            className="px-2 py-1 bg-zinc-200 text-slate-800 rounded hover:bg-zinc-300 transition-colors"
            onClick={handlePreviousPage}
          >
            Prev
          </button>

          <span className="mx-2">Page {pageStartIds.length}</span>

          <button
            className="px-2 py-1 bg-zinc-200 text-slate-800 rounded hover:bg-zinc-300 transition-colors"
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>

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

async function fetchUsers(since: number) {
  const response = await fetch(`${API_URL}/users?since=${since}`)

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`)
  }

  const users = await response.json()

  return users as GithubUser[]
}