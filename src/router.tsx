import {
  createRouteConfig,
  createReactRouter,
} from '@tanstack/react-router'

import { Layout } from './components/Layout'
import { DetailUser, fetchUser, fetchUserRepos } from './pages/DetailUser'

import { fetchUsers, ListUsers } from './pages/ListUsers'

const routeConfig = createRouteConfig().createChildren(createRoute => [
  createRoute({
    id: 'root',
    element: <Layout />
  }).createChildren(createRoute => [
    createRoute({
      path: '/',
      element: <ListUsers />,
      loader: async () => {
        return {
          users: await fetchUsers()
        }
      }
    }),
    createRoute({
      path: '/:username',
      element: <DetailUser />,
      loader: async ({ params: { username } }) => {
        return {
          user: await fetchUser(username),
          repos: await fetchUserRepos(username)
        }
      }
    }),
  ])
])

export const router = createReactRouter({ routeConfig })