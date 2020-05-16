
interface Nomoredata{
    title?:string,
    style?:object
}
import * as React from 'react';
import './nomoredata.less';

export default function Nomoredata(props:Nomoredata){
    return (<div className="nodata">{props.title ? props.title : "暂时无数据"}</div>);
}