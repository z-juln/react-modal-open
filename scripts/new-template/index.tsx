import getClsWithPrefix from '@/utils/cls';
import React, { memo } from 'react';
import './index.less';

const subPrefix = '<%=name %>';
const cls$ = getClsWithPrefix(subPrefix);

export interface <%=name %>Props {
  className?: string;
  children?: React.ReactNode;
}

const <%=name %>: React.FC<<%=name %>Props> = ({
  className = '',
  ...restProps
}) => {

  return (
    <div
      {...restProps}
      className={`${cls$()} ${className}`}
    >
      <%=name %>
    </div>
  );
};

export default memo(<%=name %>);