import { useEffect, useState } from "react";

const TRIAL_COUNT_STORAGE_KEY = "trialCount";
const FREE_TRIAL_LIMIT = 1;

function readTrialCount() {
  if (typeof window === "undefined") {
    return 0;
  }

  const storedTrialCount = window.localStorage.getItem(TRIAL_COUNT_STORAGE_KEY);
  const parsedTrialCount = Number.parseInt(storedTrialCount ?? "0", 10);

  return Number.isNaN(parsedTrialCount) ? 0 : parsedTrialCount;
}

export function useTrial() {
  const [trialCount, setTrialCount] = useState(readTrialCount);

  useEffect(() => {
    window.localStorage.setItem(TRIAL_COUNT_STORAGE_KEY, String(trialCount));
  }, [trialCount]);

  const incrementTrial = () => {
    setTrialCount((currentCount) => currentCount + 1);
  };

  const canGenerate = (isLoggedIn: boolean) => {
    return isLoggedIn || trialCount < FREE_TRIAL_LIMIT;
  };

  return {
    trialCount,
    incrementTrial,
    canGenerate,
  };
}
