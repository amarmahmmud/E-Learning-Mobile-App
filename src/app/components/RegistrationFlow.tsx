import React, { useState } from "react";
import { RegistrationStep1 } from "./registration/RegistrationStep1";
import { RegistrationStep2 } from "./registration/RegistrationStep2";
import { RegistrationComplete } from "./registration/RegistrationComplete";
import { useAuth } from "../contexts/AuthContext";

export type RegistrationData = {
  photo: File | null;
  firstName: string;
  lastName: string;
  birthYear: string;
  gender: string;
  relationship: string;
  country: string;
  state: string;
  city: string;
  address: string;
  email: string;
  phoneNumber: string;
  languages: string[];
  quranLevel: string;
  suitableTime: string;
  expectations: string;
  username: string;
  password: string;
  confirmPassword: string;
  videoWatched: boolean;
};

interface RegistrationFlowProps {
  onComplete: () => void;
}

export function RegistrationFlow({
  onComplete,
}: RegistrationFlowProps) {
  const { signUpWithEmail } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    1 | 2 | "complete"
  >(1);
  const [registrationData, setRegistrationData] =
    useState<RegistrationData>({
      photo: null,
      firstName: "",
      lastName: "",
      birthYear: "",
      gender: "",
      relationship: "",
      country: "",
      state: "",
      city: "",
      address: "",
      email: "",
      phoneNumber: "",
      languages: [],
      quranLevel: "0",
      suitableTime: "",
      expectations: "",
      username: "",
      password: "",
      confirmPassword: "",
      videoWatched: false,
    });

  const handleStep1Complete = (
    data: Partial<RegistrationData>,
  ) => {
    setRegistrationData({ ...registrationData, ...data });
    setCurrentStep(2);
  };

  const handleStep2Complete = async (
    data: Partial<RegistrationData>,
  ) => {
    const updatedData = { ...registrationData, ...data };
    setRegistrationData(updatedData);
    setError(null);
    setIsSubmitting(true);

    try {
      // Create Firebase user account and save data
      await signUpWithEmail(updatedData.email, updatedData.password, updatedData);
      setCurrentStep("complete");
    } catch (error: any) {
      console.error('Registration failed:', error);
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
  };

  return (
    <>
      {error && (
        <div className="fixed top-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
      )}
      
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600 mb-4"></div>
            <p className="text-gray-700">Creating your account...</p>
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <RegistrationStep1
          initialData={registrationData}
          onComplete={handleStep1Complete}
        />
      )}
      {currentStep === 2 && (
        <RegistrationStep2
          onComplete={handleStep2Complete}
          onBack={handleBackToStep1}
        />
      )}
      {currentStep === "complete" && (
        <RegistrationComplete onFinish={onComplete} />
      )}
    </>
  );
}
