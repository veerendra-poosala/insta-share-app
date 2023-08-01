import Slider from 'react-slick'

// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'

/* Add css to your project */
import './index.css'

const ReactSlick = props => {
  const {userStories} = props

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    // variableWidth: true,
    slidesToShow: userStories?.length >= 8 ? 8 : userStories?.length,
    slidesToScroll: 1,
    className: 'slick-container',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: userStories?.length >= 6 ? 6 : userStories?.length,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: userStories?.length >= 4 ? 4 : userStories?.length,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: userStories?.length >= 4 ? 4 : userStories?.length,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <Slider {...settings}>
      {userStories.map(story => {
        const {storyUrl, userName, userId} = story

        return (
          <li className="slick-item" key={userId}>
            <img className="logo-image" src={storyUrl} alt="company logo" />
            <p className="slick-user-name">{userName}</p>
          </li>
        )
      })}
    </Slider>
  )
}

export default ReactSlick
