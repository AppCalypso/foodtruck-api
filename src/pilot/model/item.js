var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var ItemSchema = new Schema(
    {
        order: {type : Schema.Types.ObjectId, ref: 'Order'},
        product: {type : Schema.Types.ObjectId, ref: 'Product'},
        price : {type: Number, required: true},
        qty : {type: Number, required: true},
        status : {type: String, required: true, default: "Pending"},
        created : {type: Date, default: Date.now}
    }
);



module.exports = mongoose.model('Item',ItemSchema);