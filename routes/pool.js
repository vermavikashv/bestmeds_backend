var mysql=require("mysql")

var pool=mysql.createPool({
host:'localhost',
port:3307,
user:'root',
password:'123',
database:'bestmeds',
multipleStatements:true,
connectionLimit:100
})
module.exports=pool