import styled from 'styled-components'

export const SidebarContainer = styled.div`
  width: 200px;
  background-color: ${props =>
    props.theme === 'dark' ? '#0f0f0f' : '#f9f9f9'};
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const LogoIcons = styled.img`
  width: 40px;
  margin: 0px 6px 0px 0px;
`
export const ContactUsContainer = styled.div`
  padding: 7px;
  align-self: flex-end;
  position: sticky;
`

export const Text = styled.p`
  font-weight: 600;
  color: ${props => (props.theme === 'dark' ? '#f4f4f4' : '#212121')};
`
