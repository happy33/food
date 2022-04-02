import axios from 'axios';
import './recipe.css'
import searchPic from '../../img/search.png'
import mainPic from '../../img/main.png'
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Recipe = () => {
    const [recipelist, setRecipelist] = useState([])
    const [resultlist, setResultlist] = useState([])
    const [inputText, setInputText] = useState('')
    const [showData, setShowData] = useState(recipelist)
    const navigate = useNavigate()
    useEffect(async () => {
        const res = await axios.get('http://localhost:3001/getRecipeList')
        setRecipelist(res.data)
    },[])

    useEffect(()=>{
        if(resultlist.length === 0){
            setShowData(recipelist)
        }else{
            setShowData(resultlist)
        }
    })

    const handleSearch = async () => {
        if(inputText === ''){
            setResultlist([])
        }else{
            try{
                const res = await axios.post('http://localhost:3001/getSearchRecipe',`recipeName=${inputText}`)
                setResultlist(res.data)
            }catch(e){
                console.log(e)
            }
        }   
    }

    return(
        <div className='recipe_container'>
            <div className='searchRecipe'>
                <input placeholder='请输入想要查找的食谱' value={inputText} onChange={e=>{setInputText(e.target.value)}}/>
                <div className='searchBtn'>
                    <img src={searchPic} onClick={handleSearch}/>
                </div>
            </div>
            <div className='recipe_list'>
                { showData
                    .map(i=>{
                        return (
                            <div className='recipe_box' key={i.recipeID} onClick={()=>{navigate('./recipedetail',{state:{data:i}})}}>
                                <div className='pic'>
                                    <img src={mainPic} alt='mainPic'/>
                                </div>
                                <p className='recipe_name'>{i.recipeName}</p>
                            </div>
                        )
                })}
            </div>
        </div>
    )
}

export default Recipe