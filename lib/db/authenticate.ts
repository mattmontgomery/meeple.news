import db from "@db/firebase";

export default async function authenticate(token, requiredRole = "admin") {
  return new Promise(async (resolve, reject) => {
    const user = await db.collection("users").where("jwt", "==", token).get();
    if (user.docs.length === 0) {
      reject("Authentication issue");
    } else {
      resolve();
    }
  });
}
