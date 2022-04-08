import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import '../../common/common.css'
import './questionList.css'
import axios from 'axios'
import searchImg from '../../img/search.png'
import createImg from '../../img/create.png'



const QuestionList = props => {
    const [value, setValue] = useState('')
    const [userInfo, setUserInfo] = useState(props.userInfo)
    const [qlist, setQlist] = useState([])
    const [searchList, setSearchList] = useState([])
    const [showList, setShowList] = useState([])
    const [answeredList, setAnsweredList] = useState([])
    const [searchAnsweredList, setSearchAnsweredList] = useState('')
    const [unansweredList, setUnansweredList] = useState([])
    const [searchUnansweredList, setSearchUnansweredList] = useState('')
    const [questionType, setQuestionType] = useState('answered')
    const navigate = useNavigate();

    useEffect(async ()=>{
        const info = await axios.get('http://localhost:3001/getQuestionList')  
        setQlist(info.data)
        var an_list = []
        var un_list = []
        info.data.map(i =>{
            if(i.answerNum === 0){
                un_list.push(i)
            }else{
                an_list.push(i)
            }
        })
        setAnsweredList(an_list)
        setUnansweredList(un_list)
        setShowList(an_list)
    },[])

    useEffect(()=>{
        if(searchAnsweredList === '' && searchUnansweredList === ''){
            if(questionType === 'answered'){
                setShowList(answeredList)
            }else{
                setShowList(unansweredList)
            }
        }else{
            if(questionType === 'answered'){
                setShowList(searchAnsweredList)
            }else{
                setShowList(searchUnansweredList)
            }
        }
    },[searchAnsweredList,searchUnansweredList])

    const handleSearch = () => {
        if(value === ''){
            setSearchAnsweredList('')
            setSearchUnansweredList('')
        }else{
            var search_anlist = []
            var search_unlist = []
            qlist.map(i=>{
                if(i.question.search(value) !== -1){
                    if(i.answerNum === 0){
                        search_unlist.push(i)
                    }else{
                        search_anlist.push(i)
                    }
                }
            })
            if(search_anlist.length === 0){
                setSearchAnsweredList('未发现相关问题')
            }else{
                setSearchAnsweredList(search_anlist)
            }
            if(search_unlist.length === 0){
                setSearchUnansweredList('未发现相关问题')
            }else{
                setSearchUnansweredList(search_unlist)
            }
        }
    }

    const switchQuestion = (id) => {
        setQuestionType(id)
        var id2 = ''
        if(id === 'answered'){
            id2 = 'unanswered'
            if(searchAnsweredList.length !== 0 || searchUnansweredList.length !== 0){
                setShowList(searchAnsweredList)
            }else{
                setShowList(answeredList)
            }
        }else{
            id2 = 'answered'
            if(searchAnsweredList.length !== 0 || searchUnansweredList.length !== 0){
                setShowList(searchUnansweredList)
            }else{
                setShowList(unansweredList)
            }
        }
        const ele = document.getElementById(id)
        const ele2 = document.getElementById(id2)
        ele.classList.add("classify_active")
        ele2.classList.remove("classify_active")
    }

    return(
        <div className="big_container">
            <div className="topArea">
                <div className="searchQuestion">
                    <input type="text" placeholder="请输入关键字" className="questionInput" onChange={e => {setValue(e.target.value)}} value={value}></input>
                    <img alt="搜索" src={searchImg} className="searchImg" onClick={handleSearch}/>
                </div>
                <div className="createQuestionBtn" onClick={()=>{if(props.userInfo.userID){navigate('/questionlist/createquestion',{state:{data:props.userInfo}})}else{alert('请登录')}}}>
                    发起提问
                    <img className="createImg" src={createImg}/>
                </div>
            </div>
            <div className='question_list'>
                <div className="classify_nav">
                    <div className="classify classify_active" id="answered" onClick={()=>{switchQuestion('answered')}}>已回答</div>
                    <div className="classify" id="unanswered" onClick={()=>{switchQuestion('unanswered')}}>待回答</div>
                </div>
                <ul className="list">
                    { showList instanceof Array ?
                        showList.map(item=>{
                            return(
                                <li key={item.questionID}  onClick={()=>{navigate('./questiondetail',{state:{questionID:item.questionID,data:item,userInfo:props.userInfo}})}}>
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
                        :<p>{showList}</p>
                    }
                </ul>
            </div>
        </div>
    )
}

export default QuestionList