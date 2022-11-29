import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const reminders = async (req: NextApiRequest, res: NextApiResponse) => {
  const reminders = await prisma.reminder.findMany();
  res.status(200).json(reminders);
};

export default reminders;
