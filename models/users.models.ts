import {
    collection,
    doc,
    setDoc,
    getFirestore,
    getDoc,
    deleteDoc,
    getDocs,
    increment,
    FieldValue
} from '@firebase/firestore';
import { randomUUID } from 'crypto';
import { app } from './config';

const firestore = getFirestore(app);

if (!firestore) throw new Error("Firestore not found");

export async function checkUsers(email: string): Promise<boolean> {
    if (!email) return false;

    try {
        const userRef = doc(firestore, "users", email);
        const docSnap = await getDoc(userRef);
        return docSnap.exists();
    } catch (error) {
        return false;
    }
}

export async function createUser(profile: any): Promise<boolean> {
    if (!profile || !profile.email) return false;
    try {
        const userRef = doc(firestore, "users", profile.email);
        await setDoc(userRef, {
            id: profile.email,
            uuid: randomUUID().toUpperCase(),
            displayName: profile.name || "Users",
            email: profile.email,
            picture: profile.picture || '',
            apikey: "ZYD-" + randomUUID().toUpperCase(),
            limit: 25,
            isAdmins: false,
            isPremium: {
                status: false,
                expired: null
            },
            totalreq: 0,
            createdAt: new Date().getTime()
        });
        return true;
    } catch (error) {
        return false;
    }
}

export async function checkPremiumUser(email: string): Promise<boolean> {
    if (!email) return false;
    try {
        const userRef = doc(firestore, "users", email);
        const docSnap = await getDoc(userRef);
        return docSnap.exists() ? docSnap.data()?.isPremium.status : false;
    } catch (error) {
        return false;
    }
}
export async function changeApikey(email: string, to: string): Promise<boolean> {
    if (!email) return false;
    if (!await checkPremiumUser(email)) return false;
    try {
        const userRef = doc(firestore, "users", email);
        await setDoc(userRef, {
            apikey: to
        }, { merge: true });
        return true;
    } catch (error) {
        return false;
    }
}
export async function getApikeyWithEmail(email: string): Promise<string> {
    if (!email) return "";
    try {
        const userRef = doc(firestore, "users", email);
        const docSnap = await getDoc(userRef);
        return docSnap.exists() ? docSnap.data()?.apikey : "";
    } catch (error) {
        return "";
    }
}
export async function getTotalUsers(): Promise<number> {
    const usersRef = collection(firestore, "users");
    const snapshot = await getDocs(usersRef);
    return snapshot.size;
}
export async function getCreatedAt(email: string) {
    const userRef = doc(firestore, "users", email);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? docSnap.data()?.createdAt : null;
}
export async function getIsPremium(email: string) {
    const userRef = doc(firestore, "users", email);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? docSnap.data()?.isPremium.status : null;
}
export async function getExpired(email: string) {
    const userRef = doc(firestore, "users", email);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? docSnap.data()?.isPremium.expired : null;
}
export async function getLimit(email: string) {
    const userRef = doc(firestore, "users", email);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? docSnap.data()?.limit : null;
}
export async function getTotalReq(email: string) {
    const userRef = doc(firestore, "users", email);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? docSnap.data()?.totalreq : null;
}
export async function getPicture(email: string) {
    const userRef = doc(firestore, "users", email);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? docSnap.data()?.picture : null;
}
export async function getApikeyUser(email: string) {
    const userRef = doc(firestore, "users", email);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? docSnap.data()?.apikey : null;
}

export async function getUser(email: string | undefined) {
    if (!email) {
        console.error("User email is missing.");
        return null;
    }

    const userRef = doc(firestore, "users", email);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }
}
