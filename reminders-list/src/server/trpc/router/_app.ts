import { router } from "../trpc";
import { authRouter } from "./auth";
import { reminderRouter } from "./reminderRouter";

export const appRouter = router({
  reminder: reminderRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
