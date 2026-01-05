import { useState } from "react";
import { RegistrationStep1 } from "./registration/RegistrationStep1";
import { RegistrationStep2 } from "./registration/RegistrationStep2";
import { RegistrationComplete } from "./registration/RegistrationComplete";

export type RegistrationData = {
  photo: File | null;
  fullName: string;
  age: string;
  gender: string;
  role: string;
  country: string;
  city: string;
  email: string;
  languages: string[];
  quranLevel: string;
  suitableTime: string;
  expectations: string;
  username: string;
  password: string;
  phoneNumber: string;
  videoWatched: boolean;
};

interface RegistrationFlowProps {
  onComplete: () => void;
}

export function RegistrationFlow({
  onComplete,
}: RegistrationFlowProps) {
  const [currentStep, setCurrentStep] = useState<
    1 | 2 | "complete"
  >(1);
  const [registrationData, setRegistrationData] =
    useState<RegistrationData>({
      photo: null,
      fullName: "",
      age: "",
      gender: "",
      role: "",
      country: "",
      city: "",
      email: "",
      languages: [],
      quranLevel: "0",
      suitableTime: "",
      expectations: "",
      username: "",
      password: "",
      phoneNumber: "",
      videoWatched: false,
    });

  const handleStep1Complete = (
    data: Partial<RegistrationData>,
  ) => {
    setRegistrationData({ ...registrationData, ...data });
    setCurrentStep(2);
  };

  const handleStep2Complete = (
    data: Partial<RegistrationData>,
  ) => {
    setRegistrationData({ ...registrationData, ...data });
    setCurrentStep("complete");
  };

  const handleBackToStep1 = () => {
    setCurrentStep(1);
  };

  return (
    <>
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