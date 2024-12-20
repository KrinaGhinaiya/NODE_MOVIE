const mongoose = require('mongoose');

movieSchema = mongoose.Schema({
    name: {
        type : String,
        require : true,
    },
    desc: {
        type : String,
        require : true
    },
    price: {
        type : String,
        require : true
    },
    image: {
        type : String,
        require : true
    },
})

const movieModel = mongoose.model('movie', movieSchema);

module.exports = movieModel;