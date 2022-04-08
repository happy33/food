import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import './awardMall.css'
import '../../common/common.css'

const AwardMall = () => {
    const [ awardInfo, setAwardInfo] = useState([])
    useEffect(async()=>{
        const res = await axios.get('http://localhost:3001/getAward')
        console.log(res)
        setAwardInfo(res.data)
    },[])
    return(
        <div className='big_container'>
            <div className='headtitle'>积分商城</div>
            <div className='awardlist'>
                {awardInfo.map(i=>{
                    return(
                        <div className='award_box' key={i.awardID}>
                            <div className='pic_name'>
                                <div className='pic_box'>
                                    <img src={i.pic.slice(7)} alt="picture"/>
                                </div>
                                <p className='awardname'>{i.awardName}</p>
                            </div>
                            <div className='changeBtn'>{i.award}积分</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AwardMall