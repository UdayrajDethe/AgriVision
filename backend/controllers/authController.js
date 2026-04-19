// // const User = require("../models/User");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");

// // // ✅ REGISTER
// // exports.registerUser = async (req, res) => {
// //   const { name, email, phone, password, location } = req.body;

// //   try {
// //     const existingUser = await User.findOne({ email });
// //     if (existingUser)
// //       return res.status(400).json({ message: "User already exists" });

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const user = new User({
// //       user_id: Date.now().toString(),
// //       name,
// //       email,
// //       phone,
// //       password_hash: hashedPassword,
// //       location
// //     });

// //     await user.save();

// //     res.json({ message: "Registration successful" });

// //   } catch (err) {
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // // ✅ LOGIN
// // exports.loginUser = async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     const user = await User.findOne({ email });
// //     if (!user)
// //       return res.status(400).json({ message: "User not found" });

// //     const isMatch = await bcrypt.compare(password, user.password_hash);
// //     if (!isMatch)
// //       return res.status(400).json({ message: "Invalid password" });

// //     const token = jwt.sign(
// //       { id: user.user_id },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "1d" }
// //     );

// //     res.json({ token, message: "Login successful" });

// //   } catch (err) {
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };



// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password_hash);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid password" });

//     const token = jwt.sign(
//       { id: user.user_id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     // ✅ SEND USER DATA ALSO
//     res.json({
//       token,
//       message: "Login successful",
//       user: {
//         name: user.name,
//         email: user.email
//       }
//     });

//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };



const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ REGISTER
exports.registerUser = async (req, res) => {
  const { name, email, phone, password, location } = req.body;

  try {
    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = new User({
      user_id: Date.now().toString(),
      name,
      email,
      phone,
      password_hash: hashedPassword,
      location
    });

    await user.save();

    res.status(201).json({
      message: "Registration successful"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ LOGIN
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // generate token
    const token = jwt.sign(
      { id: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ SEND USER DATA (IMPORTANT FOR FRONTEND)
    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};