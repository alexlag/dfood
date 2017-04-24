const db = require('./db');
const getDate = require('./lib/utils').getDate;

const Router = require('express').Router;

const router = new Router();

router.get('/today', async (req, res) => {
  const today = getDate();
  const { Dishes: data = [] } = await db.Menu.findOne({
    where: today,
    order: [['counter', 'DESC']],
    attributes: ['counter'],
    include: [{
      model: db.Dish,
      through: { attributes: ['complex'] },
      attributes: ['id', 'name', 'type', 'price'],
    }],
  });
  res.send(data.map((dish) => ({
    id: dish.id,
    name: dish.name,
    price: dish.price,
    type: dish.type,
    complex: dish.MenuDish.complex,
  })));
});

module.exports = router;
