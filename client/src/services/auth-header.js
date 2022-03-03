// function to make request to backend using bearer token that is stored in localstorage

export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user_data"));
    if (user && user.access_token) {
        return { Authorization: 'Bearer ' + user.access_token };
    } else {
        return { "error": "token is not available!" }
    }
}

//set token
export const setToken = (tokenObj) => {
    console.log("token obj",tokenObj)
    localStorage.setItem('access_token', tokenObj.access_token);
    localStorage.setItem('refresh_token', tokenObj.refresh_token);

}


//get refresh token
export const getRefreshToken = (tokenObj) => {
    const user = JSON.parse(localStorage.getItem("user_data"));
    console.log("user in refresh",user)
    
    return user.refresh_token;

}


export const clearToken = (tokenObj) => {
    localStorage.removeItem("user_data");
  }


 





// const localStorageService = (function(){

//     var _service;
//     function _getService() {
//         if(!_service) {
//         _service = this;
//         return _service
//     }
//     return _service
//     }

//     function _setToken(tokenObj) {
//         localStorage.setItem('access_token', tokenObj.access_token);
//         localStorage.setItem('refresh_token', tokenObj.refresh_token);
//     }
     

//     const user_detail = JSON.parse(localStorage.getItem("user_data"));
//     function _getAccessToken(user_detail) {
//             return user_detail.access_token;
//     }
//     function _getRefreshToken(user_detail) {
//         return user_detail.refresh_token;
//     }
   
//     return {
//         setToken:_setToken,
//         getService : _getService,
//         getAccessToken : _getAccessToken,
//         getRefreshToken : _getRefreshToken,
//       }
     
// })
// export default localStorageService;

