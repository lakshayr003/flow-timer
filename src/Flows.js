import './Flows.css';
import React, {useEffect, useState} from 'react';

function Flows(props){
    const [highlight, changeHighlight] = useState(0);
    let flowArray1 = [];
    let flowArray2 = [];
    let flowIndex = props.flowCount - props.cdFlowCount;

    useEffect(() => {
        if(props.cdStatus === 1){
            const timer = setInterval(() => {
                changeHighlight(!highlight);    
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        }
        else{
            changeHighlight(0);
        }
    })
    const Flow = ({highlighting, finished}) => {
        return(
        <div className={`flow-circle${highlighting ? " highlight": ""}${finished ? " finished": ""}`} ></div>
        );
    }
    
    for(let i = 0;i<props.flowCount && i < 10;i++){
        if(i < flowIndex) flowArray1.push(<Flow highlighting={0} finished = {1} key={i.toString()}>Finished</Flow>)
        else if( i === flowIndex ) flowArray1.push(<Flow highlighting={highlight} key={i.toString()}/>)
        else flowArray1.push(<Flow highlighting={0} key={i.toString()}/>);
    }
    for(let i = 10;i<props.flowCount;i++){
        if(i < flowIndex) flowArray1.push(<Flow highlighting={0} finished = {1} key={i.toString()}>Finished</Flow>)
        else if( i === flowIndex ) flowArray1.push(<Flow highlighting={highlight} key={i.toString()}/>)
        else flowArray1.push(<Flow highlighting={0} key={i.toString()}/>);
    }

    return(
        <>
        <div className="flow-container">
        {flowArray1}
        </div>
        <div className="flow-container">
        {flowArray2}
        </div>
        {/* <p> {flowIndex} </p> */}
        </>
    )
}

export default Flows;
  