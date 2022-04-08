import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import './shareDetail.css'
import '../../common/common.css'
import { getDate, randomID } from '../../common/common.js'
import tick from '../../img/tick.png'

const ShareDetail = props => {
    const location = useLocation()
    const navigate = useNavigate()
    const moment = location.state.data
    const momentID = moment.momentID
    const userInfo = props.userInfo
    const [ change, setChange] = useState(0)
    const [ comment, setComment ] = useState([])
    const [ inputComment, setInputComment] = useState('')
    const ele = useRef(null)

    useEffect(()=>{
        ele.current.focus()
    },[])

    useEffect(async()=>{
        const res = await axios.post('http://localhost:3001/getComment',`momentID=${momentID}`)
        setComment(res.data)
    },[change])

    const handleSubmit = async () => {
        if(props.userInfo.userID){
            if(inputComment === ''){
                alert('评论不能为空')
            }else{
                const res = await axios.post('http://localhost:3001/addComment',`commentDetail=${inputComment}&commenter=${userInfo.userID}&momentID=${momentID}&date=${getDate()}&commentID=${randomID()}`)
                console.log(res)
                setInputComment('')
                setChange(change+1)
            }
        }else{
            alert('请登录')
        }
    }

    return(
        <div className='big_container'>
            <div className='back_sharelist' onClick={()=>navigate('./../')}>返回</div>
            <div className='share_area'>
                <div className='top_area'>
                    <div className='user'>用户{moment.userID}</div>
                </div>
                <div className='content'>
                    {moment.text}
                    {moment.pic !== null && <div className='moment_pic'><img src={moment.pic.slice(7)}/></div>}
                </div>
                <div className='date_0'>发布于{moment.date}</div>
            </div>
            <div className='comment_area'>
                <p className='comment_title'>评论区</p>
                <div className='comment_list'>
                    {comment.length === 0  
                        ? <p>暂未有人评论，快来抢沙发吧！</p>
                        : <div>
                            {comment.map(item=>{
                                return(
                                    <div className='comment_box' key={item.commentID}>
                                        <div className='top_area'>
                                            <p className='user'>用户{item.commenter}</p>
                                            <p className='date'>{item.date.slice(0,10)}</p>
                                        </div>
                                        <p className='comment'>{item.commentDetail}</p>
                                    </div>
                                )
                            })}
                        </div>
                    }
                    <div className='input_area'>
                        <input type="text" placeholder='请输入评论' ref={ele} value={inputComment} onChange={e=>setInputComment(e.target.value)}/>
                        <div className='submit_comment_btn' onClick={handleSubmit}>
                            <img src={tick}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShareDetail