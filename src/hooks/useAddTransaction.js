import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../config/firebase-config";
export const useAddTransaction = () => {
    const transactionCollectionRef = collection(db, "transactions");
    
    const addTransaction = async ({
        description,
        transactionAmount,
        transactionType
    }) => {
        await addDoc(transactionCollectionRef, {
            userID: "",
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp()
        });
    }
    return { addTransaction }
}