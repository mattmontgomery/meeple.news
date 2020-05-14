import db from "@db/firebase";
import { Post } from "../../lib/interfaces";
import { resolveUser } from "./users";
import { firestore } from "firebase";
import "firebase/auth";
import { DocumentData, WhereFilterOp } from "@google-cloud/firestore";
import authenticate from "@db/authenticate";

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
    .limit(options.limit ?? 60);
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
    thumbnail: data.thumbnail,
    link: data.link,
    publication: data.publication,
    submitted: data.submitted!.toDate(),
    placements: data.placements,
  };
}

export async function updatePostResolver(_, args, context, ___) {
  await authenticate(context?.token, "admin");
  if (args.id) {
    const doc = await db.collection(`posts`).doc(args.id);
    doc.set(
      {
        ...args,
      },
      {
        merge: true,
      }
    );
    return await resolveReferences(await doc.get());
  } else {
    const doc = await db.collection("posts").add({
      ...args,
    });
    return await resolveReferences(await doc.get());
  }
}
