import './Login.css';
import PropTypes from 'prop-types';
function Login({ setShowLogin }) {
  return (
    <div>
      <h3>Login</h3>
      <h3 onClick={() => setShowLogin(false)}>x</h3>
    </div>
  );
}

Login.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};
export default Login;
