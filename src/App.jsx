


import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import router from './routes/MainRoutes'

function App() {
 // In your App.js or main component

  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  })
  
  const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
  })
  // const sessionStoragePersister = createSyncStoragePersister({ storage: window.sessionStorage })
  
  persistQueryClient({
    queryClient,
    persister: localStoragePersister,
  })


  
  return (
    <QueryClientProvider client={queryClient} >
      {/* <AdminDashboard /> */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
