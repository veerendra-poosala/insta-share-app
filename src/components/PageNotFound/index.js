import {Link} from 'react-router-dom'
import {PrimaryButton} from '../Extras/index'
import './index.css'

const PageNotFound = props => (
  <div className="page-not-found-bg-container">
    <img
      className="page-not-found-image"
      alt="page not found"
      src="https://res.cloudinary.com/v45/image/upload/v1689575789/instaShareProject/searchNotFoundRoute/erroring_1_p9z1ff.jpg"
    />
    <h1 className="page-not-found-heading">Page Not Found</h1>
    <p className="page-not-found-description">
      we are sorry, the page you requested could not be found.Please go back to
      the homepage.
    </p>
    <Link to="/" style={{textDecoration: 'none'}}>
      <PrimaryButton type="button">Home Page</PrimaryButton>
    </Link>
  </div>
)

export default PageNotFound
