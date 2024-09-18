import React from 'react'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {LiContainer, VideoThumbnail, Container} from './styledComponents'
import './index.css'

const VideoItem = props => {
  const {details} = props
  const {channel, id, publishedAt, thumbnailUrl, title, viewCount} = details
  const publishedAgo = formatDistanceToNow(new Date(publishedAt.toString()))

  return (
    <LiContainer>
      <Link to={`/videos/${id}`} className="link">
        <VideoThumbnail src={thumbnailUrl} alt="video thumbnail" />
        <Container row>
          <img
            src={channel.profileImageUrl}
            alt="channel logo"
            className="profile-img"
          />
          <Container>
            <p>{title}</p>
            <p>{channel.name}</p>
            <p>
              {viewCount} views • {publishedAgo}
            </p>
          </Container>
        </Container>
      </Link>
    </LiContainer>
  )
}
export default VideoItem
