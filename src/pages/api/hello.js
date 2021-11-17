import nc from 'next-connect'

import helloShow from '@/api/controllers/hello/show'

export default nc()
  .get(helloShow)
