import {
    updateProfile,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut, signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "./firebase";


const provider = new GoogleAuthProvider();




const getErrMsg = (msg) => {
    const message = msg.slice(msg.indexOf("/") + 1, msg.indexOf(")"));
    const dm = message.replaceAll("-", " ");
    return dm.toUpperCase();
}


export const sendEmailVerificationLink = async () => {
    try {
        await sendEmailVerification(auth.currentUser);
        console.log("Verification link sent");
        const emailVerificationInterval = setInterval(() => {
            auth?.currentUser?.reload()
                .then(ok => {
                    if (auth?.currentUser) {
                        if (auth.currentUser.emailVerified) {
                            location.reload();
                            clearInterval(emailVerificationInterval)
                        }
                        
                    } else {
                        clearInterval(emailVerificationInterval)
                        
                    }
                })
        }, 1000)
    }
    catch (err) {
        console.log(err);
        alert(getErrMsg(err.message));
    }
}

export const signup = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerificationLink();
    }
    catch (err) {
        console.log(err);
        alert(getErrMsg(err.message));
    }
}

export const updateProfileData = async (profileData) => {
    try {
        await updateProfile(auth.currentUser, profileData)
    }
    catch (err) {
        console.log(err);
        alert(getErrMsg(err.message));
    };
}

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (err) {
        console.log(err);
        alert(getErrMsg(err.message));

    };
}



export const continueWithGoogle = async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (err) {
        console.log(err);
        alert(getErrMsg(err.message));


    }
}

export const signin = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        if (!auth?.currentUser?.emailVerified) {
            sendEmailVerificationLink();
        }
    } catch (err) {
        console.log(err);
        alert(getErrMsg(err.message));

    }
}