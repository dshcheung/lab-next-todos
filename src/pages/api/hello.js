import nc from 'next-connect'

import session from '@/api/helpers/session'

import helloShow from '@/api/controllers/hello/show'

export default nc()
  .use(session)
  .get(helloShow)
