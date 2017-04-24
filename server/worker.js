const flatMap = require('lodash/flatMap');
const hash = require('object-hash');
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
  const responseHash = hash(data);
  const { day, month, year } = getDate();

  let maybeMenu = await db.Menu.findOne({ where: { day, month, year, responseHash } });
  if (maybeMenu) {
    await maybeMenu.increment('counter');
  } else {
    maybeMenu = await db.Menu.create({
      day,
      month,
      year,
      responseHash,
      counter: 1,
    });
    const dishModels = await Promise.all(flatMap(data,
      (dishes, type) => dishes.map((dish) => getDish(dish, type))
    ));

    await Promise.all(dishModels.map(({ instance, complex }) =>
      maybeMenu.addDish(instance, { complex })));
  }
  return maybeMenu;
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
