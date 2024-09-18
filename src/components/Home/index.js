import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {FaSearch} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ThemeContext from '../../Context/ThemeContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
import VideoItem from '../VideoItem'
import {FailureContainer} from './styledComponents'
import './index.css'

const HomeContainer = styled.div`
  background-color: ${props =>
    props.theme === 'dark' ? '#181818' : '#f9f9f9'};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
`

const MainContent = styled.div`
  flex: 1;
  background-color: ${props =>
    props.theme === 'dark' ? '#0f0f0f' : '#f9f9f9'};
  padding: 20px;
`
const ColumnContainer = styled.div`
  diaplay: flex;
  flex-direction: column;
`

const Banner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const SearchInput = styled.input`
  padding: 10px;
  width: 300px;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  margin-right: 10px;
`

const VideoList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`

const VideoTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${props => (props.theme === 'dark' ? '#f9f9f9' : '#181818')};
`

const ChannelName = styled.p`
  font-size: 14px;
  color: #7e858e;
`

const apiStatusList = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noData: 'NODATA',
}

class Home extends Component {
  state = {
    bannerVisible: true,
    apiStatus: apiStatusList.initial,
    videosList: [],
    inputVal: '',
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    const {inputVal} = this.state
    this.setState({apiStatus: apiStatusList.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/videos/all?search=${inputVal}`,
      options,
    )
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.videos.map(each => ({
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
        id: each.id,
        publishedAt: each.published_at,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
      }))
      console.log(updatedData)
      if (updatedData.length > 0) {
        this.setState({
          apiStatus: apiStatusList.success,
          videosList: updatedData,
        })
      } else {
        this.setState({apiStatus: apiStatusList.noData})
      }
    } else {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  onChangeInput = event => {
    this.setState({inputVal: event.target.value})
  }

  onClickSearchIcon = () => {
    this.getVideos()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  renderNoDataView = () => (
    <FailureContainer>
      <img
        className="failure-image"
        alt="no videos"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button type="button" className="home-retry-btn" onClick={this.getVideos}>
        Retry
      </button>
    </FailureContainer>
  )

  renderFailureView = () => (
    <FailureContainer>
      <img
        src={
          this.context.isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        }
        alt="failure"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble to complete your request</p>
      <p>Please try again</p>
      <button type="button" className="home-retry-btn" onClick={this.getVideos}>
        Retry
      </button>
    </FailureContainer>
  )

  renderSuccessView = () => {
    const {videosList} = this.state
    const {isDarkTheme} = this.context
    return (
      <VideoList>
        {videosList.map(video => (
          <VideoItem key={video.id} details={video} />
        ))}
      </VideoList>
    )
  }

  closeBanner = () => {
    this.setState({bannerVisible: false})
  }

  render() {
    const {bannerVisible, apiStatus, inputVal} = this.state

    return (
      <ThemeContext.Consumer>
        {({isDarkTheme}) => (
          <ThemeProvider theme={{mode: isDarkTheme ? 'dark' : 'light'}}>
            <HomeContainer
              data-testid="home"
              theme={isDarkTheme ? 'dark' : 'light'}
            >
              <Header />
              <ContentWrapper>
                <Sidebar />
                <MainContent theme={isDarkTheme ? 'dark' : 'light'}>
                  {bannerVisible && (
                    <Banner data-testid="banner">
                      <ColumnContainer>
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                        />
                        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                        <button className="get-it-now-btn">GET IT NOW</button>
                      </ColumnContainer>
                      <CloseButton
                        onClick={this.closeBanner}
                        data-testid="close"
                      >
                        X
                      </CloseButton>
                    </Banner>
                  )}
                  <SearchContainer>
                    <SearchInput
                      type="search"
                      placeholder="Search"
                      value={inputVal}
                      onChange={this.onChangeInput}
                    />
                    <button
                      data-testid="searchButton"
                      onClick={this.onClickSearchIcon}
                      type="button"
                      className="searchBtn"
                    >
                      <FaSearch />
                    </button>
                  </SearchContainer>
                  {apiStatus === apiStatusList.loading &&
                    this.renderLoadingView()}
                  {apiStatus === apiStatusList.failure &&
                    this.renderFailureView()}
                  {apiStatus === apiStatusList.success &&
                    this.renderSuccessView()}
                  {apiStatus === apiStatusList.noData &&
                    this.renderNoDataView()}
                </MainContent>
              </ContentWrapper>
            </HomeContainer>
          </ThemeProvider>
        )}
      </ThemeContext.Consumer>
    )
  }
}

Home.contextType = ThemeContext

export default Home
