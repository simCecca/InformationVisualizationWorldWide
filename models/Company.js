/*define a structure for the data*/
let mongoose = require('mongoose');

//article schema
let companiesSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        require: true
    },
    website:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    lat:{
        type: String,
        require: true
    },
    lng:{
        type: String,
        require: true
    }
});

let Company = module.exports = mongoose.model('company', companiesSchema);