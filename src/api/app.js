const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql')
const bodyParser=require('body-parser');
const multer = require('multer')
const fs = require('fs')
const path = require('path')
app.listen(3001,()=>{console.log('服务启动')})

app.use(cors())
app.use(bodyParser.urlencoded({
	extended:false,
    limit: '50mb'
}));
app.use(bodyParser.json({limit: '50mb'}))
app.use(express.static('public'))

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

const upload = multer({ dest: './public/' })
app.post('/uploadFile',upload.single('avatar'), function(req, res, next){
    console.log(req.file)
    let old = req.file.path 
    let name = req.file.path + path.parse(req.file.originalname).ext 
  
    fs.renameSync(old, name)
    res.json({
      'imgpath':name
    });
  })

app.post('/login',(req,res)=>{
    db.query('SELECT * FROM user WHERE userID = ' + req.body.userID,(e,r)=>{
        console.log(e,r)
        if(r[0]){
            if(r[0].password == req.body.password){
                res.json(['登录成功',r[0]])
            }else{
                res.json(['密码错误'])
            }
        }else{
            res.json(['用户未注册'])
        }
    })
})

app.post('/register',(req,res)=>{
    db.query(`INSERT INTO user (userID, password, username, signDate) VALUES ('${req.body.userID}', '${req.body.password}','${req.body.username}','${req.body.signDate}')`,
    (e,r)=>{
        if(r.data !== ''){
            res.json('注册成功')
        }
        console.log(e,r)
    })
})

app.post('/checkName',(req,res)=>{
    db.query(`SELECT * FROM user WHERE username = '${req.body.username}'`,
        (e,r)=>{
        console.log(e,r)
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
    db.query('SELECT * FROM user WHERE userID = ' + req.body.userID,(e,r)=>{
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
        console.log(e)
        if(r.data !== ''){
            res.json('发布成功')
        }else{
            res.json('发布失败')
        }
    })
    db.query(`UPDATE user SET questionNum=questionNum+1 WHERE userID = '${req.body.userID}'`,
        (e,r)=>{
            console.log(e,r)
        }
    )
})

app.get('/getQuestionList',(req,res)=>{
    db.query('SELECT * FROM question',
    (e,r)=>{
        console.log(e,r)
        res.json(r)
    })
})

app.post('/getQuestionDetail',(req,res)=>{
    db.query(`SELECT * FROM question WHERE questionID = '${req.body.questionID}'`,
    (e,r)=>{
        console.log(e,r)
        res.json(r)
    })
})

app.post('/searchQuestion',(req,res)=>{
    db.query(`SELECT * FROM question WHERE question LIKE '%${req.body.value}%'`,
    (e,r)=>{
        console.log(e,r)
        res.json(r)
    })
})

app.post('/getAnswer',(req,res)=>{
    db.query(`SELECT * FROM answer WHERE questionID = '${req.body.questionID}'`,
        (e,r)=>{
            console.log(e,r)
            res.json(r)
        }
    )
})

app.post('/addAnswer',(req,res)=>{
    db.query(`INSERT INTO answer VALUES ('${req.body.questionID}','${req.body.answer}','${req.body.userID}','${req.body.answerID}','${req.body.date}','${req.body.pic}')`,
        (e,r)=>{
            console.log(e,r)
            if(r.data !== ''){
                res.json('发布成功')
            }else{
                res.json('发布失败')
            }
        }
    )
    db.query(`UPDATE question SET answerNum=answerNum+1 WHERE questionID='${req.body.questionID}'`,
        (e,r)=>{
            console.log(e,r)
        }
    )
    db.query(`UPDATE user SET answerNum=answerNum+1 WHERE userID = ${req.body.userID}`,
        (e,r)=>{
            console.log(e,r)
        }
    )
})

app.post('/addShare',(req,res)=>{
    db.query(`INSERT INTO moments VALUES ('${req.body.momentID}','${req.body.text}','${req.body.pic}','${req.body.userID}','${req.body.date}','${req.body.likeNum}','${req.body.commentNum}')`,
        (e,r)=>{
            console.log(e,r)
            if(r.data !== ''){
                res.json('发布成功')
            }else{
                res.json('发布失败')
            }
        }
    )
    db.query(`UPDATE user SET shareNum=shareNum+1 WHERE userID = ${req.body.userID}`,
        (e,r)=>{
            console.log(e,r)
        }
    )
})

app.get('/getShare',(req,res)=>{
    db.query('SELECT * FROM moments',
        (e,r)=>{
            console.log(e,r)
            res.json(r)
        }
    )
})

app.get('/getSharePic',(req,res)=>{
    db.query('SELECT pic FROM moments',
        (e,r)=>{
            console.log(e,r)
            res.json(r)
        }
    )
})

app.get('/getRecipeList',(req,res)=>{
    db.query('SELECT * FROM recipe',
        (e,r)=>{
            console.log(e,r)
            res.json(r)
        }
    )
})

app.post('/getSearchRecipe',(req,res)=>{
    db.query(`SELECT * FROM recipe WHERE recipeName like '%${req.body.recipeName}%'`,
        (e,r)=>{
            console.log(e,r)
            res.json(r)
        }
    )
})

app.post('/addLike',(req,res)=>{
    db.query(`UPDATE moments SET likeNum=likeNum+1 WHERE momentID = '${req.body.momentID}'`,
        (e,r)=>{
            console.log(e,r)
            res.json(r)
        }
    )
    db.query(`UPDATE user SET likeNum=likeNum+1 WHERE userID = '${req.body.userID}'`,
        (e,r)=>{
            console.log(e,r)
        }
    )
    db.query(`INSERT INTO likes VALUES ('${req.body.userID}','${req.body.momentID}','${req.body.likeID}')`,
        (e,r)=>{
            console.log(e,r)
        }
    )
})

app.post('/cancelLike',(req,res)=>{
    db.query(`UPDATE moments SET likeNum=likeNum-1 WHERE momentID = '${req.body.momentID}'`,
        (e,r)=>{
            console.log(e,r)
            res.json(r)
        }
    )
    db.query(`UPDATE user SET likeNum=likeNum-1 WHERE userID = '${req.body.userID}'`,
        (e,r)=>{
            console.log(e,r)
        }
    )
    db.query(`DELETE FROM likes WHERE momentID = '${req.body.momentID}' AND userID = '${req.body.userID}'`,
        (e,r)=>{
            console.log(e,r)
        }
    )
})

app.post('/getLikeList',(req,res)=>{
    db.query(`SELECT momentID FROM likes WHERE userID = '${req.body.userID}'`,
        (e,r)=>{
            console.log(e,r)
            res.json(r)
        }
    )
})

app.post('/getComment',(req,res)=>{
    db.query(`SELECT * FROM comment WHERE momentID = '${req.body.momentID}'`,
        (e,r)=>{
            console.log(e,r)
            res.json(r)
        }
    )
})

app.post('/addComment',(req,res)=>{
    db.query(`INSERT INTO comment VALUES ('${req.body.commentID}','${req.body.momentID}','${req.body.commentDetail}','${req.body.commenter}','${req.body.date}')`,
        (e,r)=>{
            console.log(e,r)
            res.json(r)
        }
    )
    db.query(`UPDATE moments SET commentNum=commentNum+1 WHERE momentID = '${req.body.momentID}'`,
        (e,r)=>{
            console.log(e,r)
        }
    )
})

app.post('/updateUserinfo',(req,res)=>{
    db.query(`SELECT * FROM user WHERE userID = '${req.body.userID}'`,
        (e,r)=>{
            console.log(e,r)
            res.json(r)
        }
    )
})

app.post('/updateSignDate',(req,res)=>{
    db.query(`UPDATE user SET signDate = '${req.body.signDate}',signDay=0 WHERE userID = '${req.body.userID}'`,
        (e,r)=>{
            console.log(e,r)
            res.json(r)
    })
})

app.post('/updateSignInfo',(req,res)=>{
    db.query(`UPDATE user SET award=award+${req.body.award},signDay=signDay+1,signDate='${req.body.signDate}' WHERE userID = '${req.body.userID}'`,
        (e,r)=>{
            console.log(e,r)
            res.json(r)
        }
    )
})

app.get('/getAward',(req,res)=>{
    db.query('SELECT * FROM awardmall',
        (e,r)=>{
            console.log(e,r)
            res.json(r)
        }
    )
})

