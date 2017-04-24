module.exports = (sequelize, DataTypes) => {
  const Dish = sequelize.define('Dish', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        Dish.belongsToMany(models.Menu, { through: models.MenuDish });
      },
    },
    name: {
      singular: 'Dish',
      plural: 'Dishes',
    },
  });

  return Dish;
};
