import React from 'react'
import {MDBCol, MDBContainer, MDBRow, MDBFooter} from 'mdbreact'
import '../css/footer.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faInstagram,
  faFacebook,
  faTwitter
} from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <MDBContainer>
        <MDBRow className="footer-row">
          <div className="col-md-4 col-sm-12 needs-margin-bottom">
            <h5 className="footer-title">GRANNY GRACE</h5>
            <p className="footer-content">
              405 W Superior St, Chicago, IL 60654
            </p>
          </div>
          <div className="text-align-bottom-outer col-md-4 col-sm-12">
            <div className="text-align-bottom-inner">
              <h5 className="copyright-info">
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <a href="https://www.MDBootstrap.com"> Granny Grace </a>
              </h5>
            </div>
          </div>
          <div className="social-links col-md-4 col-sm-12">
            <h5 className="links-title">GRANNY SOCIAL</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">
                  Twitter <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li className="list-unstyled">
                <a href="#!">
                  Facebook <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li className="list-unstyled">
                <a href="#!">
                  Instagram <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
            </ul>
          </div>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  )
}

export default Footer
