const mongoose = require('mongoose');
const publisherSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    country: String,
    established: Number, //year
    location: String
});
const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    postDate: {
        type: Date,
        "default": Date.now
    },
});

const gameSchema = mongoose.Schema({
    title: {
        type:String,
        required: true,
    },
    year: Number,
    rate: {
        type:Number,
        min:1,
        max:5,
        default:1
    },
    price: Number,
    minPlayers: {
        type:Number,
        min:1,
        max:18,
    },
    maxPlayers: {
        type:Number,
        min:1,
        max:18,
    },
    minAge: String,
    designers: [String],
    publisher: publisherSchema,
    reviews: [reviewSchema]
});

/*Model to mongoose as global var*/
// mongoose.model('Game',gameSchema, 'games');
module.exports = mongoose.model(process.env.DB_GAMES_COLLECTION ,gameSchema);
/*easy to maintain over know convention*/
/*is not only the only one Schema, you need a name and a collection for*/
