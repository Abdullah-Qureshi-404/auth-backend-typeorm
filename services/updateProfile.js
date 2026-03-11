const AppDataSource = require("../src/database/dataSource.js");

exports.updateProfile = async function ({
  userId,
  username,
  address,
  city,
  country,
}) {
  try {
    const userRepo = AppDataSource.getRepository("User");
    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw { code: 404, message: "User with this ID not found" };
    }
    if (city === user.city) {
      throw { code: 400, message: "To update, city should be different" };
    }
    if (address === user.address) {
      throw { code: 400, message: "To update, address should be different" };
    }
    if (country === user.country) {
      throw { code: 400, message: "To update, country should be different" };
    }
    if (username && username === user.username) {
      throw { code: 400, message: "To update, username should be different" };
    }
    if (username) user.username = username;
    user.address = address;
    user.city = city;
    user.country = country;
    await userRepo.save(user);
    return {
      code: 200,
      message: "Profile Updated!",
      user: {
        username: user.username,
        address: user.address,
        city: user.city,
        country: user.country,
      },
    };
  } catch (error) {
    throw { code: error.code, message: error.message };
  }
};
