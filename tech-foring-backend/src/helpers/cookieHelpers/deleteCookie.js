const deleteCookie = (response, name) => {
    //document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
     return  response.setHeader("Set-Cookie", `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`);
  }
  
  module.exports = deleteCookie;