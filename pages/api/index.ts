// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

export const getCurrenciesValues = async () => {
  let res;
  res = await fetch('https://api.bluelytics.com.ar/v2/latest');

  const data = await res.json();
  if (!res.ok) {
    const { message } = data;
    console.error('request error: ', data);
    throw message;
  }
  return data;
}


