var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        orders: [{type : Schema.Types.ObjectId, ref: 'Order'}],
        username : {type: String, required: true},
        password : {type: String, required: true},
        created : {type: Date, default: Date.now}
    }
);



module.exports = mongoose.model('User',UserSchema);