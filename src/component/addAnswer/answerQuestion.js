import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './answerQuestion.css'
import '../../common/common.css'
import { getDate, randomID, handleInputFile} from '../../common/common.js'

const AnswerQuestion = props => {
    const location = useLocation()
    const questionInfo = location.state.data
    const questionID = questionInfo.questionID
    const userInfo = props.userInfo
    const [value, setValue] = useState('')
    const [file, setFile] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if(file === null){
            const res = await axios.post('http://localhost:3001/addAnswer',`questionID=${questionID}&answerID=${randomID('a')}&answer=${value}&userID=${userInfo.userID}&date=${getDate()}&pic=`)
            console.log(res.data)
            if(res.data === '发布成功'){
                navigate('/questionlist/questiondetail',{state:{questionID:questionID,data:questionInfo}})
            }
        }else{
            try{
                await axios({
                    url: 'http://localhost:3001/uploadFile',
                    method: 'POST',
                    Headers: {
                      "Content-Type": "multipart/form-data",
                    },
                    data: file,
                  }).then(async(r)=>{
                    const imgURL = r.data.imgpath.replace(/\\/g,"\/")
                    console.log(imgURL)
                    const res = await axios.post('http://localhost:3001/addAnswer',`questionID=${questionID}&answerID=${randomID('a')}&answer=${value}&userID=${userInfo.userID}&date=${getDate()}&pic=${imgURL}`)
                    console.log(res.data)
                    if(res.data === '发布成功'){
                        navigate('/questionlist/questiondetail',{state:{questionID:questionID,data:questionInfo}})
                    }
                })}catch(e){
            console.log(e)
            }
        }
    }

    return(
        <div className='big_container'>
            <div className='backToListBtn' onClick={()=>{navigate('./../',{state:{questionID:questionID,data:questionInfo}})}}>返回</div>
            <h3>回答</h3>
            <div className="inputPart">
                <p>答案：<input className="describtionInput" type="text" placeholder='请输入回答' value={value} onChange={e=>setValue(e.target.value)}/></p>
                <p>图片：<input type="file" accept="image/*" onChange={e=>{setFile(handleInputFile(e))}}/></p>
            </div>
            <div className='submitBtn' onClick={handleSubmit}>提交</div>
        </div>
    )
}

export default AnswerQuestion