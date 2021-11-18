import useUser from '@/hooks/user'

import Layout from '@/components/layouts/Layout'
import withPrivateRoute from '@/components/PrivateRoute'

const Private = () => {
  const { user } = useUser()

  return (
    <Layout>
      <div>{user.email}</div>
    </Layout>
  )
}

export default withPrivateRoute(Private)
