'use server'

import { prisma } from ".."

export async function createProfile(userId: string, name: string, isAnon?: boolean) { 
    const profile = await prisma.userProfile.create({
        data: {
            id: userId,
            name:  !name ? null : name,
            isanon: isAnon,
        },
    })
    return profile
}