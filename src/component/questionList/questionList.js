import React, { useState } from 'react';
import './questionList.css'
import axios from 'axios'
import searchImg from '../../img/search.png'
import createImg from '../../img/create.png'
import backImg from '../../img/back.png'
import history from '../../service/history';


const QuestionList = props => {
    const [value, setValue] = useState('')
    const [createActive, setCreateActive] = useState(false)
    const [mode, setMode] = useState('')
    const [award, setAward] = useState(0)
    const [question, setQuestion] = useState('')
    const [userInfo, setUserInfo] = useState(props.userInfo)
    const [imageURL, setImageURL] = useState('')

    const QList = () => { 
        const info = [
            {q:"我是谁",a:"33"},  
            {q:"我是谁",a:"黄黄"},
            {q:"hi",a:"33"},
        ]
        return(
            <div>
                <div className="classify_nav">
                    <div className="classify">待回答</div>
                    <div className="classify">已回答</div>
                </div>
                <ul className="list">
                    {
                        info.map(item=>{
                            return(
                                <li>
                                    <h4>问题：{item.q}</h4>
                                    <p>回答：{item.a}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

    const handleSearch = () => {
        console.log(value)
    }

    const getDate = () => {
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}`:date.getMonth()+1
        const day = date.getDate() < 10 ? `0${date.getDate()}`:date.getDate()
        return `${year}-${month}-${day}`
    }

    const randomID = () => {
        const letter = mode === 'normal' ? 'n' : 'a'
        const date = getDate().replace(/-/g,'')
        const random = Math.round(Math.random()*1000)
        return `${letter}${date}${random}`
    }

    const handleInputFile = e => {
        const reader = new FileReader()
        console.log(e)
        if(e.target.files[0].size>1024*1024){
            alert('上传图片大小不能超过1M')
        }else{
            reader.readAsDataURL(e.target.files[0])
            reader.onload = function(){
                setImageURL(reader.result)
            }
        }
    }

    const handleSubmit = async () => {
        const id = randomID()
        const date = getDate()
        if(mode === '' || question === ''){
            alert('请完整填写信息')
        }else{
            try{
                const res = await axios.post('http://localhost:3001/addQuestion',`question=${question}&award=${award}&userID=${userInfo.account}&mode=${mode}&questionID=${id}&date=${date}&pic=${imageURL}&answerNum=0`)
                console.log(res)
                alert(res.data)
                if(res.data === '发布成功'){
                    setCreateActive(false)
                }
            }catch(e){
                console.log(e)
            }
        }
        
    }

    return(
        <div className="q_a_container">
            {
                !createActive && (
                    <>
                        <div className="topArea">
                            <div className="searchArea">
                                <input placeholder="请输入关键字" className="questionInput" onChange={e => {setValue(e.target.value);setAward(0)}} value={value}></input>
                                <img alt="搜索" src={searchImg} className="searchImg" onClick={handleSearch}/>
                            </div>
                            <div className="createBtn" onClick={()=>{if(userInfo.account){setCreateActive(true)}else{alert('请登录')}}}>
                                发起提问
                                <img className="createImg" src={createImg}/>
                            </div>
                        </div>
                    <QList />
                    </>
                )
            }
            {
                createActive && (
                    <>
                        <div className="table">
                            <div className="backBtn" onClick={()=>{setCreateActive(false)}}>
                                <img className="backImg" src={backImg}/>
                                返回
                            </div>
                            <h3>问题</h3>
                            <div className="inputPart">
                            <p>提问方式：
                                <input type="radio" id="normal" name="1" onChange={e => {setMode(e.target.id);setAward(0)}}/>普通
                                <input type="radio" className="mode" id="award" name="1" onChange={e => setMode(e.target.id)}/>
                                    积分
                                    {
                                        mode == 'award' ? 
                                        <span>:<input className="awardInput" onChange={e => setAward(e.target.value)} value={award}/></span>
                                        : ''
                                    }
                            </p>
                            <p>问题描述：<input className="describtionInput" onChange={e => setQuestion(e.target.value)} value={question}/></p>
                            <p>图片：<input accept="image/*" type="file" onChange={handleInputFile}/></p>
                            </div>
                            <div className="submitBtn" onClick={handleSubmit}>
                                提交
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default QuestionList