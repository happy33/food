import { Routes, Route, BrowserRouter as Router, Link } from 'react-router-dom'
import React, { useState } from 'react';
import './App.css';
import titlePic from './img/titlepic.png'
import QuestionList from './component/questionList/questionList';
import SmallLogin from './component/smallLogin/smallLogin';
import Login from './component/login/login';
import Share from './component/share/share';
import { useEffect } from 'react/cjs/react.development';

const Nav = () => {
  return(
    <div className="nav_area">
      <ul className="nav">
        <li><Link to="/questionlist">问答专区</Link></li>
        <li>视频教学</li>
        <li>美食圈子</li>
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
            <Route path="/questionlist" element={<QuestionList userInfo={userInfo}/>}></Route>
            <Route path="/share" element={<Share/>}></Route>
            <Route path="/login" element={<Login changeStateMethod={loginStateChange}/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
