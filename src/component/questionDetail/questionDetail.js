import React, { useState,useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './questionDetail.css'
import '../../common/common.css'
import axios from 'axios'

const QuestionDetail = props => {
    const location = useLocation()
    const navigate = useNavigate()
    const questionID = location.state.questionID
    const [ questionInfo, setQuestionInfo ] = useState(location.state.data)
    const [ answer, setAnswer ] = useState([])
    useEffect(async()=>{
        const res = await axios.post('http://localhost:3001/getQuestionDetail',`questionID=${questionID}`)
        setQuestionInfo(res.data[0])
    },[])
    useEffect(async()=>{
        const res = await axios.post('http://localhost:3001/getAnswer',`questionID=${questionID}`)
        setAnswer(res.data)
    },[])
    const jumpToAnswerPage = () => {
        if(props.userInfo.userID){
            navigate('./answerquestion',{state:{data:questionInfo,userInfo:props.userInfo}})
        }else{
            alert('请登录')
        }
    }
    return(
        <div className='big_container'>
            <div className='backToListBtn' onClick={()=>{navigate('./../')}}>返回</div>
            <div className='questionArea'>
                <div className='question'>
                    问题描述：{questionInfo.question}
                    <div className='img_box'>
                        <img src={questionInfo.pic.slice(7)}/>
                    </div>
                </div>
                <div className='top_area'>
                    <p className='user'>提问者：{questionInfo.userID}</p>
                    <p className='date'>{questionInfo.date.slice(0,10)}</p>
                </div>
            </div>
            <div className='answerArea'>
                {
                    questionInfo.answerNum == 0 ?
                    <>
                        <p className='no_answer'>暂未有人回答</p>
                        <div className='answerBtn' onClick={jumpToAnswerPage}>我来回答</div>
                    </>
                    :
                    <>
                        <div className='title_area'>
                            回答
                            <div className='answerBtn_2' onClick={jumpToAnswerPage}>我来回答</div>
                        </div>
                        {answer.map(item=>{
                            return(
                                <div className='answer_box' key={item.answerID}>
                                    <div className='top_area'>
                                        <p className='user'>用户{item.questionID}</p>
                                        <p className='date'>{item.date.slice(0,10)}</p>
                                    </div>
                                    <div className='answer'>
                                        {item.answer}
                                        {item.pic !== '' && <div className='img_box'>
                                            <img src={item.pic.slice(7)}></img>
                                        </div>}
                                    </div>
                                    
                                </div>
                            )
                        })}
                    </>
                    
                }
            </div>
            
        </div>
    )
}

export default QuestionDetail