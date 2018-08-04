var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var PaymentSchema = new Schema(
    {
        order: {type : Schema.Types.ObjectId, ref: 'Order'},
        price : {type: Number, required: true, default: 0.00},
        paymentDate : {type: Date, default: Date.now},
        created : {type: Date, default: Date.now}
    }
);



module.exports = mongoose.model('Payment',PaymentSchema);