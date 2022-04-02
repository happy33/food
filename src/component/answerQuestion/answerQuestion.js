import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const AnswerQuestion = props => {
    const location = useLocation()
    const questionID = location.state.data
    const [userInfo, setUserInfo] = useState(props.userInfo)
    const [value, setValue] = useState('')
    const [imageURL , setImageURL] = useState('')
    const navigate = useNavigate()
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

    const getDate = () => {
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}`:date.getMonth()+1
        const day = date.getDate() < 10 ? `0${date.getDate()}`:date.getDate()
        return `${year}-${month}-${day}`
    }

    const randomID = () => {
        const letter = 'ans'
        const date = getDate().replace(/-/g,'')
        const random = Math.round(Math.random()*1000)
        return `${letter}${date}${random}`
    }

    const handleSubmit = async () => {
        console.log(value,imageURL,userInfo.account,getDate(),randomID())
        const res = await axios.post('http://localhost:3001/addAnswer',`questionID=${questionID}&answerID=${randomID()}&answer=${value}&userID=${userInfo.account}&date=${getDate()}&pic=${imageURL}`)
        console.log(res.data)
        if(res.data === '发布成功'){
            navigate('/questionlist')
        }
    }

    return(
        <div className='answer_question_container'>
            <p>回答</p>
            <p>答案：<input type="text" placeholder='请输入回答' value={value} onChange={e=>setValue(e.target.value)}/></p>
            <p>图片：<input type="file" accept="image/*" onChange={handleInputFile}/></p>
            <div className='submitBtn' onClick={handleSubmit}>提交</div>
        </div>
    )
}

export default AnswerQuestion