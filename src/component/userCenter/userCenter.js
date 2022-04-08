import React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './userCenter.css';
import '../../common/common.css'
import { getDate, nextDate } from '../../common/common.js'
import finishIcon from '../../img/finish.png'
import todayIcon from '../../img/today.png'
import unfinishIcon from '../../img/unfinish.png'

const UserCenter = props => {
    const navigate = useNavigate()
    const [ userInfo, setUserInfo ] = useState(props.userInfo)
    const changeStateMethod = props.changeStateMethod
    const days = [1,2,3,4,5,6,7]
    const today = getDate()
    const tomorrow = nextDate()
    useEffect(async ()=>{
        if(userInfo.signDate.slice(0,10) < today){
            const res = await axios.post('http://localhost:3001/updateSignDate',`userID=${userInfo.userID}&signDate=${getDate()}`)
            console.log(res)
        }
    })
    useEffect(async()=>{
        console.log(userInfo.userID)
        if(props.userInfo.userID){
            const res = await axios.post('http://localhost:3001/updateUserinfo',`userID=${userInfo.userID}`)
            setUserInfo(res.data[0])
            changeStateMethod(true,res.data[0])
        }
    },[])
    useEffect(()=>{
        if(props.loginState === false){
            navigate('/login')
        }
    },[props.loginState])
    

    const handleSign = async () => {
        const award = 2*(userInfo.signDay+1)
        const res = await axios.post('http://localhost:3001/updateSignInfo',`award=${award}&signDate=${tomorrow}&userID=${userInfo.userID}`)
        console.log(res)
        setUserInfo({...userInfo,signDay: userInfo.signDay+1,signDate: tomorrow})
    }

    return(
        <div className='big_container'>
            <div className='info_box'>
                <div className='first_line'>
                    用户{userInfo.username}，欢迎你~
                </div>
                <div className='second_line'>
                    <div>
                        <p>积分</p>
                        <p>{userInfo.award}</p>
                    </div>
                    <div>
                        <p>我赞过的</p>
                        <p>{userInfo.likeNum}</p>
                    </div>
                    <div>
                        <p>我的提问</p>
                        <p>{userInfo.questionNum}</p>
                    </div>
                    <div>
                        <p>我的回答</p>
                        <p>{userInfo.answerNum}</p>
                    </div>
                </div>
            </div>
            <div className='sign'>
                <p className='headtitle'>每日签到</p>
                <div className='progressBar'>
                    <div className='icons'>
                        {
                            days.map((i)=>{
                                var img = ''
                                if(userInfo.signDate.slice(0,10) === today && userInfo.signDay+1 === i){
                                    img = todayIcon
                                }else if(userInfo.signDay >= i){
                                    img = finishIcon
                                }else if(userInfo.signDay < i ){
                                    img = unfinishIcon
                                }
                                return(
                                        <div className='icon_box' key={`day${i}`}>
                                            <img className='bar_icon' src={img}/>
                                            <p>第{i}天</p>
                                            {img === todayIcon && <div className='signBtn' onClick={handleSign}>签到</div>}
                                        </div>
                                    )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCenter