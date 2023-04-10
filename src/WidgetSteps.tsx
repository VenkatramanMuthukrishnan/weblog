import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import First from './steps/First';
import WidgetOne from './steps/second/WidgetOne';
import Second from './steps/Second';



const WidgetSteps: React.FC<any> = (props:any) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [firstPageOp, setFirstPageOp] = useState(1);
  const [text, setText] = useState<string>();
  const [base64Image, setBase64Image] = useState(null);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };


  const steps:any = [
    {
      title: 'Start',
      content: <First setValue={(r:any)=>setFirstPageOp(r)}/>,
    },
    {
      title: 'Finish',
      content: <Second value={firstPageOp} text setText={setText} base64Image  setBase64Image={setBase64Image}/>,
    }
  ];
  const items = steps.map((item:any) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => {
            props.setSecondPageOp({text:text,base64Image:base64Image} as any)
            message.success('Processing complete!');
            }}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default WidgetSteps;