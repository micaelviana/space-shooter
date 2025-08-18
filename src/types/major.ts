import { Major, PrismaClient } from "@prisma/client";

export type createMajorDTO = Pick<Major, "code"| "name"| "description">
