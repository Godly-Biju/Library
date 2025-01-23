import commonAPI from "./commonAPI";
import serverURL from "./serverURL"


// upload book
export const saveVideoAPI= async (videoDetails) => {
    return await commonAPI("POST",`${serverURL}/uploadBooks`,videoDetails)
}

// get all book
export const getAllBooksAPI= async () => {
    return await commonAPI("GET",`${serverURL}/uploadBooks`)
}

export const deleteBookAPI = async (id) => {
    return await commonAPI("DELETE",`${serverURL}/uploadBooks/${id}`,{})
}



export const saveVideoEditAPI= async (Details) => {
    return await commonAPI("PUT",`${serverURL}/uploadBooks/${Details.id}`,Details)
}

