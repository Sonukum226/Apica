import React from "react";
import { Input } from "reactstrap";
import styled from "styled-components";

const MainCon = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

interface InputTextProps {
  title?: string;
  value: string;
  onChange: (e: Event) => void;
}

const InputText = (props: InputTextProps) => {
  const { onChange, title, value } = props;
  return (
    <MainCon>
      {title}
      <Input value={value} onChange={(e:any) => onChange(e)} type="text" />
    </MainCon>
  );
};

export default InputText;
