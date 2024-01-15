const User = require("./user.model");

exports.getUsers = async (req, res, next) => {
  try {
    //   fetch all users from the Users table using mongoose model
    const users = await User.find();

    // throw an error if there are no users found
    if (!users) {
      const error = new Error("No users found");
      error.statusCode = 404;
      throw error;
    }

    //   return response from the server
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  const { firstName, lastName, email } = req.body;

  console.log(req.body);

  try {
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
    });

    const result = await newUser.save();

    return res
      .status(201)
      .json({ result, message: `${firstName} saved successfully` });
  } catch (err) {
    next(err);
  }
};
