import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "./firebase"
import moment from "moment";



export const updateDoc = async (collectionName, docId, updatedData) => {
    try {
        await setDoc(doc(db, collectionName, docId), updatedData, { merge: true });

    } catch (err) {
        console.log(err)
    }
}

