import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: { id: true, firstName: true, lastName: true, email: true },
  });
};


export const createNewUser = async (body) => {
  return await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  });
};

export const updateUserById = async (id, body) => {
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data: body,
  });
};

export const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id: parseInt(id) },
  });
};
