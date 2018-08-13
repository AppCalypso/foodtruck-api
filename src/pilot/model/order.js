var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var OrderSchema = new Schema(
    {
        user: {type : Schema.Types.ObjectId, ref: 'User'},
        items: [{type : Schema.Types.ObjectId, ref: 'Item'}],
        payments: [{type : Schema.Types.ObjectId, ref: 'Payment'}],
        orderNo : {type: String, required: true, default: "NA"},
        amount : {type: Number, required: true},
        vat : {type: Number, required: true},
        discount : {type: Number, required: true},
        status : {type: String, required: true, default: "Pending"},
        isReady : {type: String, required: true, default: "N"},
        isDelivered : {type: String, required: true, default: "N"},
        isPaid : {type: String, required: true, default: "N"},
        created : {type: Date, default: Date.now}
    }
);



module.exports = mongoose.model('Order',OrderSchema);