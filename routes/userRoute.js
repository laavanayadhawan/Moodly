const { cryptPassword, comparePassword } = require("../encryption");
const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");

router.post("/insert", (request, responce) => {
  userModel.findOne({ email: request.body.email }, (error, data) => {
    if (error) {
      console.log(error);
    }
    if (!data) {
      cryptPassword(request.body.password, (e, encrypted) => {
        let userModelObject = new userModel({
          name: request.body.name,
          email: request.body.email,
          password: encrypted,
        });
        userModelObject
          .save()
          .then((callbackData) => {
            responce.json(callbackData);
          })
          .catch((error) => {
            responce.json(error);
          });
      });
    } else {
      responce.json({ message: "User Already Registered" });
    }
  });
});

router.post("/validate", (request, responce) => {
  let email = request.body.email;
  let password = request.body.password;
  if (email !== "" && password !== "") {
    userModel.findOne({ email: email }, (error, data) => {
      if (error) {
        console.log(error);
      }
      if (data) {
        comparePassword(password, data.password, (p, q) => {
          if (q) {
            responce.json(data);
          } else {
            responce.json({ message: "Incorrect Password" });
          }
        });
      } else {
        responce.json({ message: "No Account Found" });
      }
    });
  } else {
    responce.json({ message: "Please Fill All Fields" });
  }
});

router.get("/view", (request, responce) => {
  userModel.find((error, data) => {
    if (error) {
      console.log(error);
    } else {
      responce.json(data);
    }
  });
});

router.get("/view/:id", (request, responce) => {
  userModel.findById(request.params.id, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      responce.json(data);
    }
  });
});

router.post("/delete/:id", (request, responce) => {
  userModel.findByIdAndDelete(request.params.id, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      responce.json(data);
    }
  });
});

router.post("/update/:id", (request, responce) => {
  userModel.findById(request.params.id, (error, userData) => {
    if (error) {
      console.log(error);
    } else {
      let toUpdate = {};
      if (request.body.name !== userData.name) {
        toUpdate.name = request.body.name;
      }
      if (request.body.email !== userData.email) {
        toUpdate.email = request.body.email;
      }

      if (
        request.body.password !== userData.password &&
        request.body.password !== ""
      ) {
        cryptPassword(request.body.password, (e, r) => {
          toUpdate.password = r;
          userModel.findByIdAndUpdate(
            request.params.id,
            {
              ...toUpdate,
            },
            { new: true },
            (error, data) => {
              if (error) {
                console.log(error);
              } else {
                responce.json(data);
              }
            }
          );
        });
      } else {
        userModel.findByIdAndUpdate(
          request.params.id,
          {
            ...toUpdate,
          },
          { new: true },
          (error, data) => {
            if (error) {
              console.log(error);
            } else {
              responce.json(data);
            }
          }
        );
      }
    }
  });
});

module.exports = router;
