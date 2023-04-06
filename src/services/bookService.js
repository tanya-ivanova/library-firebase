import * as request from "./requester";

import { GOOGLE_API } from "../constants";
import { PAGE_SIZE } from "../constants";

export const searchInGoogleGetMany = async (criteria, query, page) => {  
    
    const [googleBooks, countResult] = await Promise.all([
        request.get(`${GOOGLE_API}?q=""+in${criteria}:${query}&startIndex=${(page - 1) * PAGE_SIZE}&maxResults=${PAGE_SIZE}&key=AIzaSyDWxrFEuVaQZJZvXnBAVE-tWjzrFdMiU3c`, null, 'cors'),
        request.get(`${GOOGLE_API}?q=""+in${criteria}:${query}&key=AIzaSyDWxrFEuVaQZJZvXnBAVE-tWjzrFdMiU3c`, null, 'cors')
    ]);
    const count = await countResult.totalItems;    

    return {
        googleBooks,
        pages: Math.ceil(count / PAGE_SIZE) || 1
    };
};

export const searchInGoogleGetOne = (googleBookId) => {    
    return request.get(`${GOOGLE_API}/${googleBookId}`, null, 'cors');     
};
