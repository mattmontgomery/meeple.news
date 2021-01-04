import React, { useEffect, useState, useContext, createContext } from "react";

import Posts from "@components/admin/Posts";
import UserContext from "@components/admin/UserContext";

import withAuth from "@components/withAuth";
import { withApollo } from "@apollo/client";
import { useLazyQuery } from "@apollo/react-hooks";
import usersQuery from "@db/queries/users";

export function Admin({ user }) {
  const [getUser, { loading, data }] = useLazyQuery(usersQuery, {
    variables: { jwt: user?.token, email: user?.email },
  });
  const userContext = useContext(UserContext);
  useEffect(() => {
    if (user) {
      getUser();
    }
    userContext;
  }, [user]);
  return data?.userByJwt?.roles.includes("admin") ? (
    <UserContext.Provider value={{ jwt: user?.token, email: user?.email }}>
      <Posts apolloClient={null} apolloState={null} />
    </UserContext.Provider>
  ) : loading ? (
    <span></span>
  ) : (
    <>
      {"Nobody for specified token"}
      {JSON.stringify(user)}
    </>
  );
}

export default withApollo(withAuth(Admin));
