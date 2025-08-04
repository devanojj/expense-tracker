import { useEffect, useState } from 'react';
import { query, collection, orderBy, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase-config'; 
import { useGetUserInfo } from './useGetUserInfo';


export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([]);

    const transactionsCollectionRef = collection(db, "transactions");
    const { userID } = useGetUserInfo();

    let unsubscribe;

    const getTransactions = async () => {
        try{

            const queryTransactions = query(
                transactionsCollectionRef, 
                where("userID", "==", userID),
                orderBy("createdAt")
                
            );

            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {

                let docs = [];

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;

                    docs.push({...data, id});
                });

                setTransactions(docs);
            });

        } catch (error) {
            console.error(error);
        }

        return () => unsubscribe();
    }


    useEffect(() => {
        getTransactions();
    }, []);


    return {transactions};
}