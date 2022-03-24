import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './addQuestion.css'
import axios from 'axios'
import history from '../../service/history';
import backImg from '../../img/back.png'

const AddQuestion = props => {
    const [mode, setMode] = useState('')
    const [award, setAward] = useState(0)
    const [question, setQuestion] = useState('')
    const [userInfo, setUserInfo] = useState(props.userInfo)
    const [imageURL, setImageURL] = useState('')
    const navigate = useNavigate()

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
                    navigate('/questionlist')
                }
            }catch(e){
                console.log(e)
            }
        }
        
    }

    return(
        <div className="table">
            <div className="backBtn" onClick={()=>{navigate('/questionlist')}}>
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
    )
}

export default AddQuestion