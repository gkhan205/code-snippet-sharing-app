'use server';

import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client';

import { db } from '@/lib/db';

import { GetAllSnippetFuncArgs, GetAllSnippetsReturnType, SnippetItemType } from '../types';

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

export const getAllSnippetsAction = async ({page, limit = 6}: GetAllSnippetFuncArgs): Promise<GetAllSnippetsReturnType> =>  {
    try {

        const skipRecords = (page - 1) * limit;
        
        const filters: any = {
            isPublic: true,
        }         

        const records = await db.$transaction([
            db.snippets.count({
                where: filters
            }),
            db.snippets.findMany({
                where: filters, 
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
                skip: skipRecords,
                take: limit
            })
        ])

        return {
            data: records[1],
            totalPages: Math.ceil(records[0] / limit)
        }
        
    } catch (err) {
        console.log(err)
        return {
            data: [],
            totalPages: 0
        }
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