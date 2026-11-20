# Firestore Security Specification — Rasoi & Realm

## 1. Data Invariants
1. **Default Deny**: No path is readable or writable unless explicitly matched and authorized.
2. **PII Isolation**: `/users/{userId}` stores the user's `email` and profile details. Only the authenticated, verified owner (`request.auth.uid == userId && request.auth.token.email_verified == true`) can read, create, or update their own document. Blanket `list` queries on `/users` are strictly forbidden.
3. **Subcollection Ownership & Master Gate**: `/users/{userId}/savedRecipes/{recipeId}` requires both the path owner (`request.auth.uid == userId`), `exists(/databases/$(database)/documents/users/$(userId))`, and `incoming().ownerId == request.auth.uid`.
4. **Immutable Fields**: `uid` and `createdAt` on `/users/{userId}` cannot be changed on update. `id`, `ownerId`, and `savedAt` on `/users/{userId}/savedRecipes/{recipeId}` are validated strictly with server timestamps (`request.time`).
5. **Path ID Poisoning Guard**: All `{userId}` and `{recipeId}` path variables on single-doc operations are validated with `isValidId()` (`^[a-zA-Z0-9_\-]+$`, max 128 chars).
6. **Strict Schema Enforcement**: `keys().hasAll(...)` and `keys().hasOnly(...)` block shadow fields, and every string enforces `.size()` limits.

## 2. Adversarial "Dirty Dozen" Test Payloads
1. Unauthenticated `get` on `/users/userA` -> `PERMISSION_DENIED`
2. Authenticated `userB` attempting `get` on `/users/userA` (PII leak) -> `PERMISSION_DENIED`
3. Authenticated `userA` attempting `list` on `/users` -> `PERMISSION_DENIED`
4. `userA` creating `/users/userA` with `email_verified == false` -> `PERMISSION_DENIED`
5. `userA` creating `/users/userA` with spoofed `uid: "userB"` -> `PERMISSION_DENIED`
6. `userA` creating `/users/userA` with shadow field `isAdmin: true` -> `PERMISSION_DENIED`
7. `userA` updating `/users/userA` trying to mutate `createdAt` or `uid` -> `PERMISSION_DENIED`
8. `userA` creating `/users/userA` with client-forged `createdAt` != `request.time` -> `PERMISSION_DENIED`
9. `userB` attempting `create` or `delete` on `/users/userA/savedRecipes/rec1` -> `PERMISSION_DENIED`
10. `userA` creating `/users/userA/savedRecipes/../../bad` (ID poisoning >128 chars or invalid chars) -> `PERMISSION_DENIED`
11. `userA` creating `/users/userA/savedRecipes/rec1` with mismatched `ownerId: "userB"` -> `PERMISSION_DENIED`
12. `userA` creating `/users/userA/savedRecipes/rec1` with invalid `category` enum or oversized `titleEnglish` (>200 chars) -> `PERMISSION_DENIED`
