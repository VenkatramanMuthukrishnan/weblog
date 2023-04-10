import React from 'react';
import { Skeleton, Space } from 'antd';
import { DotChartOutlined } from '@ant-design/icons';

const WidgetDefault: React.FC = () => {return (
<div><br />
      <Space>
        <Skeleton.Image active />
        <Skeleton active />
        <Skeleton active />
      </Space>
      </div>
      );
}

export default WidgetDefault;