'use server';

import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client';

import { db } from '@/lib/db';

import { SnippetItemType } from '../types';

export type CreateSnippetType = Prisma.Args<typeof db.snippets, 'create'>['data']

export const createSnippetAction = async (snippet: CreateSnippetType) => {
    try {
         await db.snippets.create({data: snippet})
         revalidatePath('/feed')
    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

export const getAllSnippetsAction = async (): Promise<SnippetItemType[]> =>  {
    try {

        return db.snippets.findMany({
                where: {
                    isPublic: true
                }, 
                include: {
                    author: {
                        select: {
                            name: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                },
            })
        
    } catch (err) {
        console.log(err)
        return []
    }
}

export const getAllSnippetByIdAction = async (id: string): Promise<SnippetItemType | null> =>  {
    try {
        return await db.snippets.findUnique({
         where: {
            id
         }, 
         include: {
            author: {
                select: {
                    name: true
                }
            }
         }
        })
        
    } catch (err) {
        console.log(err)
        return null
    }
}