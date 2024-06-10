import CoreServices from "src/boot/services/CoreServices";


async function post(data){
    const response = await CoreServices.post("/tasks",data);
    return response;
}

async function getAll(){
    try{
        const response = CoreServices.getAll("/tasks");
        return (await response).data
    }catch(error){
        console.log(error);
    }
}

async function patch(data){
    try {
        await CoreServices.patch("/tasks/"+data.id,data)
    } catch (error) {
        console.log(error);
    }
}

export default {post, getAll,patch};