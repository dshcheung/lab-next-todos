import { useEffect } from 'react'
import { useRouter } from 'next/router'

import useUser from '@/hooks/user'

import CompsLoading from '@/components/loading'

const withPrivateRoute = (WrappedComponent) => {
  const PrivateRoute = (props) => {
    const router = useRouter()
    const { user, isLoading } = useUser()

    useEffect(() => {
      if (!isLoading && !user) router.push('/')
    }, [isLoading])

    if (isLoading || !user) return <CompsLoading />

    return <WrappedComponent {...props} />
  }

  return PrivateRoute
}

export default withPrivateRoute
