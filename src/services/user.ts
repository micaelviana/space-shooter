import { PrismaClient, User } from "@prisma/client";
import { createUserDTO } from "../types/user";
import { compare, genSalt, hash } from "bcryptjs";
const prisma = new PrismaClient()

export const getUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany()
}

export const getUser = async (id: string): Promise<User | null> => {
  return await prisma.user.findFirst({
    where: { id },
    include: {
      major: true
    }
  })
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findFirst({
    where: {
      email: email, // Você pode usar a forma abreviada: `email`
    },
  });
};

export const createUser = async (user: createUserDTO): Promise<User> => {
  const salt = await genSalt()
  const password = await hash(user.password, salt)
  return await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: password,
      majorId: user.majorId,
    }
  })
}

export const checkAuth = async (email: string, password: string): Promise<boolean> => {
  const user = await prisma.user.findFirst({ where: { email } })
  if (user) {
    return await compare(password, user.password)
  }
  return false
}


export const removeUser = async (id: string): Promise<User | null> => {
  return await prisma.user.delete({ where: { id } })
}

export const updateUser = async (id: string, user: createUserDTO): Promise<User> => {
  return await prisma.user.update({
    where: { id },
    data: user,
  });
};

export const getRanking = async () => {
  const topScores = await prisma.gameSession.groupBy({
    by: ['userId'],
    _max: {
      score: true,
    },
    orderBy: {
      _max: {
        score: 'desc',
      },
    },
    take: 10,
  });

  const userIds = topScores.map(s => s.userId);
  const users = await prisma.user.findMany({
    where: {
      id: { in: userIds },
    },
    select: {
      id: true,
      name: true,
    }
  });

  // Now combine them
  return topScores.map(scoreInfo => {
    const user = users.find(u => u.id === scoreInfo.userId);
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      userName: user ? user.name : 'Unknown',
      score: scoreInfo._max.score,
    };
  });
};

export const saveScoreUser = async (score: number, userId: string) => {
  return prisma.gameSession.create({ data: { score, userId } });
};

export const updateScoreUser = async (score: number, userId: string) => {
  return prisma.gameSession.updateMany({
    where: { userId: userId },
    data: { score },
  });
};
