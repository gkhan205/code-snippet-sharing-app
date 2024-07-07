import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
    try {
        if(!email) return null

        return await db.user.findUnique({where: { email }})
    } catch {
        return null
    }
}