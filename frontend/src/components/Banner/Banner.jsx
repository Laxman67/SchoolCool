import assets from '../../assets/assets';
import './Banner.css';
function Banner() {
  return (
    <div className="banner-container">
      <div className="banner-img">
        <img src={assets.BannerImage} alt="banner" />

        <div className="banner-text">
          <h3>School Information System</h3>
          <p>
            Welcome to the &quot;<i>School CMS Dashboard</i>&quot;,
            <br /> your central hub for managing and <br />
            accessing all school-related information efficiently.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
