const express = require("express");
const router = express.Router();
const dataModel = require("../models/dataModel");

router.post("/insert", (request, responce) => {
  let dataModelObject = new dataModel({
    user: request.body.user,
    mood: request.body.mood,
  });
  dataModelObject
    .save()
    .then((callbackData) => {
      responce.json(callbackData);
    })
    .catch((error) => {
      responce.json(error);
    });
});

router.get("/view/:id", (request, responce) => {
  dataModel.find(
    { user: request.params.id },
    null,
    { sort: { addedAt: -1 } },
    (error, data) => {
      if (error) {
        console.log(error);
      } else {
        responce.json(data);
      }
    }
  );
});

router.get("/view/:id", (request, responce) => {
  dataModel.findById(request.params.id, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      responce.json(data);
    }
  });
});

router.post("/delete/:id", (request, responce) => {
  dataModel.findByIdAndDelete(request.params.id, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      responce.json(data);
    }
  });
});

router.post("/update/:id", (request, responce) => {
  dataModel.findByIdAndUpdate(
    request.params.id,
    {
      user: request.body.user,
      mood: request.body.mood,
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

module.exports = router;
