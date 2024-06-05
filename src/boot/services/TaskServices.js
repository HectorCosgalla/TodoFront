import CoreServices from "src/boot/services/CoreServices";


function post(data){
    CoreServices.post("/tasks",data);
}

async function getAll(){
    try{
        const response = CoreServices.getAll("/tasks");
        return (await response)
    }catch(error){
        console.log(error);
    }
    
}

export default {post, getAll};