import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import './share.css'

const Share = () => {
    const navigate = useNavigate()
    const [shareList, setShareList] = useState([])
    const [url, setUrl] = useState('')
    useEffect(async () => {
        const res = await axios.get('http://localhost:3001/getShare')
        console.log(res)
        console.log(res.data[0].pic.toString('utf-8'))
        const newRes = res.data.map((i,idx)=>{
            const blob = new Blob([i.pic],{type:"img/jpg"})
            const imageUrl = (window.URL || window.webkitURL).createObjectURL(blob);
            // const test1 = document.getElementById(`test1`)
            // test1.setAttribute("src",imageUrl)
            // console.log(url,i.pic,imageUrl)
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onload = function(){
                setUrl(reader.result)
                const test2 = document.getElementById(`test2`)
                test2.setAttribute("src",reader.result)
                console.log(reader.result)
            }
            return {...i,pic:imageUrl}
        })
        setShareList(newRes)
    },[])
    useEffect(async ()=>{
        const res = await axios.get('http://localhost:3001/getSharePic',{responseType:'blob'})
        console.log(res)
        
        const blob = new Blob([res.data[0]],{type:"img/jpg"})
        const imageUrl = (window.URL || window.webkitURL).createObjectURL(res.data);
        const test1 = document.getElementById(`test1`)
        test1.setAttribute("src",'Blob:http://localhost:3000/0x5B6F626A65637420426C6F625D')
    },[])
    return(
        <div className='share_container'>
            <div className='createBtn' onClick={()=>navigate('./create')}>发布动态</div>
            <img id='test1'/>
            <img id='test2'/>
            <img id='test3'/>
            <div className='showlist'>
                <ul>
                    {shareList.map((item,idx)=>{
                        return(
                            <li key={item.momentID}>
                                <div className='user'>{item.userID}</div>
                                <div className='moment_text'>{item.text}</div>
                                <div className='moment_pic'><img id={`pic${idx}`} src={item.pic}/></div>
                                <div className='date'>{item.date}</div>
                                <div className='bottom_area'>
                                    <div>like</div>
                                    <div>comment</div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Share