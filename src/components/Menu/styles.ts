import styled from "styled-components";

export const MenuContainer = styled.div<{ isShow: boolean }>`
top: 0;
display: flex;
flex-direction: column;
align-items: center;
padding: 150px 20px 20px 20px;
background: #29324A;
height: 100vh;
position: fixed;
width: ${props => (props.isShow ? '20%' : '5%')};
z-index: 100;
left: 0;
`;
export const MenuItem = styled.div<{ isShow: boolean }>`
  display: flex;
  border: 1px solid #8C8C8C;
  padding: ${props => (props.isShow ? '10px 15% 10px 15%' : '10px')};
  border-radius: 3px;
  cursor: pointer;
  flex-direction: row;
  justify-content: ${props => (props.isShow ? 'flex-start' : 'center')};
  align-items: center;
  gap: 5px;
  width: ${props => (props.isShow ? '70%' : '100%')};
  margin: 5px;
`;