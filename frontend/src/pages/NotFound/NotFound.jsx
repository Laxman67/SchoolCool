import { Link } from "react-router-dom";
import "./NotFound.css";
const NotFound = () => {
     return (
          <div style={styles.container} className="container">
               <h1 style={styles.title}>404 - Page Not Found</h1>
               <p style={styles.message}>
                    The page you are looking for does not exist.
               </p>
               <Link to="/" style={styles.link}>
                    Go to Home
               </Link>
          </div>
     );
};

const styles = {
     container: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
     },
     title: {
          fontSize: "3rem",
          marginBottom: "1rem",
     },
     message: {
          fontSize: "1.5rem",
          marginBottom: "2rem",
     },
     link: {
          fontSize: "1.2rem",
          color: "#007bff",
          textDecoration: "none",
     },
};

export default NotFound;
