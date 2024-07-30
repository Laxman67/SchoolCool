import './Feature.css';
import assets from '../../assets/assets';
function Feature() {
  return (
    <div className="feature-container">
      <div className="feature-title">
        <h1>Our Categories</h1>
        <p>
          &quot; Watch your back, but more importantly when you get out the
          shower, dry your back, it’s a cold world out there. Wraith talk. Let
          me be clear, you have to make it &quot;
        </p>
      </div>
      <div className="features">
        {assets.features.map((item, index) => {
          return (
            <>
              <div className="feature-item" key={index}>
                <h4>{item.name} </h4>
                <p>{item.description}</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Feature;
