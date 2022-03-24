import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './questionList.css'
import axios from 'axios'
import searchImg from '../../img/search.png'
import createImg from '../../img/create.png'


const QuestionList = props => {
    const [value, setValue] = useState('')
    const [userInfo, setUserInfo] = useState(props.userInfo)
    const [qlist, setQlist] = useState([])
    const [searchList, setSearchList] = useState([])
    const [showList, setShowList] = useState(qlist)
    const navigate = useNavigate();
    const m = useRef(null)

    useEffect(async ()=>{
        const info = await axios.get('http://localhost:3001/getQuestionList')  
        setQlist(info.data)
        setShowList(info.data)
    },[])

    useEffect(()=>{
        if(searchList.length !== 0){
            setShowList(searchList)
        }else{
            setShowList(qlist)
        }
    },[searchList])

    const QList = () => { 
        return(
            <div>
                <div className="classify_nav">
                    <div className="classify">待回答</div>
                    <div className="classify">已回答</div>
                </div>
                <ul className="list">
                    {
                        showList.map(item=>{
                            return(
                                <li key={item.questionID}  onClick={()=>{if(userInfo.account){navigate('./questiondetail',{state:{data:item}})}else{alert('请登录')}}}>
                                    <div className='qbox'>
                                        <h4>问题：{item.question}</h4>
                                        <p>{item.date.slice(0,10)}</p>
                                    </div>
                                    {
                                        item.answerNum == 0 ? <p>暂未有人回答</p> : <p>已有{item.answerNum}个回答</p>
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

    const handleSearch = async () => {
        if(value == ''){
            setSearchList([])
        }else{
            try{
                const res = await axios.post('http://localhost:3001/searchQuestion',`value=${value}`)
                setSearchList(res.data)
                if(res.data.length == 0){
                    alert("未发现相关问题")
                    history.push('/questionlist/createquestion')
                }
            }catch(e){
                console.log(e)
            }
        }
        
    }

    return(
        <div className="q_a_container">
            <div className="topArea">
                <div className="searchArea">
                    <input type="text" placeholder="请输入关键字" className="questionInput" onChange={e => {setValue(e.target.value)}} value={value}></input>
                    <img alt="搜索" src={searchImg} className="searchImg" onClick={handleSearch}/>
                </div>
                <div className="createBtn" onClick={()=>{if(userInfo.account){navigate('/createquestion')}else{alert('请登录')}}}>
                    发起提问
                    <img className="createImg" src={createImg}/>
                </div>
            </div>
            <QList />
        </div>
    )
}

export default QuestionList