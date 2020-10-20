
const mongoose  = require('mongoose');


const tourSchema = new mongoose.Schema({
    
        name: {
          type: String,
          required: [true, 'A tour must have a name'],
          unique: true,
          trim: true,
        },
        slug: String,
        duration: {
          type: Number,
          required: [true, 'A tour must have a duration']
        },
        maxGroupSize: {
          type: Number,
          required: [true, 'A tour must have a group size']
        },
        difficulty: {
          type: String,
          required: [true, 'A tour must have a difficulty'],
          enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty is either: easy, medium, difficult'
          }
        },
        ratingsQuantity: {
          type: Number,
          default: 0
        },
        price: {
          type: Number,
          required: [true, 'A tour must have a price']
        },
        summary: {
          type: String,
          trim: true,
          required: [true, 'A tour must have a description']
        },
        description: {
          type: String,
          trim: true
        },
        imageCover: {
          type: String,
          required: [true, 'A tour must have a cover image']
        },
        images: [String],
        createdAt: {
          type: Date,
          default: Date.now(),
          select: false
        },
        startDates: [Date],
        secretTour: {
          type: Boolean,
          default: false
        }
      });

const Tour = mongoose.model('Tour', tourSchema);


//////////////////////////////
//For testing of Above Code

// const testTour = new Tour({
//     name: 'The Forest fiiiiker',
//     rating: 4.7,
//     price: 497
// });

// testTour
//    .save()
//    .then(doc => {
//        console.log(doc);
//     })
// .catch(err => {
//     console.log('erroer', err)
// })

//////////////////////////////


module.exports = Tour;