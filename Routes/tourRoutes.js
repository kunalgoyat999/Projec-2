const express = require('express')

const tourController = require('./../Controllers/tourController')

const router = express.Router();



router 
.route(`/`)
.get(tourController.getalltours);

router.route('/tour-stats').get(tourController.getTourStats);

// Route for busiest specific day
// router.route('/monthly-plan/:year').get(tourController.getTourStats);


router
.route('/:id')
.get(tourController.getTour)
// .post(tourController.checkbody, tourController.createTour)
.post( tourController.createTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour);


module.exports = router;