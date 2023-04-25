import { type RestaurantRequest } from "@/api-contract/restautant.schema";
import { prisma } from "@/server/db";
import { setup, teardown } from "@/utils/test-setup";
import { RestaurantEntity } from "@/business-logic/restaurant";

describe("Restaurant", () => {
  beforeEach(async () => {
    await teardown();
  });

  it("finds a restaurant", async () => {
    const { user } = await setup();

    const reqParams: RestaurantRequest = {
      title: "The Restaurant name",
      description: "The brief description of the restaurant",
    };

    const entity = new RestaurantEntity();
    await entity.create(reqParams, user.id);

    const restaurant = await entity.show(user.id);

    expect(restaurant?.title).toBe(reqParams.title);
  });

  it("creates a restaurant", async () => {
    const { user } = await setup();

    const reqParams: RestaurantRequest = {
      title: "The Restaurant name",
      description: "The brief description of the restaurant",
    };

    const entity = new RestaurantEntity();
    const response = await entity.create(reqParams, user.id);

    const restaurant = await prisma.restaurant.findUnique({
      where: { id: response.id },
    });

    expect(restaurant?.title).toBe(reqParams.title);
  });

  it("deletes a restaurant", async () => {
    const { user } = await setup();

    const reqParams: RestaurantRequest = {
      title: "The Restaurant name",
      description: "The brief description of the restaurant",
    };

    const entity = new RestaurantEntity();
    const response = await entity.create(reqParams, user.id);

    await entity.delete(response.id, user.id);

    const restaurant = await prisma.restaurant.findUnique({
      where: { id: response.id },
    });

    expect(restaurant).toBe(null);
  });
});
