import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/app/lib/script";
import bcrypt from 'bcrypt';


export  async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  const { username, password } = req.body;

  try {
    const adminUser = await prisma.admin.findUnique({
      where: { username: username },
    });

    if (!adminUser) {
      return res.status(401).json({ error: 'Invalid username or password' });
    } else {
      const valid = await bcrypt.compare(password, adminUser.password);

      if (!valid) {
        return res.status(401).json({ error: 'Invalid username or password' });
      } else {
        return res.status(200).json({ message: 'Login successful' });
      }
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
