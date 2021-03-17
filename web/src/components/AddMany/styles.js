import { Button } from "antd";
import styled from "styled-components";

const DivForm = styled.div`
  margin-top: 30px;
  padding: 50px;
  border: 3px solid black;
  border-radius: 15%;
  display: flex;
  align-self: center;
  justify-content: center;
  width: 800px;
  min-height: 600px;
  background-color: white;
`;

const ButtonMenu = styled(Button)`
  margin-left: 40px;
`;

export { DivForm, ButtonMenu };
