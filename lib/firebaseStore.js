import { doc, getDoc } from "firebase/firestore"
import { db } from "./firebase"


// export const getData = async (collectionName) => {
//     const docRef = doc(db, collectionName);
//     try {
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//             return new Response(json.stringify(docSnap), { status: 200 })
//         } else {
//             return new Response([], { status: 404 })
//         }


//     } catch (err) {
//         console.log(err)
//         return new Response("some error occured", { status: 500 })

//     }
// }


