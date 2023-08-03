import Slider from 'react-slick'

// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'

/* Add css to your project */
import './index.css'

const ReactSlick = props => {
  const {userStories, profile} = props
  // console.log('profile', profile)
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    // variableWidth: true,
    slidesToShow: userStories?.length >= 7 ? 7 : userStories?.length,
    slidesToScroll: 1,
    className: 'slick-container',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: userStories?.length >= 7 ? 7 : userStories?.length,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: userStories?.length >= 4 ? 4 : userStories?.length,
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
    <ul className="slick-items-list-container">
      <Slider {...settings}>
        {userStories.map(story => {
          if (profile === undefined) {
            const {storyUrl, userName, userId} = story

            return (
              <li className="slick-item" key={userId}>
                <img className="logo-image" src={storyUrl} alt="company logo" />
                <p className="slick-user-name">{userName}</p>
              </li>
            )
          }
          const {storyUrl, userId} = story

          return (
            <li className="slick-item" key={userId}>
              <img className="logo-image" src={storyUrl} alt="company logo" />
            </li>
          )
        })}
      </Slider>
    </ul>
  )
}

export default ReactSlick
