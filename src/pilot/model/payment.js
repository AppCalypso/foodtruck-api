var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var PaymentSchema = new Schema(
    {
        user: {type : Schema.Types.ObjectId, ref: 'User'},
        order: {type : Schema.Types.ObjectId, ref: 'Order'},
        amount : {type: Number, required: true, default: 0.00},
        paymentDate : {type: Date, default: Date.now},
        created : {type: Date, default: Date.now}
    }
);



module.exports = mongoose.model('Payment',PaymentSchema);