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
        const updateOps = {};
        const itms = [];
        var itt = {};
        

      return new Promise(async(resolve, reject) => {
    

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

        itt = await itemObj.save();

        items.push(itt);
        itms.push(itt._id);
    }

    updateOps['items'] = itms;

    await Order.update({_id: orderObj._id},{$set: updateOps});

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

  static async listItems(id) {

    return await Item.find({order: id}).populate('product');

  
}


   generateOrderNo() {
    var d = new Date();
    var n = d.valueOf();
    return n;
}

  
  }