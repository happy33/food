import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import './addShare.css'
import '../../common/common.css'
import { getDate, randomID, handleInputFile} from '../../common/common.js'

const AddShare = props => {
    const navigate = useNavigate()
    const location = useLocation()
    const userInfo = props.userInfo
    const [inputText, setInputText] = useState('')
    const [file, setFile] = useState(null)

    const handleSubmit = async () =>{
        if(props.userInfo.userID){
            if(file === null){
                const res = await axios.post('http://localhost:3001/addShare',`momentID=${randomID('s')}&text=${inputText}&pic=&userID=${userInfo.userID}&date=${getDate()}&likeNum=0&commentNum=0`)
                console.log(res)
                if(res.data === '发布成功'){
                    alert('发布成功')
                    navigate('./../')
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
                        const res = await axios.post('http://localhost:3001/addShare',`momentID=${randomID('s')}&text=${inputText}&pic=${imgURL}&userID=${userInfo.userID}&date=${getDate()}&likeNum=0&commentNum=0`)
                        console.log(res)
                        if(res.data === '发布成功'){
                            alert('发布成功')
                            navigate('./../')
                        }
                    })}catch(e){
                    console.log(e)
                    }
                }
            }else{
                alert('请登录')
            }
        }
    return(
        <div className='big_container'>
            <input type="text" value={inputText} onChange={e=>setInputText(e.target.value)} placeholder='请输入分享内容'/>
            <input type="file" onChange={e=>setFile(handleInputFile(e))}/>
            <div className='submitBtn' onClick={handleSubmit}>发布</div>
        </div>
        
    )
}

export default AddShare
