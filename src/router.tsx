import {
  createRouteConfig,
  createReactRouter,
} from '@tanstack/react-router'

import { Layout } from './components/Layout'

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
      element: <h1>User details</h1>
    }),
  ])
])

export const router = createReactRouter({ routeConfig })