import db from "../../lib/db/firebase";
import { Post } from "../../lib/interfaces";
import { resolveUser } from "./users";
import { firestore } from "firebase";
import { DocumentData } from "@google-cloud/firestore";

export default async function firebaseResolver(): Promise<Post[]> {
  const querySnapshot = await db
    .collection("posts")
    .orderBy("submitted", "desc")
    .get();
  return await Promise.all(querySnapshot.docs.map(resolveReferences));
}

async function resolveReferences(
  doc: firestore.QueryDocumentSnapshot<firestore.DocumentData>
): Promise<Post> {
  const data = (await doc.data()) as DocumentData;
  return {
    id: doc.id,
    title: data.title,
    submittedBy: data.submittedBy
      ? await resolveUser(await data.submittedBy.get())
      : null,
    thumbnail: data.thumbnail,
    link: data.link,
    publication: data.publication,
  };
}
