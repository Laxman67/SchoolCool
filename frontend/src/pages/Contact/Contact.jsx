import './Contact.css';
function Contact() {
  return (
    <>
      <div className="map-container" id="contact">
        <div className="map-text">
          <h2>Contact</h2>
          <p>Send us a message </p>
          <div className="contact-form">
            <form method="post">
              <div>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" required />
              </div>
              <br />
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" required />
              </div>{' '}
              <br />
              <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id=
                "password" required />
              </div>
              <div className="submit-btn">
                <button type="submit">Contact</button>
              </div>
            </form>
          </div>
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.165813309421!2d77.20596397427836!3d28.68468613171263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd919b807fdd%3A0x3009926d9fbd5029!2sDelhi%20School%20Of%20Economics%2C%20University%20Enclave%2C%20Delhi%2C%20110007!5e0!3m2!1sen!2sin!4v1722392590133!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default Contact;
