import React from "react";
import { Input as BaseInput } from "antd";
import { InputProps } from "antd/lib/input";

export type IInput = InputProps;

export const UIInput: React.FC<IInput> = ({ ...rest }) => {
  return <BaseInput {...rest} />;
};
