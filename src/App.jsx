import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, sub, reset } from "./features/countSlice";
import { login, logout } from "./features/authSlice";

const HYDRATE = "hydrate";
const bootPayload = (payload) => ({
  type: HYDRATE,
  payload,
});

const App = () => {
  const dispatch = useDispatch();
  const { auth, count } = useSelector((state) => state);

  useEffect(() => {
    fetch("/state")
      .then((r) => r.json())
      .then((saved) => dispatch(bootPayload(saved)));
  }, [dispatch]);

  return (
    <>
      <div>
        <h1>Count: {count.value}</h1>
        <div>
          <button onClick={() => dispatch(add(1))}>add</button>
          <button onClick={() => dispatch(sub(1))}>sub</button>
          <button onClick={() => dispatch(reset())}>reset</button>
        </div>
      </div>
      <div>
        <h1>Auth: {auth.loggedIn.toString()}</h1>
        <div>
          <button onClick={() => dispatch(login())}>login</button>
          <button onClick={() => dispatch(logout())}>logout</button>
        </div>
        <div>
          <button
            onClick={() => dispatch({ type: "hydrate", payload: { count: { value: 5 }, auth: { loggedIn: true } } })}
          >
            hydrate
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
