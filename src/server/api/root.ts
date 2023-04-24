import { createTRPCRouter } from "@/server/api/trpc";
import { restaurantRouter } from "@/server/api/routers/restaurant";
import { menuRouter } from "@/server/api/routers/menu";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  restaurant: restaurantRouter,
  menu: menuRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
