import React, { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './questionDetail.css'
import axios from 'axios'

const QuestionDetail = () => {
    const location = useLocation()
    const questionInfo = location.state.data
    const navigate = useNavigate()
    const jumpToAnswerPage = () => {
        navigate('./answerquestion',{state:{data:questionInfo.questionID}})
    }
    return(
        <div className='question_detail_container'>
            <div className='questionArea'>
                <p>问题：{questionInfo.question}</p>
                <p>提问者：{questionInfo.userID}</p>
                <p>提问时间：{questionInfo.date.slice(0,10)}</p>
            </div>
            <div className='answerArea'>
                {
                    questionInfo.answerNum == 0 ?
                    <>
                        <p>暂未有人回答</p>
                        <div className='answerBtn' onClick={jumpToAnswerPage}>我来回答</div>
                    </>
                    :
                    <p>以下为回答</p>
                }
            </div>
            
        </div>
    )
}

export default QuestionDetail