const Order = require('../model/order');
const Item = require('../model/item');

module.exports = class OrderService{ 
    
    constructor() {
      
    }
    
    static checkout(cust) {

        var response = {
            flag: false,
            message: 'Error signing up',
            order: null
        };

        var itemObj = null;
        var orderObj = null;
        var items = [];
        var order = null;

        

      return new Promise(async(resolve, reject) => {
    //     const merchant = new Merchant({
    //         name: cust.name,
    //         address: cust.address,
    //         location: cust.location,
    //         state: cust.state,
    //         email: cust.email,
    //         phoneno: cust.phoneno,
    //         image: cust.image
    //     });


    //     merchant
    // .save()
    // .then(async(result) => {
    //     console.log(result);
    //     response.flag = true;
    //     response.message = 'Merchant registered successfully';
    //     response.merchant = result;

        
    //     resolve(response);
    // })
    // .catch(err => {
    //     console.log(err)
    //     reject(error);
    // });

    var d = new Date();
    var n = d.valueOf();

    order = new Order({
                user: cust.user,
                amount: cust.amount,
                vat: cust.vat,
                discount: cust.discount,
                orderNo: n
            });

    orderObj = await order.save();

    for(const item of cust.items)
    {
        itemObj = new Item({
            order: orderObj._id,
            product: item.product,
            price: item.price,
            qty: item.qty
        });

        items.push(await itemObj.save());

    }

    response.order = {
        items: cust.items,
        order: orderObj
    }
    response.flag = true;
    response.message = "New order Created successfully";
         resolve(response);
      });
    }

    


    static async list() {

      
       
        return await Order.find();

      
    }

    static async get(id) {

      var order = await Order.findById(id);
      order.items = await Item.find({order: id}).populate('product');
       
      return order;

    
  }

   generateOrderNo() {
    var d = new Date();
    var n = d.valueOf();
    return n;
}

  
  }