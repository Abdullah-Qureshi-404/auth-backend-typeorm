require("reflect-metadata");
const{DataSource}=require("typeorm");
const User = require("../entity/User.js");

const AppDataSource = new DataSource({
    type:"postgres",
    host:"localhost",
    port:"5432",
    username:"postgres",
    password:"admin123",
    database:"User",
    synchronize:true,
    logging:false,
    entities:[User],
});
module.exports=AppDataSource;