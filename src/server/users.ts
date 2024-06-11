import type { User } from "@prisma/client";
import { prisma } from "./prisma";

export async function createUser(data: User) {
  try {
    const user = await prisma.user.create({ data });
    return { user };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unknown error occurred" };
  }
}

export async function getUserById({
  id,
  clerkUserId,
}: {
  id?: string;
  clerkUserId?: string;
}) {
  try {
    if (!id && !clerkUserId) {
      throw new Error("id or clerkUserId is required");
    }

    const query = id ? { id } : { clerkUserId };
    const user = await prisma.user.findUnique({ where: query });
    return { user };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unknown error occurred" };
  }
}

export async function updateUser({
  id,
  clerkUserId,
  data,
}: {
  id?: string;
  clerkUserId?: string;
  data: Partial<User>;
}) {
  try {
    if (!id && !clerkUserId) {
      throw new Error("id or clerkUserId is required");
    }

    const query = id ? { id } : { clerkUserId };
    const user = await prisma.user.update({ where: query, data });
    return { user };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unknown error occurred" };
  }
}

export async function deleteUser({
  id,
  clerkUserId,
}: {
  id?: string;
  clerkUserId?: string;
}) {
  try {
    if (!id && !clerkUserId) {
      throw new Error("id or clerkUserId is required");
    }

    const query = id ? { id } : { clerkUserId };
    const user = await prisma.user.delete({ where: query });
    return { user };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unknown error occurred" };
  }
}

export async function getUsers() {
  try {
    const users: User[] = await prisma.user.findMany();
    return { users };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unknown error occurred" };
  }
}
