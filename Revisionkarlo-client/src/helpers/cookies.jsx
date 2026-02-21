import Cookies from 'js-cookie'

export const setCookies = (key,user) => {
 console.log("u",key,user);
   const f = Cookies.set(key, user, { expires: 1,secure:true})
//    console.log(f,"f");
}

export const getCookies = async (key) => {
    if(Cookies.get(key)){
return Cookies.get(key);
    }
    else{
        return null;
    }
}

export const deleteCookies = (key) => {
    Cookies.remove(key)
}