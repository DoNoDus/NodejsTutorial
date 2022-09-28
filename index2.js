const express = require('express');
const app = express();
const mysql = require('mysql2');
let connection = require('./config/connection2'); 

app.use(express.json());
app.use(express.urlencoded({extended:true}));
  
// ทำการเชื่อมต่อกับฐานข้อมูล 
// connection.connect(function(err){
//   if (err) throw err
//   console.log('You are now connected with mysql database...');
// });

app.listen(3000,()=>{
    console.log("Listen on port 3000 .... index2");
});

app.get('/accounts', (req,res)=>{
    let sql = "SELECT * FROM account";
    connection.query(sql,(err,results,fields)=>{
        if(err) throw err;
        res.json(results);
    });
})

app.get('/account/:account_number', (req,res)=>{
    let sql = 'SELECT * FROM account WHERE account_number =?';
    connection.query(sql,[req.params.account_number], (err,results,fields)=>{
        if(err) throw err;
        res.json(results);
    })
})

app.post('/account',(req,res)=>{
    let user = {
        "account_number": req.body.account_number,
        "branch_name": req.body.branch_name,
        "balance": req.body.balance
    };
    let sql = 'INSERT INTO account SET ?';
    // let params = req.body;
    //console.log(params);
    connection.query(sql,user, (err,results,fields)=>{
        if(err) throw err;
        res.json(results);
    });
});

app.delete('/account/:account_number',(req,res)=>{
    let sql = 'DELETE FROM account WHERE account_number = ?';
    connection.query(sql,[req.params.account_number],(err,results,fields)=>{
        if(err) throw err;
        res.end('Record has been deleted...');
    });
    console.log("delect sucess!! ");
});

app.put('/account/:account_number',(req,res)=>{
    let user = {
        "branch_name": req.body.branch_name,
        "balance": req.body.balance
    };
    let sql = 'UPDATE account SET ? WHERE account_number = ?';
    // let params = req.body;
    //console.log(params);
    connection.query(sql,[user, req.params.account_number],(err,results,fields)=>{
        if(err)throw err;
        res.json(results);
    });
});