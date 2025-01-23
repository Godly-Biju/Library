import axios from "axios"


const commonAPI = async(Httpmethod,url,reqBody) =>{

    const reqConfig = {
        method : Httpmethod,
        url,
        // argument and key value is same then key is enough
        
    }
    if (Httpmethod !== "GET") {
        reqConfig.data = reqBody;
    }
    return await axios(reqConfig).then(res=>{
        return res
    }).catch(err=>{
        return err
    })

}
export default commonAPI