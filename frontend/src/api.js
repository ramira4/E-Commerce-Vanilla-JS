import axios from "axios";
import { apiUrl } from "./config";

export const getProduct = async (_id) =>{
    try{
        const response = await axios({
            url: `${apiUrl}/api/products/${_id}`,
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    };
}