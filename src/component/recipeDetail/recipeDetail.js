import axios from 'axios';
import './recipeDetail.css'
import '../../common/common.css'
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const RecipeDetail = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const recipeinfo = location.state.data
    const steps = recipeinfo.stepDetail.split("&")
    console.log(recipeinfo,steps)
    return(
        <div className='big_container'>
            <h3>{recipeinfo.recipeName}</h3>
            <div className='backBtn' onClick={()=>{navigate('./../')}}>返回</div>
            <ul className='steps'>
                {steps.map((item,idx)=>{
                    return(
                        <li className='step'>
                            <p>
                                <span className='index'>{idx+1}</span>
                                {item}
                            </p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default RecipeDetail