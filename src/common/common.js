import axios from "axios"

export const getDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}`:date.getMonth()+1
    const day = date.getDate() < 10 ? `0${date.getDate()}`:date.getDate()
    return `${year}-${month}-${day}`
}

export const nextDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}`:date.getMonth()+1
    const day = date.getDate()+1 < 10 ? `0${date.getDate()+2}`:date.getDate()+2
    return `${year}-${month}-${day}`
}

export const randomID = z => {
    const letter = z
    const date = getDate().replace(/-/g,'')
    const random = Math.round(Math.random()*1000)
    return `${letter}${date}${random}`
}

export const handleInputFile = e => {
    if(e.target.files[0].size>1024*1024){
        alert('上传图片大小不能超过1M')
    }else{
        const img = e.target.files[0]
        const Form = new FormData()
        Form.append('avatar',img)
        return Form        
    }
}

export const uploadFile = async Form => {
    axios({
        url: 'http://localhost:3001/uploadFile',
        method: 'POST',
        Headers: {
          "Content-Type": "multipart/form-data",
        },
        data: Form,
      }).then((res)=>{
        console.log(res.data)
        return res.data
      })
}