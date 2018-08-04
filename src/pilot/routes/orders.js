const express = require('express');
const router = express.Router();

const Order = require('../model/order');

const orderService = require('../services/order-service');


router.get('/',async(req, res, next) => {
    
    try
    {
        let orders;

        orders = await orderService.list();
        res.status(200).json(orders);
      } 
      catch (err) 
      {
        return res.status(500).send(err);
      }
});

router.get('/list',async(req, res, next) => {
    
    try
    {
        let orders;

        orders = await orderService.list();
        res.status(200).json(orders);
      } 
      catch (err) 
      {
        return res.status(500).send(err);
      }
});


router.post('/',(req, res, next) => {

    
    orderService.create(req.body)
    .then(result => {
        console.log(result),
        res.status(200).json(result);
    })
    .catch(err => {
            
         console.log(err),
        res.status(500).json(err);
    });

});


router.post('/checkout',(req, res, next) => {

    
    orderService.checkout(req.body)
    .then(result => {
        console.log(result),
        res.status(200).json(result);
    })
    .catch(err => {
            
         console.log(err),
        res.status(500).json(err);
    });

});



router.get('/:id', async(req, res, next) => {

    const id = req.params.id;

    try
    {
        let order = await orderService.get(id);
       
        res.status(200).json(order);
    }
    catch (err) 
      {
        return res.status(500).send(err);
      }
});


router.patch('/status/:id',(req, res, next) => {

    const id = req.params.id;
    const updateOps = {};

    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }

    Order.update({_id: id},{$set: updateOps})
    .exec()
    .then(result => {
        console.log({
            message: "Order Status updated successfuly",
            flag: true,
        }),
        res.status(200).json({
            message: "Order record updated successfuly",
            flag: true,
        });
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({
            error: err,
            message: "There is an error",
            flag: false
        })
    });
});

router.delete('/:id',(req, res, next) => {

    const id = req.params.id;

    Order.remove({_id: id})
    .exec()
    .then(result => {
        console.log(result),
        res.status(200).json({
            message: "Order record deleted successfuly",
            flag: true,
        });
    })
    .catch(err => {
        console.log(err),
        res.status(500).json({
            error: err,
            message: "Error occurred",
            flag: false,
        })
    });
});

module.exports = router;