import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkWithoutStyle = styled(Link)`
 text-decoration:none;
 color: white;

 &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: white;
        color: white;
    }

`; 


const DivView = styled.div`
color:black;
background:white;
border-radius:40%;
width:60%;
margin-left:19%;
margin-top:1%
`;

export {LinkWithoutStyle,DivView};