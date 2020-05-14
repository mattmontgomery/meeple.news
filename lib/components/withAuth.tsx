import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "@db/initFirebase";

initFirebase();

const WithAuth = (BaseComponent) => (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (_user) => {
      if (!user) {
        setUser({
          email: _user.email,
          token: await _user.getIdToken(),
        });
      }
    });
  });
  return user ? <BaseComponent {...props} user={user} /> : null;
};
export default WithAuth;
