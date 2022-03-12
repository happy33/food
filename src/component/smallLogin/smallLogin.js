import React from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './smallLogin.css';

const SmallLogin = props => {
    const loginState = props.loginState
    const userInfo = props.userInfo
    return(
        <div className='container'>
            <div className='userPic'>
                <img alt='头像'/>
            </div>
            {
                loginState == false ? 
                (
                    <>
                        <div>用户未登录</div>
                        <Link to='/login'><div className='loginBtn'>登录/注册</div></Link>
                    </>
                )
                :(
                    <>
                        <div>{userInfo.username}</div>
                        <div>个人中心</div>
                    </>
                )
            }
        </div>
    )
}

export default SmallLogin