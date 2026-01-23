import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../../supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, userData?: any) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUpWithEmail = async (email: string, password: string, userData?: any) => {
    console.log("Starting signUpWithEmail with email:", email);
    
    // Check if the user is already registered
    console.log("Checking if user is already registered...");
    const { data: existingUser, error: fetchError } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', email)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 is the error code for "no rows found", which is expected if the user is not registered
      console.error("Error checking existing user:", fetchError);
      throw fetchError;
    }

    if (existingUser) {
      console.log("User already registered with email:", email);
      throw new Error('User already registered');
    }

    console.log("No existing user found. Proceeding with sign-up...");
    console.log("Attempting to sign up with email:", email);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    console.log("Sign-up response received:", { data, error });
    if (error) {
      console.error("Sign-up error details:", error);
      throw error;
    }

    const user = data.user;
    console.log("User created successfully:", user);
    if (user && userData) {
      try {
        let photoURL = '';
        // TODO: Implement Cloudflare R2 upload for photo
        // For now, skip photo upload

        // Remove password and photo file from data to be saved
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, confirmPassword, photo, firstName, lastName, birthYear, gender, relationship, country, state, city, address, phoneNumber, languages, quranLevel, suitableTime, expectations, username, ...otherData } = userData;
        console.log("Extracted user data:", { firstName, lastName, birthYear, gender, relationship, country, state, city, address, phoneNumber, languages, quranLevel, suitableTime, expectations, username });

        console.log("Attempting to insert user data into profiles table...");
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            name: `${firstName} ${lastName}`,
            email: email,
            photo_url: photoURL,
            role: 'parent',
            birth_year: birthYear,
            gender,
            relationship,
            country,
            state,
            city,
            address,
            phone: phoneNumber,
            languages,
            quran_level: quranLevel,
            suitable_time: suitableTime,
            expectations,
            username,
            status: 'pending'
          });
        console.log("Insert operation completed with response:", { insertError });
        if (insertError) {
          console.error("Database error details:", insertError);
          throw insertError;
        }
        console.log("User data saved successfully to profiles table.");
      } catch (error) {
        console.error("Error saving user data:", error);
        throw error;
      }
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    user,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}