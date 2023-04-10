import React from 'react';
import WidgetOne from './second/WidgetOne';
import WidgetDefault from './second/WidgetDefault';


const Second: React.FC<any> = (props:any) => {
  const getSecond=(value:any)=>{
    switch(value) {
       case 1:
         return <WidgetOne onFinish={props.setOp} {...props}/>;
         default:
           return <WidgetDefault/>;
   }
 }
  return getSecond(props.value);
};

export default Second;