import React, { useState } from 'react';
import { RadioChangeEvent, Skeleton } from 'antd';
import { Radio } from 'antd';
import SkeletonButton from 'antd/es/skeleton/Button';
import SkeletonAvatar from 'antd/es/skeleton/Avatar';

export interface FirstProps extends React.HTMLAttributes<HTMLElement> {
    setValue: (r: any) => void;
  }
  

const First: React.FC<any> = (props:any) => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
    props.setValue(e.target.value);
  };

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={1}><Skeleton.Image />
        <Skeleton /></Radio>
      <Radio value={2}><Skeleton.Input /></Radio>
      <Radio value={3}><Skeleton.Image /><Skeleton /><SkeletonButton/></Radio>
    </Radio.Group>
  );
};

export default First;