"use server";

import { createUser, getUserById } from "@/db/users";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { type User } from "@prisma/client";
import { type User as ClerkUser } from "@clerk/backend";

export const completeOnboarding = async (formData: FormData) => {
  // Get userId from Clerk session
  const { userId: clerkUserId } = auth();

  if (!clerkUserId) return { message: "No Logged In User" };

  // Lookup user from DB
  const { user: dbUser } = await getUserById({ clerkUserId });

  // If user not in our DB, create it from Clerk data
  if (!dbUser) {
    const clerkUser: ClerkUser = await clerkClient.users.getUser(clerkUserId);
    const email = clerkUser.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId,
    )?.emailAddress;

    const newDbUser: Partial<User> = {
      clerkUserId: clerkUser.id,
      email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      imageUrl: clerkUser.imageUrl,
    };

    await createUser(newDbUser as User);
  }

  // Update Clerk user metadata to indicate onboarding completion
  try {
    const res = await clerkClient.users.updateUser(clerkUserId, {
      publicMetadata: {
        onboardingComplete: true,
      },
    });
    return { message: res.publicMetadata };
  } catch (err) {
    return { error: "There was an error updating the user metadata." };
  }
};
