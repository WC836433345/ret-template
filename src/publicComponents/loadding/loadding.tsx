import * as React from 'react';

import "./loadding.less";

export default class Loadding extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        // this.state= {
            
        // }
    }

    public render(){
        return (
            <div className="loadding">
                <div className="loadding_content">
                    <div className="letter-holder">
                        <div className="l-1 letter">S</div>
                        <div className="l-2 letter">H</div>
                        <div className="l-3 letter">E</div>
                        <div className="l-4 letter">I</div>
                        <div className="l-5 letter">N</div>
                    </div>
                </div>
            </div>
        )
    }
}