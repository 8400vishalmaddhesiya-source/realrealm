import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  OperationType,
} from '../firebase';
import { Recipe } from '../types/recipe';

interface AuthContextValue {
  user: User | null;
  authReady: boolean;
  isGuest: boolean;
  authBusy: boolean;
  authError: string | null;
  savedRecipes: Recipe[];
  savedIds: Set<string>;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  enterGuestMode: () => void;
  exitGuestMode: () => void;
  toggleSaveRecipe: (recipe: Recipe) => Promise<void>;
  isRecipeSaved: (recipeId: string) => boolean;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function stripUndefinedDeep<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => stripUndefinedDeep(item)) as unknown as T;
  }
  if (value !== null && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v !== undefined) {
        out[k] = stripUndefinedDeep(v);
      }
    }
    return out as T;
  }
  return value;
}

function sanitizeDocId(rawId: string): string {
  const cleaned = rawId.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128);
  return cleaned || `recipe-${Date.now().toString(36)}`;
}

function mapFirebaseAuthError(err: unknown): string {
  const code = (err as { code?: string })?.code ?? '';
  if (code === 'auth/popup-blocked') {
    return 'Browser blocked the Google sign-in popup. Please allow popups for this site and try again.';
  }
  if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
    return 'Google sign-in window was closed before completing authentication.';
  }
  if (code === 'auth/network-request-failed') {
    return 'Network error during Google sign-in. Please check your connection and retry.';
  }
  if (code === 'auth/unauthorized-domain') {
    return 'This domain is not authorized in Firebase Authentication settings yet.';
  }
  return err instanceof Error ? err.message : 'Unable to sign in with Google right now.';
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [asyncError, setAsyncError] = useState<Error | null>(null);

  if (asyncError) {
    throw asyncError;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);

      if (currentUser) {
        setIsGuest(false);
        setAuthError(null);

        const userRef = doc(db, 'users', currentUser.uid);
        const path = `users/${currentUser.uid}`;

        try {
          const snap = await getDoc(userRef);
          const safeDisplayName = (currentUser.displayName || currentUser.email?.split('@')[0] || 'Chef').slice(0, 120);
          const safeEmail = (currentUser.email || '').slice(0, 254);
          const safePhoto = currentUser.photoURL && currentUser.photoURL.length <= 512 ? currentUser.photoURL : undefined;

          if (!snap.exists()) {
            const payload: Record<string, unknown> = {
              uid: currentUser.uid,
              displayName: safeDisplayName,
              email: safeEmail,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            };
            if (safePhoto) payload.photoURL = safePhoto;
            await setDoc(userRef, payload);
          } else {
            const updatePayload: Record<string, unknown> = {
              displayName: safeDisplayName,
              updatedAt: serverTimestamp(),
            };
            if (safePhoto) updatePayload.photoURL = safePhoto;
            await updateDoc(userRef, updatePayload);
          }
        } catch (err) {
          try {
            handleFirestoreError(err, OperationType.WRITE, path);
          } catch (wrapped) {
            setAsyncError(wrapped instanceof Error ? wrapped : new Error(String(wrapped)));
          }
        }
      } else {
        setSavedRecipes([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authReady || !user) {
      setSavedRecipes([]);
      return;
    }

    const colPath = `users/${user.uid}/savedRecipes`;
    const recipesQuery = query(
      collection(db, 'users', user.uid, 'savedRecipes'),
      where('ownerId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      recipesQuery,
      (snapshot) => {
        const items: Recipe[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data?.recipePayload) {
            items.push({
              ...(data.recipePayload as Recipe),
              id: docSnap.id,
            });
          }
        });
        setSavedRecipes(items);
      },
      (err) => {
        try {
          handleFirestoreError(err, OperationType.LIST, colPath);
        } catch (wrapped) {
          setAsyncError(wrapped instanceof Error ? wrapped : new Error(String(wrapped)));
        }
      }
    );

    return () => unsubscribe();
  }, [authReady, user]);

  const signInWithGoogle = async () => {
    setAuthBusy(true);
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      setIsGuest(false);
    } catch (err) {
      setAuthError(mapFirebaseAuthError(err));
    } finally {
      setAuthBusy(false);
    }
  };

  const signOutUser = async () => {
    setAuthBusy(true);
    try {
      await signOut(auth);
      setIsGuest(false);
      setSavedRecipes([]);
    } catch (err) {
      setAuthError(mapFirebaseAuthError(err));
    } finally {
      setAuthBusy(false);
    }
  };

  const enterGuestMode = () => {
    setAuthError(null);
    setIsGuest(true);
  };

  const exitGuestMode = () => {
    setIsGuest(false);
  };

  const savedIds = new Set(savedRecipes.map((r) => r.id));

  const isRecipeSaved = (recipeId: string) => savedIds.has(sanitizeDocId(recipeId));

  const toggleSaveRecipe = async (recipe: Recipe) => {
    if (!user) {
      setAuthError('Please sign in with Google to save recipes to your personal vault.');
      return;
    }

    const safeId = sanitizeDocId(recipe.id);
    const docPath = `users/${user.uid}/savedRecipes/${safeId}`;
    const docRef = doc(db, 'users', user.uid, 'savedRecipes', safeId);

    try {
      if (savedIds.has(safeId)) {
        await deleteDoc(docRef);
      } else {
        const cleanRecipe = stripUndefinedDeep({ ...recipe, id: safeId });
        await setDoc(docRef, {
          id: safeId,
          ownerId: user.uid,
          titleEnglish: cleanRecipe.titleEnglish.slice(0, 200),
          titleNative: cleanRecipe.titleNative.slice(0, 200),
          category: cleanRecipe.category,
          region: cleanRecipe.region.slice(0, 120),
          recipePayload: cleanRecipe,
          savedAt: serverTimestamp(),
        });
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, docPath);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authReady,
        isGuest,
        authBusy,
        authError,
        savedRecipes,
        savedIds,
        signInWithGoogle,
        signOutUser,
        enterGuestMode,
        exitGuestMode,
        toggleSaveRecipe,
        isRecipeSaved,
        clearAuthError: () => setAuthError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
