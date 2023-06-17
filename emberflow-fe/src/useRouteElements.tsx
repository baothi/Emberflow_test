import { useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Contact from './pages/Contact'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      children: [
        {
          path: '',
          element: (
            <MainLayout>
              <Contact />
            </MainLayout>
          )
        },
        {
          path: '*',
          element: (
            <MainLayout>
              <h1>404 Not Found</h1>
            </MainLayout>
          )
        }
      ]
    }
  ])

  return routeElements
}
