# React Query Users Hook Usage

This file demonstrates how to use the React Query hooks for user data in the React starter template.

## Available Hooks

### `useUsers()`

Fetches all users from the API.

```tsx
import { useUsers } from '../queries/useUsers'

function UsersComponent() {
  const { data: users, isLoading, error, isError } = useUsers()

  if (isLoading) return <div>Loading users...</div>
  if (isError) return <div>Error: {error?.message}</div>

  return <div>{users?.map((user) => <div key={user.id}>{user.name}</div>)}</div>
}
```

### `useUser(userId)`

Fetches a single user by ID.

```tsx
import { useUser } from '../queries/useUsers'

function UserComponent({ userId }: { userId: string }) {
  const { data: user, isLoading, error, isError } = useUser(userId)

  if (isLoading) return <div>Loading user...</div>
  if (isError) return <div>Error: {error?.message}</div>
  if (!user) return <div>User not found</div>

  return (
    <div>
      {user.name} - {user.email}
    </div>
  )
}
```

### Query Key Factory

Use `userQueryKeys` for cache invalidation and prefetching:

```tsx
import { useQueryClient } from '@tanstack/react-query'
import { userQueryKeys } from '../queries/useUsers'

function SomeComponent() {
  const queryClient = useQueryClient()

  // Invalidate all user queries
  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: userQueryKeys.all })
  }

  // Invalidate specific user
  const handleRefreshUser = (userId: string) => {
    queryClient.invalidateQueries({ queryKey: userQueryKeys.detail(userId) })
  }

  // Prefetch user data
  const handlePrefetchUser = (userId: string) => {
    queryClient.prefetchQuery({
      queryKey: userQueryKeys.detail(userId),
      queryFn: () => fetch(`/api/users/${userId}`).then((res) => res.json())
    })
  }

  return (
    <div>
      <button onClick={handleRefresh}>Refresh All Users</button>
    </div>
  )
}
```

## Features

- **Automatic caching**: Data is cached for 5 minutes (staleTime)
- **Background refetching**: Data is refetched when it becomes stale
- **Error handling**: Built-in error states and retry logic
- **Loading states**: Proper loading indicators
- **Cache invalidation**: Easy cache management with query keys
- **MSW integration**: Uses Mock Service Worker for API mocking

## API Endpoints

The hooks expect the following API endpoints to be available:

- `GET /api/users` - Returns all users
- `GET /api/users/:id` - Returns a specific user

Both endpoints return data in this format:

```json
{
  "data": {...},
  "message": "Success message",
  "success": true
}
```

## Configuration

The hooks are configured with:

- `staleTime`: 5 minutes
- `gcTime`: 10 minutes
- `retry`: 3 attempts with exponential backoff
- `refetchOnWindowFocus`: false

You can override these defaults when using the hooks by passing additional options to the `useQuery` calls.
