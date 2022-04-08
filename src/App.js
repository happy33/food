import { Routes, Route, BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import titlePic from './img/titlepic2.png'
import QuestionList from './component/questionList/questionList';
import AddQuestion from './component/addQuestion/addQuestion';
import SmallLogin from './component/smallLogin/smallLogin';
import Login from './component/login/login';
import Share from './component/share/share';
import QuestionDetail from './component/questionDetail/questionDetail';
import AnswerQuestion from './component/addAnswer/answerQuestion';
import Recipe from './component/recipe/recipe';
import Teach from './component/teach/teach';
import AddShare from './component/addShare/addShare';
import RecipeDetail from './component/recipeDetail/recipeDetail';
import ShareDetail from './component/shareDetail/shareDetail';
import AwardMall from './component/awardMall/awardmall';
import mall from './img/mall.png'
import UserCenter from './component/userCenter/userCenter';

const Nav = () => {
  const navigate = useNavigate();
  return(
    <div className="nav_area">
      <ul className="nav">
        <li onClick={()=>{navigate("/questionlist")}}>问答互动</li>
        <li onClick={()=>{navigate("/recipelist")}}>烘焙食谱</li>
        <li onClick={()=>{navigate("/teachclass")}}>教学课堂</li>
        <li onClick={()=>{navigate("/share")}}>美食圈子</li>
      </ul>
    </div>
  )
}

const Mallicon = () => {
  const navigate = useNavigate();
  const location = useLocation()
  return(
    <>
      { location.pathname !== '/awardmall' && (
        <div className='mallicon' onClick={()=>{navigate('/awardmall')}}>
          <div className='bg'></div>
          <p>积分商城</p>
        </div>
        )
      }
    </>
    
  )
}

function App() {
  const [loginState, setLoginState] = useState(false)
  const [ userInfo, setUserInfo ] = useState({})
  const loginStateChange = (newState,newUser) => {
    setLoginState(newState)
    setUserInfo(newUser)
  }
  return (
    <Router>
      <div className="App">
        <div className="title">
          <img src={titlePic}/>
        </div>
        <Nav />
        <SmallLogin loginState={loginState} userName={userInfo.username} changeStateMethod={loginStateChange}/>
        <Mallicon/>
        <div className="showArea">
          <Routes>
            <Route path="/" element={<Recipe/>}></Route>
            <Route path="/usercenter" element={<UserCenter loginState={loginState} userInfo={userInfo} changeStateMethod={loginStateChange}/>}></Route>
            <Route path="/recipelist" element={<Recipe/>}></Route>
            <Route path="/recipelist/recipedetail" element={<RecipeDetail/>}></Route>
            <Route path="/teachclass" element={<Teach/>}></Route>
            <Route path="/questionlist" element={<QuestionList userInfo={userInfo}/>}></Route>
            <Route path='/questionlist/questiondetail' element={<QuestionDetail userInfo={userInfo}/>}></Route>
            <Route path='/questionlist/questiondetail/answerquestion' element={<AnswerQuestion userInfo={userInfo}/>}></Route>
            <Route path="/questionlist/createquestion" element={<AddQuestion/>}></Route>
            <Route path="/share" element={<Share userInfo={userInfo}/>}></Route>
            <Route path="/share/sharedetail" element={<ShareDetail userInfo={userInfo}/>}></Route>
            <Route path="/share/create" element={<AddShare userInfo={userInfo}/>}></Route>
            <Route path="/login" element={<Login changeStateMethod={loginStateChange}/>}></Route>
            <Route path="/awardmall" element={<AwardMall userInfo={userInfo}/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
