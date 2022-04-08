import axios from 'axios';
import './recipe.css'
import '../../common/common.css'
import searchPic from '../../img/search.png'
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
            var result = []
            recipelist.map(i=>{
                if(i.recipeName.search(inputText) !== -1){
                    result.push(i)
                }
            })
            if(result.length === 0){
                alert("未发现相关食谱")
            }
            setResultlist(result)
        }   
    }

    return(
        <div className='big_container'>
            <div className='searchRecipe'>
                <input placeholder='请输入想要查找的食谱' value={inputText} onChange={e=>{setInputText(e.target.value)}}/>
                <img src={searchPic} onClick={handleSearch}/>
            </div>
            <div className='recipe_list'>
                { showData
                    .map(i=>{
                        return (
                            <div className='recipe_box' key={i.recipeID} onClick={()=>{navigate('./recipedetail',{state:{data:i}})}}>
                                <div className='pic'>
                                    <img src={i.mainPic.slice(7)} alt='mainPic'/>
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