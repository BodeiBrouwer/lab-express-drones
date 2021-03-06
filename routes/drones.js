const express = require('express');

const DroneModel = require('../models/Drone.model')

const router = express.Router();

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
    DroneModel.find()
    .then((drones)=> {
      res.render('drones/list.hbs', {drones})
  })
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('./drones/create-form.hbs')
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
    DroneModel.create(req.body)
      .then(() => {
        console.log('done')
            res.redirect('/drones')
      })
      .catch ((err) => {
        console.log('That went wrong', err)
        res.render('./drones/create-form.hbs')
      })
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  DroneModel.findById(req.params.id)
        .then((drones) => {
            res.render('./drones/update-form.hbs', {drones})
        })
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  let {name, propellers, maxSpeed} = req.body
  let droneId = req.params.id
  DroneModel.findByIdAndUpdate(droneId, {$set: {name, propellers, maxSpeed}})
    .then(() => {
      res.redirect('/drones')
    })
    .catch ((drones) => {
      res.render('./drones/update-form.hbs', {drones})
    })
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  DroneModel.findByIdAndDelete(req.params.id)
  .then(() => {
      res.redirect('/drones')
  })
});

module.exports = router;
