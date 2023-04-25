import { type MenuRequest } from "@/api-contract/menu.schema";
import { prisma } from "@/server/db";
import { setup, teardown } from "@/utils/test-setup";
import { MenuEntity } from "@/business-logic/menu";
import { RestaurantEntity } from "@/business-logic/restaurant";
import { type RestaurantRequest } from "@/api-contract/restautant.schema";

describe("Menu", () => {
  beforeEach(async () => {
    await teardown();
  });

  it("lists menu", async () => {
    const { user } = await setup();

    const reqParams: MenuRequest[] = [
      {
        title: "Menu title",
        items: [{ title: "MenuItem 1", price: "40" }],
      },
      {
        title: "Menu title2",
        items: [{ title: "MenuItem 2", price: "40" }],
      },
    ];

    const resReqParams: RestaurantRequest = {
      title: "Restaurant name",
      description: "brief description of the restaurant",
    };

    const menuEntity = new MenuEntity();
    const restaurantEntity = new RestaurantEntity();
    const restaurant = await restaurantEntity.create(resReqParams, user.id);
    await menuEntity.create(reqParams, restaurant.id);

    const menuList = await menuEntity.list(restaurant?.id || "");

    expect(menuList.length).toBe(2);
  });

  it("finds a menu", async () => {
    const { user } = await setup();

    const reqParams: MenuRequest[] = [
      {
        title: "Menu title",
        items: [{ title: "MenuItem 1", price: "40" }],
      },
    ];

    const resReqParams: RestaurantRequest = {
      title: "Restaurant name",
      description: "brief description of the restaurant",
    };

    const menuEntity = new MenuEntity();
    const restaurantEntity = new RestaurantEntity();
    const restaurant = await restaurantEntity.create(resReqParams, user.id);
    const response = await menuEntity.create(reqParams, restaurant.id);

    const menu = await menuEntity.show(response[0]?.id || "");

    expect(menu?.title).toBe(reqParams[0]?.title);
  });

  it("creates a menu", async () => {
    const { user } = await setup();

    const reqParams: MenuRequest[] = [
      {
        title: "Menu title",
        items: [{ title: "MenuItem 1", price: "40" }],
      },
    ];

    const resReqParams: RestaurantRequest = {
      title: "Restaurant name",
      description: "brief description of the restaurant",
    };

    const menuEntity = new MenuEntity();
    const restaurantEntity = new RestaurantEntity();
    const restaurant = await restaurantEntity.create(resReqParams, user.id);
    const response = await menuEntity.create(reqParams, restaurant.id);

    const menu = await prisma.menu.findUnique({
      where: { id: response[0]?.id },
    });

    expect(menu?.title).toBe(reqParams[0]?.title);
  });

  it("deletes a menu", async () => {
    const { user } = await setup();

    const reqParams: MenuRequest[] = [
      {
        title: "Menu title",
        items: [{ title: "MenuItem 1", price: "40" }],
      },
    ];

    const resReqParams: RestaurantRequest = {
      title: "Restaurant name",
      description: "brief description of the restaurant",
    };

    const menuEntity = new MenuEntity();
    const restaurantEntity = new RestaurantEntity();
    const restaurant = await restaurantEntity.create(resReqParams, user.id);
    const response = await menuEntity.create(reqParams, restaurant.id);

    await menuEntity.delete(response[0]?.id || "", restaurant.id);

    const menu = await prisma.menu.findUnique({
      where: { id: response[0]?.id },
    });

    expect(menu).toBe(null);
  });
});
