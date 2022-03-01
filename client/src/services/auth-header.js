//function to make request to backend using bearer token that is stored in localstorage

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user_data"));
    if (user && user.access_token) {
        return { Authorization: 'Bearer ' + user.access_token };
    } else {
        return { "error": "token is not available!" }
    }
}