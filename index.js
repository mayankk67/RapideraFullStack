var express=require('express');
var sigup= express.Router();
var sql=require('mssql');
var bodyParser=require('body-parser');
var cors=require('cors');
sigup.use(bodyParser.json());
sigup.use(cors());

var cred={
    user:'mayankk',
    password:'Bolt',
    server:'LAPTOP-DF9DH0NC\\MAYANK',
    database:'DXPDSAGMART'
}

sigup.post('/',(req,res)=>{
    console.log('API called');
    var {username,number,password,email}=req.body;
    sql.connect(cred, (err)=>{
        if(err)
            console.log(err);
        var qwery= 'insert into Credentials values('+'\''+username+'\''+','+'\''+password+'\''+','+'\''+number+'\''+',''\''+email+'\''+')';
        console.log(qwery);
        var request=new sql.Request();
        request.query(qwery,(err,da)=>{
            if(err)
                console.log(err)
            console.log('query executed');
            res.send('1 row added');
            sql.close();
        });
    });
});

sigup.listen(9000,()=>{
    console.log('API started listening');
})