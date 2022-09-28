const express = require('express');
const app = express();
const mysql = require('mysql2');
let connection = require('./config/connection'); 

app.use(express.json());
app.use(express.urlencoded({extended:true}));
  
// ทำการเชื่อมต่อกับฐานข้อมูล 
// connection.connect(function(err){
//   if (err) throw err
//   console.log('You are now connected with mysql database...');
// });

app.listen(3000,()=>{
    console.log("Listen on port 3000 .... ");
});

app.get('/customers', (req,res)=>{
    let sql = "SELECT * FROM customer";
    connection.query(sql,(err,results,fields)=>{
        if(err) throw err;
        res.json(results);
    });
})

app.get('/customer/:id', (req,res)=>{
    let sql = 'SELECT * FROM customer WHERE id=?' + [req.params.id];
    connection.query(sql, (err,results,fields)=>{
        if(err) throw err;
        res.json(results);
    })
})

app.post('/customer',(req,res)=>{
    let user = {
        "Name": req.body.Name,
        "Address": req.body.Address,
        "Country": req.body.Country,
        "Phone": req.body.Phone
    };
    let sql = 'INSERT INTO customer SET ?';
    // let params = req.body;
    //console.log(params);
    connection.query(sql,user, (err,results,fields)=>{
        if(err) throw err;
        res.json(results);
    });
});

app.delete('/customer/:id',(req,res)=>{
    let sql = 'DELETE FROM customer WHERE id = ?';
    connection.query(sql,[req.params.id],(err,results,fields)=>{
        if(err) throw err;
        res.end('Record has been deleted...');
    });
    console.log("delect sucess!! ");
});

app.put('/customer/:id',(req,res)=>{
    let user = {
        "Name": req.body.Name,
        "Address": req.body.Address,
        "Country": req.body.Country,
        "Phone": req.body.Phone
    };
    let sql = 'UPDATE customer SET ? WHERE Id = ?';
    // let params = req.body;
    //console.log(params);
    connection.query(sql,[user, req.params.id],(err,results,fields)=>{
        if(err)throw err;
        res.json(results);
    });
    console.log(results);
});