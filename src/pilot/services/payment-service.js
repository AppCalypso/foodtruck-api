const Order = require('../model/order');
const Item = require('../model/item');
const Payment = require('../model/payment');

module.exports = class PaymentService{ 
    
    constructor() {
      
    }

    
    
    static addPayment(cust) {

        var response = {
            flag: false,
            message: 'Error adding payment',
            payload: null
        };

        
        const updateOps = {};

      return new Promise(async(resolve, reject) => {
    

    

    var payment = new Payment({
                user: cust.user,
                amount: cust.amount,
                order: cust.order
            });

            

            payment.save()
            .then(async(result)  => {
                response.payload = result;
                response.flag = true;
                response.message = 'Payment added successfully';

                updateOps['status'] = 'Paid';
                updateOps['isPaid'] = 'Y';

                await Order.update({_id: cust.order},{$set: updateOps});

                resolve(response);
            })
            .catch(err => {
                response.message = 'Error adding payment';
                response.flag = false;
                resolve(response);
            });

    
      });
    }


    
    


    static async list() {

      
       
        return await Payment.find();

      
    }

    static async get(id) {

      var order = await Order.findById(id);
      order.items = await Item.find({order: id}).populate('product');
       
      return order;

    
  }

  static async listItems(id) {

    return await Item.find({order: id}).populate('product');

  
}


   generateOrderNo() {
    var d = new Date();
    var n = d.valueOf();
    return n;
}

  
  }