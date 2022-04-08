import React from 'react';
import { useNavigate } from 'react-router-dom'
import './smallLogin.css';

const SmallLogin = props => {
    const loginState = props.loginState
    const userName = props.userName
    const navigate = useNavigate()
    return(
        <div className='container'>
            {
                loginState == false ? 
                (
                    <>
                        <div className='unloginText'>未登录</div>
                        <div className='loginBtn' onClick={()=>{navigate('/login')}}>登录/注册</div>
                    </>
                )
                :(
                    <>
                        <div>{userName}</div>
                        <div className='loginBtn' onClick={()=>{navigate('/usercenter')}}>个人中心</div>
                        <div onClick={()=>props.changeStateMethod(false,{})}>退出</div>
                    </>
                )
            }
        </div>
    )
}

export default SmallLogin