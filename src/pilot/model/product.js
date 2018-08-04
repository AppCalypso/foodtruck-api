var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var ProductSchema = new Schema(
    {
        category: {type : Schema.Types.ObjectId, ref: 'Category'},
        items: [{type : Schema.Types.ObjectId, ref: 'Item'}],
        name : {type: String, required: true},
        description : {type: String, required: true},
        qty : {type: Number, required: true},
        image : {type: String, required: true},
        price : {type: Number, required: true, default: 0.00},
        created : {type: Date, default: Date.now}
    }
);



module.exports = mongoose.model('Product',ProductSchema);