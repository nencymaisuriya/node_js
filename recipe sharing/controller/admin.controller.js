const admin = require('../models/admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


exports.adminregister = async (req, res) => {

    try{
        console.log(req.body);
    const registeremail = await admin.findOne({ email: req.body.email })

        if(registeremail) {
             res.status(201).json({ msg: 'email is allready exits...' })
        }

    req.body.password = await bcrypt.hash(req.body.password, 10);

    const registerdata = await admin.create(req.body);
    (registerdata)
        ? res.status(201).json({ msg: 'register created succesfully' })
        : res.status(401).json({ error: 'register not found' })
    }catch (e) {
    res.status(400).json({
      error: "Something went wrong...",
    });
  }
}


exports.adminlogin = async (req, res) => {
  try {
    const currentUser = await admin.findOne({ email: req.body.email });

    if (!currentUser) {
      res.status(401).json({  error: "admin not found..." });
    }

    if (await bcrypt.compare(req.body.password)) {
      const token = jwt.sign(
        { current_user: currentUser },
        process.env.secret,
      );

      res.status(201).json({
        msg : "admin Login Successfully...",
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

exports.alladmin = async (req, res) => {
  try {
    const alladmin = await user.find({});

    alladmin
      ? res.status(200).json({msg:"all admin get ",
          users: alladmin,
        })
      : res.status(200).json({
          users: alladmin,
          error: "admin not found....",
        });
  } catch (e) {
    res.status(400).json({
      error: "Something went wrong...",
    });
  }
};

exports.updateadmin = async(req,res)=>{
    try{
         const adminupdate = await admin.findByIdAndUpdate(req.body);

        adminupdate
      ? res.status(200).json({msg:"all admin updated ",
          users: adminupdate,
        })
      : res.status(200).json({
          users: adminupdate,
          error: "update admin not found....",
        });
  } catch (e) {
    res.status(400).json({
      error: "Something went wrong...",
    });
  }
};
    
  


