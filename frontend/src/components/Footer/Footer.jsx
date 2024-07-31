import './Footer.css';

function Footer() {
  return (
    <div>
      <div className="footer-container">
        <hr />
        <div className="footer-top">
          <p> &quot;Empowering Education, One Click at a Time &quot;</p>
          <div className="footer-links">
            <ul>
              <li>Email</li>
              <li>Home</li>
              <li>Gallery</li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
