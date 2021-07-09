import * as functions from "firebase-functions";
import Filter = require("bad-words");
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

exports.detectEvilusers = functions.firestore
  .document("messages/{msgId}")
  .onCreate(async (doc, ctx) => {
    const filter = new Filter();
    const { text, uid } = doc.data();

    if (filter.isProfane(text)) {
      const cleaned = filter.clean(text);
      await doc.ref.update({ text: `I got banned for saying ${cleaned}` });

      await db.collection("banned").doc(uid).set({});
    }
  });
