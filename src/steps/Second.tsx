import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import WidgetOne from './second/WidgetOne';


const Second: React.FC<any> = (props:any) => {
  const getSecond=(value:any)=>{
    switch(value) {
       case 1:
         return <WidgetOne onFinish={props.setOp} {...props}/>;
         default:
           return <div>No option selected</div>;
   }
 }
  return getSecond(props.value);
};

export default Second;