const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql')
const bodyParser=require('body-parser');
const { thisExpression } = require('@babel/types')
app.listen(3001,()=>{console.log('服务启动')})

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '123456',
    port : 3306,
    database: 'foodsys'
})

db.connect((err) => {
    if(err){throw err}
    console.log("success")
})

app.use(cors())
app.use(bodyParser.urlencoded({
	extended:false,
	//不使用第三方的qs模块，会使用querystring模块将查询字符串解析为对象
    limit: '50mb'
}));
app.use(bodyParser.json({limit: '50mb'}))

app.post('/login',(req,res)=>{
    db.query('SELECT * FROM user WHERE account = ' + req.body.account,(e,r)=>{
        console.log(r)
        if(r[0]){
            if(r[0].password == req.body.password){
                res.json(['登录成功',r[0].account,r[0].username])
            }else{
                res.json(['密码错误'])
            }
        }else{
            res.json(['用户未注册'])
        }
    })
})

app.post('/register',(req,res)=>{
    db.query(`INSERT INTO user (account , password , username) VALUES (${req.body.account}, ${req.body.password}, ${req.body.username})`,
    (e,r)=>{
        if(r.data !== ''){
            res.json('注册成功')
        }
        res.json(r)
    })
})

app.post('/checkName',(req,res)=>{
    db.query('SELECT * FROM user WHERE username = ' + req.body.username,(e,r)=>{
        if(r){
            if(r.length == 0){
                res.json('该用户名可用')
            }else{
                res.json('该用户名已被注册')
            }
        }
    })
})

app.post('/checkPhone',(req,res)=>{
    db.query('SELECT * FROM user WHERE account = ' + req.body.account,(e,r)=>{
        if(r){
            if(r.length !== 0){
                res.json('该手机号已被注册')
            }else{
                res.json('')
            }
        }
    })
})

app.post('/addQuestion',(req,res)=>{
    db.query(`INSERT INTO question (question,award,userID,mode,questionID,date,pic,answerNum) VALUES ('${req.body.question}',${req.body.award},'${req.body.userID}','${req.body.mode}','${req.body.questionID}','${req.body.date}','${req.body.pic}',0)`,
    (e,r)=>{
        if(r.data !== ''){
            res.json('发布成功')
        }else{
            res.json('发布失败')
        }
        res.json(r)
    })
})

app.get('/getQuestionList',(req,res)=>{
    db.query('SELECT * FROM question',
    (e,r)=>{
        console.log(e,r)
        res.json(r)
    })
    
})