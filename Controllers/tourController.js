const Tour = require('./../models/tourmodel.js');

////////////////////
// To get all tours from file to postman
///////////////////

exports.getalltours = async(req,res) => {

   try{

    //BUILD QUERY

    // 1) Filtering
    const queryObj = {...req.query};
    const excludeFields = ['page', 'short', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);
    console.log(req.query, queryObj);

    // 2) Advanced filtering
    let querystr = JSON.stringify(queryObj);
    querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(JSON.parse(querystr));

    const query = await Tour.find(queryObj);
  
    // const tours = await Tour.find()
    // .where('duration')
    // .equals(5)
    // .where('difficulty')
    // .equals('easy');


    //EXECUTE QUERY
    const tours = await query();

    //SEND QUERY
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
   } catch (err) {
       res.status(404).json({
           status:'fail',
           message: err
       });
   }
};
////////////////////
// To get tour from file to postman
///////////////////

exports.getTour = async (req,res) => {

    try{
        const tour = await Tour.findById(req.params.id);
        // Tour.findOne({_id: req.params.id})

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (err) {
       res.status(404).json({
           status: 'fail',
           message: err
       }) 
    }

    // console.log(req.params);

    // const id = req.params.id * 1;
    // const tour = tours.find(el=> el.id ===id);

    // if(id> tours.length){
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'File not found',
    //     })


    // res.status(200).json({
    //      status: 'success',
    //     data: {
    //         tour
    //     }
    // })
};

////////////////////
// To create a tour
///////////////////

exports.createTour = async (req, res) => {
   try {
    // console.log(req.body);
    // const newTours = new Tour({
    const newTour = await Tour.create(req.body);
     

    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    });
   } catch (err) {
       res.status(404).json({
           status: 'fail' ,
           message: (err)
       })
   }
    
}
////////////////////
// To update a tour 
///////////////////

exports.updateTour = async (req,res) => {

    // if(req.params.id * 1 > tours.length){
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'File not found',
    //     });
    // }

    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true  
        })
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    } 
}

////////////////////
// To delete some code in Postman we do like this 
///////////////////

exports.deleteTour =  async (req,res) => {

    // if(req.params.id * 1 > tours.length){
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'File not found',
    //     });
    // }
 

    try {
        await Tour.findByIdAndUpdate(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        });
    }
};


exports.getTourStats = async (req, res) => {

    try {
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 }}
            },
            {
                $group: {
                    _id: null,  
                    avgRating: { $avg: '$ratingsAverage'},
                    avgPrice: { $avg: '$price'},
                    minPrice: { $min: '$price'},
                    maxPrice: { $max: '$price'},
                }
            } 
        ]);
        res.status(200).json({
            status: 'success',
            data: {
                stats
            }
        })
    }
 

    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'err'
        });
    }
}


//////////////////////////////////
//to get out when was more traffic for a specific time
/////////////////////////////////


// exports.getMonthlyPlan = async (req, res) => {
//     try {
//         const year = req.params.year * 1;

//         const plan = await Tour.aggregate([

//         {
//             $unwind: '$startDates'
//         },
//         {
//             $match: {
//                 startDates: {
//                     $gte: new Date(`${year}-01/01`),
//                     $lte: new Date(`${year}-12-31`)
//                 }
//             }
//         },
//         {
//             $group: {
//                 _id: { $month: 'startDates'},
//                 numTourStarts: { $add: 1},
//                 tours: { $push: '$name' } 
//             }
//         },
//         {
//             $addFields: { month: '$_id'}
//         },
//         {
//             $project: {
//                 _id: 0
//             }
//         },
//         {
//             $short: {numTourStart: -1 }
//         },
//         {
//             $limit: 6
//         }
//         ])

//         res.status(200).json({
//             status: 'success',
//             data: {
//                 stats
//             }
//         })

//     } catch (err) {
//         res.status(404).json({
//             status: 'fail',
//             message: 'err'
//         });
//     } 
// }






////////////////////////////////////////////////////////////////////////////
//////Before making a real api 
///////////////////////////////////////////////////////////////////////////



// // const fs = require('fs');
// // const Tour = require('./../models/tourmodel.js');
// // const tours = JSON.parse(
// //     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// // );



// // exports.checkbody = (req, res, next) => {
// //     if(!req.body.name || !req.body.price) {
// //         return res.status(404).json({
// //             status: 'fail',
// //             message: 'Missing name or price'
// //         });
// //     }
// //  next();
// // };




// /////////////////////////////////////////////////////
// // To get all tours from file to postman
// /////////////////////////////////////////////////////



// exports.getalltours = (req,res) => {
//     console.log(req.requestTime)
//     res.status(200).json({
//         requestedAt: req.requestTime,
//         status: 'success',
//         // results: tours.length,
//         // data: {
//         //     tours
//         // }
//     })
// };

// ////////////////////
// // To get tour from file to postman
// ///////////////////

// exports.getTour = (req,res) => {
//     console.log(req.params);

//     const id = req.params.id * 1;
//     // const tour = tours.find(el=> el.id ===id);

//     // if(id> tours.length){
//     //     return res.status(404).json({
//     //         status: 'fail',
//     //         message: 'File not found',
//     //     })


//     // res.status(200).json({
//     //     status: 'success',
//     //     data: {
//     //         tour
//     //     }
//     // })
// };

// ////////////////////
// // To create a tour
// ///////////////////

// exports.createTour = (req, res) => {
//     // console.log(req.body);

//     res.status(201).json({
//         status: 'success',
//         // data: {
//         //     tour: newTour
//         // }
//     });
// }
// ////////////////////
// // To update a tour 
// ///////////////////

// exports.updateTour = (req,res) => {

//     // if(req.params.id * 1 > tours.length){
//     //     return res.status(404).json({
//     //         status: 'fail',
//     //         message: 'File not found',
//     //     });
//     // }

//     res.status(200).json({
//         status: 'success',
//         data: {
//             tours: '<updated tour is here>....'
//         }
//     })
// }

// ////////////////////
// // To delete some code in Postman we do like this 
// ///////////////////

// exports.deleteTour = (req,res) => {

//     // if(req.params.id * 1 > tours.length){
//     //     return res.status(404).json({
//     //         status: 'fail',
//     //         message: 'File not found',
//     //     });
//     // }
 
//     res.status(204).json({
//         status: 'success',
//         data: null
//     })
// }


