const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    username: {
      type: "varchar",
      nullable: "false",
    },
    email: {
      type: "varchar",
      unique: "true",
      nullable: "false",
    },
    password: {
      type: "varchar",
      nullable: false,
    },
    city: {
      type: "varchar",
      nullable: "true",
      default: "",
    },
    country: {
      type: "varchar",
      nullable: "true",
      default: "",
    },
    address: {
      type: "varchar",
      nullable: "true",
      default: "",
    },
  },
});
