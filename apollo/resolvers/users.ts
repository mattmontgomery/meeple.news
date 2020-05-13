import db from "../../lib/db/firebase";
import { User } from "../../lib/interfaces";
import { firestore } from "firebase";

export default async function users(): Promise<User[]> {
  const querySnapshot = await db.collection("users").get();
  return await Promise.all(querySnapshot.docs.map(resolveUser));
}

export async function resolveUser(
  doc: firestore.QueryDocumentSnapshot<firestore.DocumentData>
): Promise<User> {
  const data = await doc.data();
  return data
    ? {
        id: doc.id,
        ...data,
        displayName: data.displayName,
      }
    : null;
}
