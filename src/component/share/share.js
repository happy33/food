import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import './share.css'
import '../../common/common.css'
import { randomID } from '../../common/common.js'

const Share = props => {
    const navigate = useNavigate()
    const userInfo = props.userInfo
    const [shareList, setShareList] = useState([])
    const [url, setUrl] = useState('')
    const [clickID, setClickID] = useState([])
    useEffect(async () => {
        const res = await axios.get('http://localhost:3001/getShare')
        setShareList(res.data)
    },[])
    useEffect(async () => {
        if(props.userInfo.userID){
            const res = await axios.post('http://localhost:3001/getLikeList',`userID=${userInfo.userID}`)
            console.log(res.data)
            var momentIDs = []
            res.data.map(i=>{
                momentIDs.push(i.momentID)
            })
            setClickID(momentIDs)
        }else{
            setClickID([])
        }
    },[userInfo])

    const addLike = async (e,momentID) => {
        const num = e.currentTarget.children[0]
        num.innerText = parseInt(num.innerText) + 1
        const res = await axios.post('http://localhost:3001/addLike',`momentID=${momentID}&userID=${userInfo.userID}&likeID=${randomID('l')}`)
        console.log(res)
        setClickID([...clickID, momentID])
    }

    const cancelLike = async (e,momentID) => {
        const num = e.currentTarget.children[0]
        num.innerText = parseInt(num.innerText) - 1
        const res = await axios.post('http://localhost:3001/cancelLike',`momentID=${momentID}&userID=${userInfo.userID}`)
        console.log(res)
        const index = clickID.indexOf(momentID)
        clickID.splice(index,1)
        setClickID([...clickID])
    }

    return(
        <div className='big_container'>
            <div className='createShareBtn' onClick={()=>{if(props.userInfo.userID){navigate('./create')}else{alert('请登录')}}}>发布动态</div>
            <ul className='showlist'>
                {shareList.length === 0?
                <p>暂未发现相关动态</p>
                :shareList.map((item,idx)=>{
                    return(
                        <li className='share_detail' key={item.momentID}>
                            <div className='top_area'>
                                <div className='user'>用户{item.userID}</div>
                                <div className='date'>{item.date}</div>
                            </div>
                            <div className='moment_text'>
                                {item.text}
                                { item.pic !== null && <div className='moment_pic'><img src={item.pic.slice(7)}/></div> }    
                            </div>
                            <div className='bottom_area'>
                                {clickID.includes(item.momentID) ?
                                    <div className='like' onClick={e=>{if(userInfo.userID){cancelLike(e,item.momentID)}else{alert('请登录')}}}>
                                        点赞(<span>{item.likeNum}</span>)
                                    </div>   
                                    :
                                    <div onClick={e=>{if(userInfo.userID){addLike(e,item.momentID)}else{alert('请登录')}}}>
                                        点赞(<span>{item.likeNum}</span>)
                                    </div>
                                }
                                
                                <div onClick={()=>{navigate('./sharedetail',{state:{data:item}})}}>评论({item.commentNum})</div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Share