import { addDoc, collection, getDocs, getFirestore, updateDoc, doc, increment, DocumentData, Timestamp, query, where } from "@firebase/firestore";
import { app } from "./config";
import { getTotalUsers } from "./users.models";

const firebase = getFirestore(app);

export async function stats() {
    const db = collection(firebase, "stats");
    const querySnapshot = await getDocs(db);
    const stats: DocumentData[] = [];

    querySnapshot.forEach((doc) => {
        stats.push(doc.data());
    });

    if (stats.length === 0) {
        const user = await getTotalUsers();
        await addDoc(db, {
            requests: 0,
            users: user,
            features: 0,
            visitors: 0
        });
    }

    return stats;
}

export async function incrementCounter(counterName: string) {
    const db = collection(firebase, "stats");
    const querySnapshot = await getDocs(db);

    if (querySnapshot.empty) {
        console.error("No documents in the 'stats' collection.");
        return;
    }

    const statsDoc = querySnapshot.docs[0];
    const statsRef = doc(firebase, "stats", statsDoc.id);

    await updateDoc(statsRef, {
        [counterName]: increment(1)
    });
}

export async function Requests() {
    await incrementCounter("requests");
}

export async function Features() {
    await incrementCounter("features");
}

export async function Visitors() {
    await incrementCounter("visitors");
}

export async function getStats() {
    const db = collection(firebase, "stats");
    const querySnapshot = await getDocs(db);
    const stats: DocumentData[] = [];

    querySnapshot.forEach((doc) => {
        stats.push(doc.data());
    });

    return stats;
}

export async function requestToday() {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const startOfDayTimestamp = Timestamp.fromDate(startOfDay);
        const endOfDayTimestamp = Timestamp.fromDate(endOfDay);

        const requestsRef = collection(firebase, "requests");
        const q = query(
            requestsRef,
            where("timestamp", ">=", startOfDayTimestamp),
            where("timestamp", "<=", endOfDayTimestamp)
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.size;
    } catch (error) {
        console.error("Error getting requests for today: ", error);
        throw new Error("Failed to fetch requests for today");
    }
}