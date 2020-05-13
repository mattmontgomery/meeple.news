import db from "../../lib/db/firebase";
import { Post } from "../../lib/interfaces";
import { resolveUser } from "./users";
import { firestore } from "firebase";
import { DocumentData, WhereFilterOp } from "@google-cloud/firestore";

export interface PostOptionsWhere {
  field: string;
  value: string | string[];
  op?: WhereFilterOp;
}
interface PostOptions {
  where?: PostOptionsWhere;
  limit?: number;
}

export default async function postsResolver(
  options: PostOptions = {}
): Promise<Post[]> {
  const postsRef = db
    .collection("posts")
    .orderBy("submitted", "desc")
    .where(options.where.field, options.where.op, options.where.value)
    .limit(options.limit ?? 5);
  const querySnapshot = await postsRef.get();
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
    submitted: data.submitted!.toDate(),
    placements: data.placements,
  };
}
