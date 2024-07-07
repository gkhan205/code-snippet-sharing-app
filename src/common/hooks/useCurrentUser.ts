import {useSession, signOut} from 'next-auth/react'


export const useCurrentUser = () => {
    const {data: session, status} = useSession()
    const user: any = session?.user

    return {
        user,
        status,
        signOut
    }
}