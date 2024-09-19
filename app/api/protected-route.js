import { authenticatedMiddleware } from '../middleware'

export default async function handler(req, res) {
  await authenticatedMiddleware(req, res, async () => {
    // Your protected route logic here
    res.status(200).json({ message: 'You have access to this protected route' })
  })
}
