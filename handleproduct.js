//this is handleproduct.js, name change from buyproduct.js
const express = require('express'),
  app = express();

//user defined module
const schema = require("./Schemas.js");

exports.handleProd = function(req,res){
    if (req.body.action == 'Buy'){
        let conditions={productId: req.body.product},update={$inc:{remain:-1}}
        schema.Product.updateOne(conditions, update, (err,e)=>{
            if (err){
                res.send(err);
            }
            
            else{
                //TODO: add to purchase history list
                res.render(path.join(__dirname + '/purchasehistory.html'),{message:"<h1>Purchase Success</h1><p>Please check your purchase record and contact the seller.</p>"})
            }
        });
    }
    else if(req.body.action == 'Delete'){
        schema.Product.findOne({ productId: req.body.product}).remove((err,e)=>{
            if (err){
                res.send(err);
            }
            else if(e.deletedCount == 0){
                alert("Error : Nothing deleted");
                res.redirect('/home');
            }
            else{
                res.redirect('/home');
            }
        });
    }
    else{
        res.send("Error: unknown action");
    }
};
