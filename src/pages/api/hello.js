import nc from 'next-connect'

export default nc()
  .post((req, res) => {
    res.status(200).json({ message: 'Created' })
  })
  .get((req, res) => {
    res.status(200).json({ message: 'Hi' })
  })
