export type Maybe<T> = T | null | undefined

/** makes model types and prisma responses compatible */
export type PrismaPromise<T> = Promise<PrismaArrayable<T>>

export type PrismaArrayable<T> = T extends Array<infer U> ? Array<PrismaObject<U>> : PrismaObject<T>

export type PrismaObject<T> = {
  [K in keyof T]: T[K] extends undefined | T[K] ? NonNullable<T[K]> | null : T[K]
}
