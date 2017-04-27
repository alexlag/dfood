const db = require('./db');
const getDate = require('./lib/utils').getDate;

const Router = require('express').Router;

const router = new Router();

async function getMenu({ day, month, year }) {
  const { Dishes: data = [] } = await db.Menu.findOne({
    where: { day, month, year },
    order: [['counter', 'DESC']],
    attributes: ['counter'],
    include: [{
      model: db.Dish,
      through: { attributes: ['complex'] },
      attributes: ['id', 'name', 'type', 'price'],
    }],
  });
  return data.map((dish) => ({
    id: dish.id,
    name: dish.name,
    price: dish.price,
    type: dish.type,
    complex: dish.MenuDish.complex,
  }));
}

router.get('/today', async (req, res) => {
  const today = getDate();
  try {
    res.send(await getMenu(today));
  } catch (e) {
    res.send(404, []);
  }
});

router.get('/history', async (req, res) => {
  try {
    const all = await db.Menu.findAll({
      group: ['year', 'month', 'day'],
      attributes: ['year', 'month', 'day'],
    });
    res.send(all);
  } catch (e) {
    res.send(500, e);
  }
});

router.get('/history/:year/:month/:day', async (req, res) => {
  try {
    res.send(await getMenu(req.params));
  } catch (e) {
    res.send(404, []);
  }
});

module.exports = router;
