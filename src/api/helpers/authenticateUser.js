const authenticateUser = async (req, res, next) => {
  console.log('B')

  const { currentUser } = res

  if (!currentUser) return res.status(401).json({ message: 'Please Log In First!' })

  return next()
}

export default authenticateUser
