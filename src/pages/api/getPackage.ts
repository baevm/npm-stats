import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const name = req.body

  const response = await fetch(`https://registry.npmjs.org/${name}`)

  return { response }
}
