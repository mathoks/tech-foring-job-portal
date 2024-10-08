


const setCookieHelper = (response, name, value, days) => {
  
    console.log(name, value, days);
    var expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
     return  expires = `expires=${date.toUTCString()};`;
    }
   // return document.cookie = `${name}=${value};${expires}path=/`;
   response.cookie(name, value, { httpOnly: true, secure: true, expires: expires, sameSite: 'none' });
    // return response.setHeader("Set-Cookie", `${name}=${value};${expires}path=/`);
    // response.cookie(name, value, { expires: expires, httpOnly: true, sameSite: "none", secure: true });
  }
  
  module.exports = setCookieHelper;
  
  
  