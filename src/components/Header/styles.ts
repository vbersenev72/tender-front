import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 20px;
    padding-left: 7%;
`;
export const CompanyName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  background: #3294F4;
  border-radius: 5px;
  padding: 10px;
`;

export const InfoLog = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  padding: 10px;
`

export const InfoLogItem = styled.div<{ count: any }>`
  display: grid;
  grid: center;
  padding: 5px;
`
