const user = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


exports.userregister = async (req, res) => {

    try{
        console.log(req.body);
    const registeremail = await user.findOne({ email: req.body.email })

        if(registeremail) {
             res.status(201).json({ msg: 'email is allready exits...' })
        }

    req.body.password = await bcrypt.hash(req.body.password, 10);

    const registerdata = await user.create(req.body);
    (registerdata)
        ? res.status(201).json({ msg: 'register created succesfully' })
        : res.status(401).json({ error: 'register not found' })
    }catch (e) {
    res.status(400).json({
      error: "Something went wrong...",
    });
  }
}


exports.userlogin = async (req, res) => {
  try {
    const loginemail = await user.findOne({ email: req.body.email });

    if (!loginemail) {
      res.status(401).json({  error: "User not found..." });
    }

    if (await bcrypt.compare(req.body.password)) {
      const token = jwt.sign(
        { user: currentUser },
        process.env.secret,
      );

      res.status(201).json({
        msg : "User Login Successfully...",
        authtoken: token,
      });
    } else
      res.status(401).json({ error: "Password is wrong..." });
  } catch (e) {
    res.status(400).json({
      error: "Something went wrong...",
    });
  }
};


exports.allusers = async (req, res) => {
  try {
    const allUsers = await user.find({});

    allUsers
      ? res.status(200).json({msg:"all users get ",
          users: allUsers,
        })
      : res.status(200).json({
          users: allUsers,
          error: "users not found....",
        });
  } catch (e) {
    res.status(400).json({
      error: "Something went wrong...",
    });
  }
};

exports.updateuser = async(req,res)=>{
    try{
         const dataupdate = await admin.findByIdAndUpdate(req.body);

        dataupdate
      ? res.status(200).json({msg:"all users updated ",
          users: dataupdate,
        })
      : res.status(200).json({
          users: dataupdate,
          error: "update users not found....",
        });
  } catch (e) {
    res.status(400).json({
      error: "Something went wrong...",
    });
  }
};
