const flatMap = require('lodash/flatMap');
const db = require('./db');
const getMenu = require('./lib/dailyFood').getMenu;
const getDate = require('./lib/utils').getDate;

async function setToday() {
  try {
    await getMenu().then(generateIntstances);
  } catch (e) {
    console.log(e);
  }
}

async function generateIntstances(data) {
  const dishModels = await Promise.all(flatMap(data,
    (dishes, type) => dishes.map((dish) => getDish(dish, type))
  ));
  const { day, month, year } = getDate();
  const [menu] = await db.Menu.findOrCreate({
    where: { day, month, year },
    defaults: { day, month, year },
  });
  await Promise.all(dishModels.map(({ instance, complex }) =>
    menu.addDish(instance, { through: complex })));
  return menu;
}

async function getDish(dish, type) {
  let maybeDish = await db.Dish.findOne({ where: { name: dish.name } });
  if (!maybeDish) {
    maybeDish = await db.Dish.create({
      name: dish.name,
      price: dish.price,
      type,
    });
  }
  if (maybeDish.price !== dish.price) {
    await maybeDish.update({
      price: dish.price,
    });
  }
  return {
    instance: maybeDish,
    complex: !!dish.complex,
  };
}

module.exports = setToday;
