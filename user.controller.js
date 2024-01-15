const User = require("./user.model");

exports.getUsers = async (req, res, next) => {
  try {
    //   fetch all users from the Users table using mongoose model
    const users = await User.find();

    // throw an error if there are no users found
    if (!users) throwError("No users found", 404);

    //   return response from the server
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  const { firstName, lastName, email } = req.body;

  try {
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
    });

    await newUser.save();

    return res.status(201).json({ message: `${firstName} saved successfully` });
  } catch (err) {
    next(err);
  }
};

exports.editUser = async (req, res, next) => {
  const userId = req.params.id;
  const { firstName, lastName, email } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) throwError("user not found", 404);

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    const result = await user.save();

    return res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) throwError("User not found!", 404);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) throwError("User not found!", 404);

    return res.status(204).json({ message: "User deleted from the system" });
  } catch (err) {
    next(err);
  }
};

function throwError(message, status) {
  const error = new Error(message);
  error.statusCode = status;
  throw error;
}
