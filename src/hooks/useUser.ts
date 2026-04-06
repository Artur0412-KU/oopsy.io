import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../services/supabase/supabase";

export type UserProfile = {
  avatar_url?: string;
  username?: string;
  name?: string;
  email: string;
};

type UserMetadata = {
  avatar_url?: unknown;
  username?: unknown;
  custom_claims?: {
    global_name?: unknown;
  };
};

function getOptionalString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function mapUserProfile(user: User | null): UserProfile | undefined {
  if (!user) {
    return undefined;
  }

  const metadata = (user.user_metadata ?? {}) as UserMetadata;

  return {
    avatar_url: getOptionalString(metadata.avatar_url),
    username: getOptionalString(metadata.username),
    name: getOptionalString(metadata.custom_claims?.global_name),
    email: user.email ?? "",
  };
}

export function useUser() {
  const [user, setUser] = useState<UserProfile>();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const syncUser = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (!isMounted) {
        return;
      }

      setUser(mapUserProfile(currentUser));
      setIsUserLoggedIn(!!currentUser);
    };

    void syncUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = session?.user ?? null;

      setUser(mapUserProfile(nextUser));
      setIsUserLoggedIn(!!nextUser);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    user,
    isUserLoggedIn,
    signOut,
  };
}
