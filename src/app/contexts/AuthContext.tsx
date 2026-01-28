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
  uploadPhoto: (file: File, userId: string) => Promise<string>;
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
        
        // Upload photo to Cloudflare R2 if provided
        if (userData.photo && userData.photo instanceof File) {
          console.log("Uploading photo to Cloudflare R2...");
          try {
            photoURL = await uploadPhoto(userData.photo, user.id);
            console.log("Photo uploaded successfully:", photoURL);
          } catch (photoError) {
            console.error("Failed to upload photo:", photoError);
            // Continue without photo - don't fail registration
          }
        }

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

  const uploadPhoto = async (file: File, userId: string): Promise<string> => {
    const cloudflareWorkerUrl = import.meta.env.VITE_CLOUDFLARE_WORKER_URL;
    
    if (!cloudflareWorkerUrl) {
      console.error('Cloudflare Worker URL not configured');
      throw new Error('Photo upload service not configured');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    console.log('Uploading photo to Cloudflare Worker...');
    
    const response = await fetch(cloudflareWorkerUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Photo upload failed:', errorText);
      throw new Error('Failed to upload photo');
    }

    const result = await response.json();
    console.log('Photo uploaded successfully:', result.url);
    
    return result.url;
  };

  const value = {
    user,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    logout,
    uploadPhoto,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}