import React, { Component, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// import admin from "firebase-admin";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../lib/db/initFirebase";

import withAuth from "@components/withAuth";

initFirebase();

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/login",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

export function Login(props) {
  return (
    <div>
      <h1>{"Sign in"}</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      <pre>{JSON.stringify(props.user, null, 2)}</pre>
    </div>
  );
}

export default withAuth(Login);
