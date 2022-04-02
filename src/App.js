import { Routes, Route, BrowserRouter as Router, Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import './App.css';
import titlePic from './img/titlepic.png'
import QuestionList from './component/questionList/questionList';
import AddQuestion from './component/addQuestion/addQuestion';
import SmallLogin from './component/smallLogin/smallLogin';
import Login from './component/login/login';
import Share from './component/share/share';
import QuestionDetail from './component/questionDetail/questionDetail';
import AnswerQuestion from './component/answerQuestion/answerQuestion';
import Recipe from './component/recipe/recipe';
import Teach from './component/teach/teach';
import AddShare from './component/addShare/addShare';
import RecipeDetail from './component/recipeDetail/recipeDetail';

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

function App() {
  const [loginState, setLoginState] = useState(false)
  const [userInfo, setUserInfo] = useState({})
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
        <SmallLogin loginState={loginState} userInfo={userInfo}/>
        <div className="showArea">
          <Routes>
            <Route path="/" element={<Recipe/>}></Route>
            <Route path="/recipelist" element={<Recipe/>}></Route>
            <Route path="/recipelist/recipedetail" element={<RecipeDetail/>}></Route>
            <Route path="/teachclass" element={<Teach/>}></Route>
            <Route path="/questionlist" element={<QuestionList userInfo={userInfo}/>}></Route>
            <Route path='/questionlist/questiondetail' element={<QuestionDetail/>}></Route>
            <Route path='/questionlist/questiondetail/answerquestion' element={<AnswerQuestion userInfo={userInfo}/>}></Route>
            <Route path="/createquestion" element={<AddQuestion userInfo={userInfo}/>}></Route>
            <Route path="/share" element={<Share/>}></Route>
            <Route path="/share/create" element={<AddShare userInfo={userInfo}/>}></Route>
            <Route path="/login" element={<Login changeStateMethod={loginStateChange}/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
