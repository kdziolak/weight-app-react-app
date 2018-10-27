import React from 'react'

export default function HeaderTitle(props) {
    switch(props.headerNumber){
        case 1: 
            return <h1 className={props.classes}>{props.content}</h1>
        case 2: 
            return <h2 className={props.classes}>{props.content}</h2>
        case 3: 
            return <h3 className={props.classes}>{props.content}</h3>
        case 4: 
            return <h4 className={props.classes}>{props.content}</h4>
        case 5: 
            return <h5 className={props.classes}>{props.content}</h5>
        case 6: 
            return <h6 className={props.classes}>{props.content}</h6>
    }
    return <h1 className={props.classes}>{props.content}</h1>;
}
