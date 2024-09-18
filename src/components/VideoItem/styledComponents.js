import styled, {ThemeProvider} from 'styled-components'

export const LiContainer = styled.li`
  margin: 10px;
  width: 300px;
  height: 300px
  display: flex;
  flex-direction: column;
`
export const VideoThumbnail = styled.img`
  width: 100%;
  border-radius: 8px;
`
export const Container = styled.div`
  display: flex;
  flex-direction: ${props => (props.row ? 'row' : 'column')};
`
