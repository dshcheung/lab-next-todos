import nc from 'next-connect'

const helloShow = async (req, res) => {
  res.status(200).json({ message: 'Hi' })
}

export default nc()
  .use(helloShow)
