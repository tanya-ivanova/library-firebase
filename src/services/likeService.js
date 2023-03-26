import * as request from "./requester";

const baseUrl = 'http://localhost:3030/data/likes';

export async function likeBook(bookId) {
    return request.post(baseUrl, {bookId});
}

export async function getTotalLikesByBookId(bookId) {
    return request.get(`${baseUrl}?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}

export async function getMyLikeByBookId(bookId, userId) {
    return request.get(`${baseUrl}?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
