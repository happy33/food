import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './questionList.css'
import axios from 'axios'
import searchImg from '../../img/search.png'
import createImg from '../../img/create.png'
import history from '../../service/history';


const QuestionList = props => {
    const [value, setValue] = useState('')
    const [userInfo, setUserInfo] = useState(props.userInfo)
    const [qlist, setQlist] = useState([])

    useEffect(async ()=>{
        const info = await axios.get('http://localhost:3001/getQuestionList')  
        console.log(info.data)
        setQlist(info.data)
    },[])

    const QList = () => { 
        return(
            <div>
                <div className="classify_nav">
                    <div className="classify">待回答</div>
                    <div className="classify">已回答</div>
                </div>
                <ul className="list">
                    {
                        qlist.map(item=>{
                            return(
                                <li>
                                    <h4>问题：{item.question}</h4>
                                    {
                                        item.answerNum == 0 && <p>暂未有人回答</p>
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

    const handleSearch = () => {
        console.log(value)
    }

    return(
        <div className="q_a_container">
            <div className="topArea">
                <div className="searchArea">
                    <input placeholder="请输入关键字" className="questionInput" onChange={e => {setValue(e.target.value);setAward(0)}} value={value}></input>
                    <img alt="搜索" src={searchImg} className="searchImg" onClick={handleSearch}/>
                </div>
                <div className="createBtn">
                    <Link to='/questionlist/createquestion'>发起提问</Link>
                    <img className="createImg" src={createImg}/>
                </div>
            </div>
            <QList />
        </div>
    )
}

export default QuestionList