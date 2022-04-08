import "./App.css";
import image from "./assets/img.png";
import HomePage from "./pages/HomePage/HomePage";
import Signup from "./pages/SignUp/Signup";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "./store/user-slice";
function App() {
  const isAuth = useSelector((state) => {
    return state.user.isAuth;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(userAction.login(user));
    }
  }, [dispatch]);
  console.log("Auth " + isAuth);
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/signup" />
        </Route>
        <Route path="/signup" exact>
          {!isAuth ? (
            <div className="container mt-3">
              <div className="row">
                <div className="col-md-5">
                  <Signup />
                </div>
                <div className="col-md-7">
                  <img src={image} alt="img" />
                </div>
              </div>
            </div>
          ) : (
            <Redirect to="/homepage" />
          )}
        </Route>
        <Route path="/homepage">
          {isAuth ? <HomePage /> : <Redirect to="/signup" />}
        </Route>
      </Switch>
    </>
  );
}

export default App;
