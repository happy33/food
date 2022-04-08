import React, { useEffect } from 'react';
import { useState } from 'react'
import login from '../../img/login.png'
import history from '../../service/history';
import './login.css';
import '../../common/common.css'
import { getDate } from '../../common/common.js'
import axios from 'axios';

const Login = props => {
    const [loginTab, setLoginTab] = useState('focus')
    const [userID,setuserID] = useState('')
    const [password,setPassword] = useState('')
    const [registerTab, setRegisterTab] = useState('')
    const [phone, setPhone] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [warning, setWarning] = useState('')
    const [username, setUsername] = useState('')
    const [checkName, setcheckName] = useState('')
    const [username_text, setUsername_text] = useState('')
    
    useEffect(async () => {
        try{
            if(username !== ''){
                const res = await axios.post('http://localhost:3001/checkName',`username=${username}`)
                setcheckName(res.data)
                if(res.data == '该用户名可用'){
                    setUsername_text('usable')
                }else{
                    setUsername_text('unusable')   
                }
            }else{
                setcheckName('')
            }
        }catch(e){
            console.log(e)
        }
    },[username])

    useEffect(async () => {
        try{
            if(phone.length == 11){
                const res = await axios.post('http://localhost:3001/checkPhone',`userID=${phone}`)
                setWarning(res.data)
            }else{
                setWarning('')
            }
        }catch(e){
            console.log(e)
        }
    },[phone])

    const handleLogin = async () => {
        try{
            const res = await axios.post('http://localhost:3001/login',`userID=${userID}&password=${password}`)
            alert(res.data[0])
            if(res.data[0] == '登录成功'){
                props.changeStateMethod(true,res.data[1])
                history.go(-1)
            }
        }catch(e){
            console.log(e)
        }
    }

    const handleRegister = async() => {
        if(phone.length !== 11 || phone == ''){
            setWarning('请输入正确的手机号!')
        }else if(newPassword !== confirmPassword || newPassword == '' || confirmPassword == ''){
            setWarning('两次输入的密码不一致!')
        }else if(username == ''){
            setWarning('用户名不能为空')
        }else if(warning !== '该手机号已被注册'){
            setWarning('')
        }
        if(warning == '' && checkName == '该用户名可用'){
            const res = await axios.post('http://localhost:3001/register',`userID=${phone}&password=${confirmPassword}&username=${username}&signDate=${getDate()}`)
            console.log(res)
            if(res.data === '注册成功'){
                alert('注册成功')
            }
        }
    }

    return(
        <div className='big_container loginPage'>
            <div className='left'>
                <img className='loginPic' src={login}/>
            </div>
            <div className='right'>
                <div className='top'>
                    <div className={loginTab} onClick={() => {setLoginTab('focus');setRegisterTab('')}}>登录</div>
                    <div className={registerTab} onClick={() => {setLoginTab('');setRegisterTab('focus')}}>注册</div>
                </div>
                {loginTab == 'focus' &&(
                    <div className='inputArea'>
                        <p className='inputText'>账号：<input value={userID} placeholder='请输入手机号码' onChange={e => {setuserID(e.target.value)}}/></p>
                        <p className='inputText'>密码：<input type='password' placeholder='请输入密码' value={password} onChange={e =>{setPassword(e.target.value)}}/></p>
                        <div className='submitBtn' onClick={handleLogin}>登录</div>
                    </div>
                )}
                {registerTab == 'focus' &&(
                    <div className='inputArea'>
                        <p className='inputText'>手机号码：<input value={phone} placeholder='请输入手机号码' onChange={e => {setPhone(e.target.value)}}/></p>
                        <p className='inputText'>密码：<input type='password' placeholder='请输入密码' value={newPassword} onChange={e =>{setNewPassword(e.target.value)}}/></p>
                        <p className='inputText'>确认密码：<input type='password' placeholder='请再次输入密码' value={confirmPassword} onChange={e =>{setConfirmPassword(e.target.value)}}/></p>
                        <p className='inputText'>用户名：<input value={username} placeholder='请输入用户名' onChange={e => {setUsername(e.target.value)}}/>
                            <span className={username_text}>{checkName}</span>
                        </p>
                        {<p className='warning'>{warning}</p>}
                        <div className='submitBtn' onClick={handleRegister}>注册</div>
                    </div>
                )}
                
            </div>
        </div>
    )
}

export default Login