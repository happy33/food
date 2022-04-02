import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './addShare.css'

const AddShare = props => {
    const userInfo = props.userInfo
    const [inputText, setInputText] = useState('')
    const [imageURL, setImageURL] = useState({})
    const navigate = useNavigate()
    const handleInputFile = e => {
        const reader = new FileReader()
        if(e.target.files[0].size>1024*1024){
            alert('上传图片大小不能超过1M')
        }else{
            reader.readAsDataURL(e.target.files[0])
            reader.onload = function(){
                const blob = new Blob([reader.result],{type:"img/jpg"})
                setImageURL(blob)
            }
        }
    }
    useEffect(()=>{
        const pic = document.getElementById('showPic')
        pic.setAttribute("src",imageURL)
    },[imageURL])
    const getDate = () => {
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}`:date.getMonth()+1
        const day = date.getDate() < 10 ? `0${date.getDate()}`:date.getDate()
        return `${year}-${month}-${day}`
    }
    const randomID = () => {
        const letter = 's'
        const date = getDate().replace(/-/g,'')
        const random = Math.round(Math.random()*1000)
        return `${letter}${date}${random}`
    }
    const handleSubmit = async () =>{
        console.log(userInfo,imageURL,inputText,getDate(),randomID())
        const res = await axios.post('http://localhost:3001/addShare',`momentID=${randomID()}&text=${inputText}&pic=${imageURL}&userID=${userInfo.account}&date=${getDate()}&likeNum=0&commentNum=0`)
        console.log(res)
        if(res.data === '发布成功'){
            alert('发布成功')
            navigate('./../')
        }
    }
    return(
        <div className='addshare_container'>
            <input type="text" value={inputText} onChange={e=>setInputText(e.target.value)} placeholder='请输入分享内容'/>
            <input type="file" onChange={handleInputFile}/>
            <img id="showPic"/>
            <div className='submitBtn' onClick={handleSubmit}>发布</div>
        </div>
        
    )
}

export default AddShare
