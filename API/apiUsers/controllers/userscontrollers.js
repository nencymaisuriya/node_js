const user = require('../models/userModel');

// fecth get users
const fecthUsers = async (req, res) => {
    try {
        const allUsers = await user.find({});
        if (allUsers) {
            res.status(200).json({ message: "users record is found", record: allUsers })
        } else {
            res.status(200).json({ message: "users record is not found" })
        }
    } catch (error) {
        res.status(404).json({ message: "somthing went worng " })
    }
}

// insert users
const insertUsers = async (req, res) => {
  try {
    console.log(req.body); 
    const insertUser = await user.create(req.body); 
    console.log(insertUser);
    if (insertUser) {
      res.status(201).json({
        insert: true,
        message: "User data inserted successfully",
        user: insertUser,
      });
    } else {
      res.status(400).json({
        insert: false,
        message: "User data insertion failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

//delete user
const DeleteUsers = async (req, res) => {
    try {
        const deleteData = await user.findByIdAndDelete(req.params.id);
        if (deleteData) {
            res.status(200).json({ mes: "delete user successfuly" })
        } else {
            res.status(200).json({ mes: "delete user faild" })
        }
    } catch (error) {
        res.status(404).json({ message: "somthing went worng ", error: error });
    }

}

// update user 
const UpdateUsers = async (req, res) => {
    try {
        const updateData = await user.findByIdAndUpdate(req.params.id, req.body);
        if (updateData) {
            res.status(200).json({ message: "user update successfuully" })
        } else {
            res.status(200).json({ message: "updated failed" })
        }
    } catch (error) {
        res.status(404).json({ message: "somthing went worng ", error: error });
    }

}
module.exports = {
    fecthUsers, insertUsers, DeleteUsers, UpdateUsers
}