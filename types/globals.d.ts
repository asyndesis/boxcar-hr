export {};

// https://clerk.com/docs/guides/add-onboarding-flow#add-custom-claims-to-your-session-token
declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
    };
  }
}
