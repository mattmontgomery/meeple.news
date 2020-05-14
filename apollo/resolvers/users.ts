import db from "../../lib/db/firebase";
import { User } from "../../lib/interfaces";
import { firestore } from "firebase";

export default async function users(): Promise<User[]> {
  const querySnapshot = await db.collection("users").get();
  return await Promise.all(querySnapshot.docs.map(resolveUser));
}
export async function usersJwtResolver({
  jwt,
  email,
}: {
  jwt: string;
  email: string;
}): Promise<User> {
  const querySnapshot = await db
    .collection("users")
    .where("jwt", "==", jwt)
    .where("email", "==", email)
    .limit(1)
    .get();
  if (querySnapshot.docs.length !== 1) {
    return null;
  }
  return await resolveUser(querySnapshot.docs[0]);
}

export async function resolveUser(
  doc: firestore.QueryDocumentSnapshot<firestore.DocumentData>
): Promise<User> {
  const data = await doc.data();
  return data
    ? {
        id: doc.id,
        ...data,
        email: data.email,
        displayName: data.displayName,
      }
    : null;
}
