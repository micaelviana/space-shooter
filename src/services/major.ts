import { PrismaClient, Major } from "@prisma/client";
import { createMajorDTO } from '../types/major'

const prisma = new PrismaClient()

export const getMajors = async (): Promise<Major[]> => {
  return await prisma.major.findMany()
}

export const createMajor = async (major: createMajorDTO) => {
  return await prisma.major.create({ data: major })
}

//se ele nao encontrar o id ele vai retornar ou major ou nulo
export const getMajor = async (id: string): Promise<Major | null> => {
  return await prisma.major.findFirst({ where: { id } }) //ele entende isso como id:id, como nao coloca o nome ele entende que o que eu quero pegar eh um parametro com o exato mesmo nome que eu passei
}

export const removeMajor = async (id: string): Promise<Major | null> => {
  return await prisma.major.delete({ where: { id } })
}

export const updateMajor = async (id: string, major: createMajorDTO): Promise<Major | null> => {
  return await prisma.major.update({
    where: { id },
    data: major
  })
}
