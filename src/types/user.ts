import { User, PrismaClient } from "@prisma/client";

//o servico aqui eh so retornar um tipo que representa um usuario criado a partir do database
export type createUserDTO = Pick<User, "name" | "email" | "password" | "majorId">
export type loginDTO = Pick<User, "email" | "password">
