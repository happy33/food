import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './addQuestion.css'
import '../../common/common.css'
import { getDate, randomID, handleInputFile, uploadFile} from '../../common/common.js'
import axios from 'axios'
import history from '../../service/history';
import backImg from '../../img/back.png'
import { useEffect } from 'react/cjs/react.production.min';

const AddQuestion = props => {
    const navigate = useNavigate()
    const location = useLocation()
    const [mode, setMode] = useState('')
    const [award, setAward] = useState(0)
    const [question, setQuestion] = useState('')
    const userInfo = location.state.data
    const [file, setFile] = useState(null)

    const handleSubmit = async () => {
        if(mode === '' || question === ''){
            alert('请完整填写信息')
        }else if(award > userInfo.award){
            alert(`你可用积分为${userInfo.award},不可超出范围`)
        }else{
            if(award === 0){
                setMode('normal')
            }
            if(file !== null){
                try{
                    const url = await axios({
                        url: 'http://localhost:3001/uploadFile',
                        method: 'POST',
                        Headers: {
                          "Content-Type": "multipart/form-data",
                        },
                        data: file,
                      }).then(async(r)=>{
                        const imgURL = r.data.imgpath.replace(/\\/g,"\/")
                        console.log(imgURL)
                        const res = await axios.post('http://localhost:3001/addQuestion',`question=${question}&award=${award}&userID=${userInfo.userID}&mode=${mode}&questionID=${randomID('q')}&date=${getDate()}&pic=${imgURL}&answerNum=0`)
                        console.log(res)
                        alert(res.data)
                        if(res.data === '发布成功'){
                            navigate('/questionlist')
                        }
                      })}catch(e){
                console.log(e)
             }
            }else{
                const res = await axios.post('http://localhost:3001/addQuestion',`question=${question}&award=${award}&userID=${userInfo.userID}&mode=${mode}&questionID=${randomID('q')}&date=${getDate()}&pic=&answerNum=0`)
                console.log(res)
                alert(res.data)
                if(res.data === '发布成功'){
                    navigate('/questionlist')
                }
            }
            
                
            
        }
        
    }

    return(
        <div className="big_container">
            <div className="backToListBtn" onClick={()=>{navigate('/questionlist')}}>
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
                <p>图片：<input accept="image/*" type="file" onChange={e=>{setFile(handleInputFile(e))}}/></p>
            </div>
            <div className="submitBtn" onClick={handleSubmit}>
                提交
            </div>
        </div>
    )
}

export default AddQuestion