import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const reminderRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return ctx.prisma.reminder.findMany({
        select: {
          text: true,
          checked: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }),
  createReminder: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.reminder.create({
          data: { text: input.text, checked: false },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
