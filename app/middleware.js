import { getToken } from 'next-auth/jwt'

export async function authenticatedMiddleware(req, res, next) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  req.user = token
  next()
}
