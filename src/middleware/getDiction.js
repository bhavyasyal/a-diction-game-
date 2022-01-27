import request from '../service'

const getDiction=(word)=>{
const url=`api/v3/references/learners/json/${word}?key=027c8999-2ed2-416f-911c-5249516439e2`
 const options={url:url, method:'GET'}
return request(options)

}

export default getDiction;