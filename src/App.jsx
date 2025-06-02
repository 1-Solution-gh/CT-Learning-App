

import AdminDashboard from './components/AdminDashboard'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
function App() {
 
  
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
      <AdminDashboard />
    </QueryClientProvider>
  )
}

export default App
