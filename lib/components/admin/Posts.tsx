import React, { FormEventHandler, FormEvent, useRef } from "react";
import { withApollo } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/react-hooks";
import postsQuery, { UPDATE_POST } from "@db/queries/posts";
import UserContext from "./UserContext";

import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

const List = styled.div`
  display: grid;
  grid-row-gap: 0.25rem;
`;

const ListItem = styled.form`
  display: grid;
  grid-template-columns: 50px repeat(6, minmax(10px, 300px));
  grid-column-gap: 0.5rem;
`;

const ListInput = styled.input`
  font-family: inherit;
  padding: 0.25rem;
  width: 100%;
  font-size: 12pt;
  font-weight: 300;
`;

const ListFieldSet = styled.fieldset`
  border: 0;
  display: grid;
  grid-template-rows: auto auto;
`;

function Post(props) {
  const [updatePost] = useMutation(UPDATE_POST);
  const submittedEl = useRef<HTMLInputElement>(null);
  return (
    <UserContext.Consumer>
      {({ jwt, email }) => (
        <ListItem
          onSubmit={(ev: FormEvent) => {
            ev.preventDefault();
            const vars = Array.from((ev.target as HTMLFormElement).elements)
              .filter((i: HTMLInputElement) => i.name)
              .map((i: HTMLInputElement) => ({
                [i.name]:
                  i.name === "placements" ? i.value.split(",") : i.value,
              }))
              .reduce((curr, acc) => {
                return {
                  ...acc,
                  ...curr,
                };
              }, {});
            updatePost({
              variables: vars,
              context: {
                headers: {
                  authorization: `Bearer ${jwt}`,
                },
              },
            });
          }}
        >
          <button>
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <input type="hidden" name="id" value={props.id} />
          <ListFieldSet>
            <label htmlFor="title">{"title"}</label>
            <ListInput name="title" defaultValue={props.title} />
          </ListFieldSet>
          <ListFieldSet>
            <label htmlFor="link">{"link"}</label>
            <ListInput name="link" defaultValue={props.link} />
          </ListFieldSet>
          <ListFieldSet>
            <label htmlFor="thumbnail">{"thumbnail"}</label>
            <ListInput name="thumbnail" defaultValue={props.thumbnail} />
          </ListFieldSet>
          <ListFieldSet>
            <label htmlFor="submitted">
              {"submitted"}{" "}
              <FontAwesomeIcon
                icon={faCalendarCheck}
                onClick={() => {
                  submittedEl.current!.value = Date.now().toString();
                }}
              />
            </label>
            <ListInput
              name="submitted"
              defaultValue={props.submitted}
              ref={submittedEl}
            />
          </ListFieldSet>
          <ListFieldSet>
            <label htmlFor="placements">{"placements"}</label>
            <ListInput
              name="placements"
              defaultValue={props.placements?.join(",")}
            />
          </ListFieldSet>
          <ListFieldSet>
            <label htmlFor="publication">{"publication"}</label>
            <ListInput name="publication" defaultValue={props.publication} />
          </ListFieldSet>
        </ListItem>
      )}
    </UserContext.Consumer>
  );
}

export function Posts() {
  const {
    data: { posts },
  } = useQuery(postsQuery);
  return (
    <List>
      {posts?.map((post, idx) => (
        <Post key={idx} {...post} />
      ))}
      <Post new />
    </List>
  );
}

export default withApollo(Posts);
