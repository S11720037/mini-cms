import { useState } from "react";
import { useHistory } from "react-router-dom";

import { auth } from "../../config";
import { Spinner } from "../../components";

export default function Login() {
  document.title = "Mini CMS | Login";

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = e => {
    e.preventDefault();

    setIsLoading(true);

    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // const user = userCredential.user;
        setIsLoading(false);

        history.push("/admin");
      })
      .catch(error => {
        // var errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        setIsLoading(false);
      });
  };

  return (
    <div
      className="container-fluid p-2 m-0 d-flex align-items-center justify-content-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <form className="container-sm border rounded shadow p-2 bg-white">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="text-center">
          {isLoading === false && (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={e => handleLogin(e)}
              style={{ minWidth: "100px" }}
            >
              Login
            </button>
          )}
          {isLoading === true && (
            <button
              type="submit"
              className="btn btn-primary disabled"
              onClick={e => handleLogin(e)}
              style={{ minWidth: "100px" }}
            >
              <Spinner />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
