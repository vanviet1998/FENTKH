import React from "react";
import { Button as BaseButton } from "antd";
import { ButtonProps } from "antd/lib/button";

export type IButton = ButtonProps;

export const Button: React.FC<IButton> = ({ className,...rest }) => {
  return <BaseButton {...rest} className={className?className : "btn animate"}/>;
};
