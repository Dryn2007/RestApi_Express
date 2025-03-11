const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const createNewUser = async (body) => {
  return await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  });
};

const updateUserById = async (id, body) => {
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data: body,
  });
};

const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUserById,
  deleteUser,
};
