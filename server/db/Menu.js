module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    responseHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    counter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        Menu.belongsToMany(models.Dish, { through: models.MenuDish });
      },
    },
    indexes: [{
      unique: true,
      fields: ['day', 'month', 'year', 'responseHash'],
    }],
  });

  return Menu;
};
