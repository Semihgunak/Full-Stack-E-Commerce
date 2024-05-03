import Login from "./Login";
import Register from "./Register";
import "./Auth.css";
import User from "./User";

const Auth = () => {
  const user = localStorage.getItem("user");
  return (
    <section className="account-page">
      <div className="container">
        <div className="account-wrapper">
        {user ? (<User />) :
        (
          <Login />
        )
        }
        {!user && <Register /> }  
          
        </div>
      </div>
    </section>
  );
};

export default Auth;