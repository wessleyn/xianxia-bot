'use server'

import { prisma } from ".."

console.log(process.env)
export async function createProfile(userId: string, name: string, isAnon?: boolean) { 
    const profile = await prisma.profiles.create({
        data: {
            id: userId,
            name:  !name ? null : name,
            isanon: isAnon,
        },
    })
    return profile
}