'use server';


import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK =  60 * 60 * 24 * 7 * 1000

export async function signUp(params: SignUpParams) {
    const {uid, name, password, email} = params;

    try{
        const userRecord = await db.collection('users').doc(uid).get();

        if(userRecord.exists){
            return {
                success: false,
                message: "User already exists, please sign in instead."
            }
        }

        await db.collection('users').doc(uid).set({
            name, email
        })

        return {
            success: true,
            message: "User created successfully. Please sign in."
        }

    }catch(e: any){
        console.error("Error creating user : ",e);

        if(e.code === 'auth/email-already-exists'){
            return {
                success: false,
                message: "This Email is already in use"
            }
        }

        return {
            success: false,
            message: "Failed to create an account"
        }

    }
    
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();
    
    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK,
    });

    cookieStore.set('session', sessionCookie,{
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
    })
}

export async function signIn(params: SignInParams) {
    const {email,idToken} = params;

    try{
        const userRecord = await auth.getUserByEmail(email);

        if(!userRecord){
            return {
                success:false,
                message: "User does not exist. Create an account instead"
            }
        }
        
        await setSessionCookie(idToken);

        return {
            success: true,
            message: "Sign In Successfully"
        }

    }catch(e){
        console.log(e);

        return {
            success:false,
            message: "Failed to log into an account"
        }
    }
}

export async function getCurrentUser(): Promise<User | null> {
    const cookiesStore = await cookies();
    const sessionCookie = cookiesStore.get("session")?.value;

    if(!sessionCookie) return null;

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

        if(!userRecord.exists){
            return null;
        }

        return {
            ...userRecord.data(),
            id: userRecord.id
        } as User;
        
    } catch (error) {
        console.log(error);

        return null;
    }

}

export async function isAuthenticated(): Promise<boolean> {
    const user = await getCurrentUser();
    
    return !!user;
}