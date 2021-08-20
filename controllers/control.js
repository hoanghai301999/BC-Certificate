var Register = require("../models/register");

module.exports = function(app){

app.post("/register",function(req,res){
    if(!req.body.Address || !req.body.Name || !req.body.Email ||!req.body.Phone||!req.body.Cmnd){
        res.json({ketqua:0,maloi:"Thieu Tham So"});
    }
    else{
        var newregister = new Register({
            Name:req.body.Name,
            Address:req.body.Address,
            Email:req.body.Email,
            Phone:req.body.Phone,
            Cmnd:req.body.Cmnd,
            Haspayed: false,
            Grade: 0,
            Hash: ""
         });
       newregister.save(function(err){
           if(err){
                 res.json({ketqua:0,maloi:"Mongodb save error!"}); 
           }else{
                res.json({ketqua:1,maloi:newregister._id});
           }
       });
    }
});


app.post('/update',function(req,res){
    var id = req.body.thisid;
    var hash = req.body.hashed;
    Register.findOneAndUpdate({_id : id},{Haspayed: true,Hash:hash}, function(err, result){
        if(err){
            res.json({ketqua:0,maloi:"Mongodb save error!"}); 
        }
        else{
            res.json({ketqua:1,maloi:result}); 
        }

    })

})

app.post('/update/grade',function(req,res){
    const id_ = req.body.id;
    const finalgrade = req.body.score;
    Register.findOneAndUpdate({_id : id_},{Grade:finalgrade},function(err,result){
        if(err){
            res.json({ketqua:0,maloi:"Mongodb save error!"}); 
        }
        else{
            res.json({ketqua:1,maloi:result}); 
        }
    })

})

app.get("/certificate",function(req,res){
    res.render("certificate");
  })
  

app.get("/certificate/:hash", function(req,res){
    Register.find({Hash:req.params.hash},function(err,result){
        if(err){
            res.json({ketqua:0,status:"Cannot find Hash"});
        }else{
            res.render("viewcertificate",{ketqua:1,status:result});
        }
    })
})

}