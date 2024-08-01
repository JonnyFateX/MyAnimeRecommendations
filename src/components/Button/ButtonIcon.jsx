import {cloneElement} from 'react'

export default function ButtonIcon({color, children}){
    const childrenList=children.length ? children : [children]
    return (
        <div className="icon">
            {childrenList.map((child, index)=>{
                return cloneElement(child, {color, key:`btnIcon${index}`})
            })}
        </div>
    )
}