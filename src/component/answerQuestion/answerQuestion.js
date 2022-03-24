import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const AnswerQuestion = props => {
    const location = useLocation()
    const questionID = location.state.data
    const [userInfo, setUserInfo] = useState(props.userInfo)
    const [value, setValue] = useState('')
    console.log(questionID,userInfo)
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
    return(
        <div>
            <input type="text" placeholder='请输入回答' value={value} onChange={e=>setValue(e.target.value)}/>
            <input type="file" accept="image/*" onChange={handle}/>
        </div>
    )
}

export default AnswerQuestion