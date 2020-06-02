import styled from 'styled-components';
import { Typography, Button as MuiButton } from '@material-ui/core';

export const Img = styled.img`
    margin-bottom: 0.5rem;
    display: block;
`;

export const Heading = styled.h2`
    color: white;
    font-size: 1.2rem;
    font-weight: 500;
    margin-left: 8px;
    margin-bottom: 0;
`;

export const P = styled(Typography)`
    margin: 0 8px 8px;
    font-size:0.75rem;
`;

export const Button = styled(MuiButton)`
    margin: 10px 8px 0;
    display: block;
    border: 1px solid white;
    background: none;
    color: white;
`

export const ControlContainer = styled.div`
    width: 270px;
    padding: 0rem 1rem;
    left: 0;
    position: fixed;
`;