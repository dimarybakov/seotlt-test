import React, { memo } from 'react';

interface IconProps {
  className?: string;
  Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export const Icon = memo((props: IconProps) => {
  const { Svg } = props;

  return <Svg />;
});
