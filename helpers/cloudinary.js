import {v2 as cloudinary} from "cloudinary";

const{ClOUDINARY_CLOUD_NAME,ClOUDINARY_API_KEY,ClOUDINARY_API_SECRET}= process.env;

cloudinary.config({
    cloud_name:ClOUDINARY_CLOUD_NAME,
    api_key:ClOUDINARY_API_KEY,
    api_secret:ClOUDINARY_API_SECRET
});

export default cloudinary;