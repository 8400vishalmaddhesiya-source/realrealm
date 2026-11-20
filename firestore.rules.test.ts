/**
 * Firestore Security Rules Verification Spec (Dirty Dozen Adversarial Matrix)
 * Validates that DRAFT_firestore.rules / firestore.rules enforce all Eight Pillars.
 */
export const dirtyDozenCases = [
  { id: 1, name: 'Unauthenticated get on /users/userA', expected: 'PERMISSION_DENIED' },
  { id: 2, name: 'Cross-user PII get by userB on /users/userA', expected: 'PERMISSION_DENIED' },
  { id: 3, name: 'Blanket list query on /users collection', expected: 'PERMISSION_DENIED' },
  { id: 4, name: 'Create /users/userA with email_verified=false', expected: 'PERMISSION_DENIED' },
  { id: 5, name: 'Spoofed uid field in /users/userA create', expected: 'PERMISSION_DENIED' },
  { id: 6, name: 'Shadow field isAdmin=true on /users/userA create', expected: 'PERMISSION_DENIED' },
  { id: 7, name: 'Mutating immutable createdAt or uid on /users/userA update', expected: 'PERMISSION_DENIED' },
  { id: 8, name: 'Client-forged createdAt timestamp != request.time', expected: 'PERMISSION_DENIED' },
  { id: 9, name: 'Cross-user create/delete on /users/userA/savedRecipes/rec1', expected: 'PERMISSION_DENIED' },
  { id: 10, name: 'ID poisoning (>128 chars or invalid regex) on recipeId', expected: 'PERMISSION_DENIED' },
  { id: 11, name: 'Spoofed ownerId on savedRecipes create', expected: 'PERMISSION_DENIED' },
  { id: 12, name: 'Invalid category enum or oversized titleEnglish (>200)', expected: 'PERMISSION_DENIED' },
];
