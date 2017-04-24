module.exports = (sequelize, DataTypes) => {
  const MenuDish = sequelize.define('MenuDish', {
    complex: {
      type: DataTypes.BOOLEAN,
    },
  });

  return MenuDish;
};
