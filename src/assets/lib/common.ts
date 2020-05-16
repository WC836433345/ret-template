import * as _ from 'lodash';


// 获取url中全部参数的对象
export function getUrlAllParams(urlParam:string){
    // 解决乱码问题
    const url = decodeURI(urlParam);
    const res:any = {};
    const urlData = _.split(url, '?').length > 1 ? _.split(url, '?')[1] : null ;
    if (!urlData){
        return null;
    } 
    const paramsArr = _.split(urlData, '&');
    _.forEach(paramsArr, (item) => {
        const key = _.split(item, '=')[0]
        const value = _.split(item, '=')[1]
        res[key] = value
    }); 
    return res;
}

export function makeQuery(queryObject:object) {
    const query = Object.entries(queryObject)
        .reduce((result:any, entry:any) => {
            result.push(entry.join('='))
            return result
        }, []).join('&')
    return `?${query}`
}

/* 
    获取cookies
*/
export function getCookie(cookieName:string){
    const allcookies = document.cookie;
    let cookiePos = allcookies.indexOf(cookieName);   // 索引的长度
    let value:any = "";
    // 如果找到了索引，就代表cookie存在，
    // 反之，就说明不存在。
    if (cookiePos !== -1){
        // 把cookie_pos放在值的开始，只要给值加1即可。
        cookiePos += cookieName.length + 1;      // 这里容易出问题，所以请大家参考的时候自己好好研究一下
        let cookieEnd = allcookies.indexOf(";", cookiePos);
  
        if (cookieEnd === -1)
        {
            cookieEnd = allcookies.length;
        }
  
        value = unescape(allcookies.substring(cookiePos, cookieEnd));         // 这里就可以得到你想要的cookie的值了。。。
    }
    return value;
}