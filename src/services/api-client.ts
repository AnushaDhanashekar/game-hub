import axios from "axios";

export default axios.create({
    baseURL:"https://api.rawg.io/api",
    params:{
        key:'9eadbda75d3b4bfab6e5718fafc9de9d'
    }
});