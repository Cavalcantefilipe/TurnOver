import React from 'react';
import { Result, Button } from 'antd';
import { DivView, LinkWithoutStyle } from './styles';

export default function NotFound(){
  return(
    <DivView>
    <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary"> <LinkWithoutStyle to='/' >Back Home</LinkWithoutStyle></Button>}
  />
  </DivView>
  )
}