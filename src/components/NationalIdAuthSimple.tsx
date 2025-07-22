"use client";
import { useAuth } from "@/contexts/AuthContext";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCard,
  faArrowRight,
  faArrowLeft,
  faShieldAlt,
  faSpinner,
  faCheckCircle,
  faExclamationTriangle,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { type CitizenData } from "@/services/supabaseAuth";

interface NationalIdAuthProps {
  onSuccess: (userData: CitizenData) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export default function NationalIdAuth({
  onSuccess,
  onBack,
  isLoading = false,
}: NationalIdAuthProps) {
  const [step, setStep] = useState<
    "id-entry" | "otp-verification" | "permissions"
  >("id-entry");
  const [nationalId, setNationalId] = useState("");
  const [otp, setOtp] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [citizenData, setCitizenData] = useState<CitizenData | null>(null);
  const [displayOtp, setDisplayOtp] = useState("");
  const { user } = useAuth();

  // Permission states
  const [permissions, setPermissions] = useState({
    email: false,
    birthdate: false,
    gender: false,
    name: false,
    phoneNumber: false,
    picture: false,
  });

  // Ref for the submit button to control its state
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  // Update your existing useEffect (the one that runs on mount)
  useEffect(() => {
    console.log("🏗️ NationalIdAuth component mounted (Supabase mode)");

    // Auto-populate National ID from user profile
    if (user?.nationalId) {
      setNationalId(user.nationalId);
      console.log(
        "🔄 Auto-populated National ID from user profile:",
        user.nationalId
      );
    }

    console.log("🏗️ Initial state:", {
      step,
      nationalId,
      loading,
      error,
      success,
    });

    // Force blur any focused elements and reset button state
    setTimeout(() => {
      if (submitButtonRef.current) {
        submitButtonRef.current.blur();
        console.log("🔄 Button blurred on mount");
      }
      if (
        document.activeElement &&
        document.activeElement instanceof HTMLElement
      ) {
        document.activeElement.blur();
      }
    }, 100);

    console.log("🔄 Component mounted and state initialized");
  }, [user]); // Add user as dependency

  // For debugging loading state
  useEffect(() => {
    console.log("⚠️ Loading state changed:", loading);
  }, [loading]);

  // Debug when button disabled state might change
  // Update the existing debug useEffect
  useEffect(() => {
    const isValidLength = nationalId.length === 16;
    const buttonDisabled =
      !nationalId || !isValidLength || loading || isLoading;
    console.log("🔴 Button disabled state check:", {
      nationalId: nationalId,
      nationalIdLength: nationalId.length,
      hasNationalId: !!nationalId,
      isValidLength: isValidLength,
      is16Digits: nationalId.length === 16,
      userProfileNationalId: user?.nationalId,
      loading: loading,
      isLoading: isLoading,
      buttonDisabled: buttonDisabled,
    });
  }, [nationalId, loading, isLoading, user]);

  // Reset loading state when component unmounts
  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  // Check if user is already verified
  useEffect(() => {
    const checkUserVerification = async () => {
      if (!user?.email) return;

      try {
        const response = await fetch(
          `/api/permissions/check-verified?email=${user.email}`
        );
        if (response.ok) {
          const result = await response.json();
          if (result.isVerified) {
            console.log("✅ User is already verified, skipping verification");
            // Get citizen data and proceed directly
            const citizenData: CitizenData = {
              id: result.nationalId, // Using nationalId as id
              nationalId: result.nationalId,
              fullName: user.name || user.email || "User",
              dateOfBirth: "",
              address: "",
              phoneNumber: "",
              email: user.email,
              status: "",
            };
            onSuccess(citizenData);
            return;
          }
        }
      } catch (error) {
        console.error("Error checking verification:", error);
      }
    };

    checkUserVerification();
  }, [user, onSuccess]);

  const validateNationalId = (id: string): boolean => {
    // Clean the input - remove any whitespace
    const cleanId = id.trim().replace(/\s+/g, "");
    console.log("Validating National ID:", cleanId, "Length:", cleanId.length);

    // Accept any non-empty string (remove 16-digit requirement)
    const isValid = cleanId.length > 0;
    console.log("Validation result:", isValid);
    return isValid;
  };

  const resetState = () => {
    setStep("id-entry");
    setNationalId("");
    setOtp("");
    setDisplayOtp("");
    setTransactionId("");
    setLoading(false);
    setError("");
    setSuccess("");
    setCitizenData(null);
    setPermissions({
      email: false,
      birthdate: false,
      gender: false,
      name: false,
      phoneNumber: false,
      picture: false,
    });
    console.log("🔄 Component state reset");
  };

  const handleIdSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Clean the national ID input
    const cleanNationalId = nationalId.trim().replace(/\s+/g, "");
    console.log("Submitting National ID:", cleanNationalId);

    if (!validateNationalId(cleanNationalId)) {
      setError("Please enter a valid 16-digit National ID number");
      return;
    }

    console.log("🔄 Starting API auth flow");
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      console.log("🔄 Starting auth flow with National ID:", cleanNationalId);

      // Call the API endpoint
      const response = await fetch("/api/auth/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nationalId: cleanNationalId, email: user?.email }),
      });

      const authResult = await response.json();
      console.log("Auth initiation result:", authResult);

      if (!authResult.success) {
        console.log("❌ Auth initiation failed:", authResult.message);
        setError(authResult.message || "Verify with National ID failed");
        return;
      }

      // SUCCESS - Switch to OTP screen
      console.log(
        "✅ Auth initiated successfully, transaction ID:",
        authResult.transactionId
      );

      // Set OTP (will be available in development mode)
      setDisplayOtp(authResult.otp || "123456");
      setTransactionId(authResult.transactionId);
      setStep("otp-verification");
      setSuccess(
        authResult.message || "OTP sent to your registered phone number"
      );
    } catch (error) {
      console.error("Auth flow error:", error);
      let errorMessage = "Connection error. Please try again.";
      if (error instanceof Error) {
        errorMessage = `Authentication error: ${error.message}`;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

const handleOtpSubmit = async (e: { preventDefault: () => void }) => {
  e.preventDefault();

  if (otp.length !== 6) {
    setError("Please enter a valid 6-digit OTP");
    return;
  }

  console.log("🔄 Starting OTP verification");
  setLoading(true);
  setError("");

  try {
    console.log("Verifying OTP:", { nationalId, otp, transactionId });

    // Call the OTP verification API
    const response = await fetch("/api/auth/verifyotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nationalId,
        otp,
        transactionId,
      }),
    });

    const verifyResult = await response.json();
    console.log("OTP verification result:", verifyResult);

    if (!verifyResult.success) {
      console.log("❌ OTP verification failed:", verifyResult.message);
      setError(verifyResult.message || "OTP verification failed");
      return;
    }

    if (!verifyResult.citizenData) {
      console.log("❌ No citizen data returned");
      setError("Authentication failed: No user data");
      return;
    }

    // SUCCESS - Store citizen data and check if user is verified
    console.log("✅ OTP verification successful! Checking user verification status...");
    setCitizenData(verifyResult.citizenData);

    // Check if user is verified in user_permissions table
    try {
      const verificationResponse = await fetch(
        `/api/permissions/check-verified?email=${user?.email}`
      );

      if (verificationResponse.ok) {
        const verificationResult = await verificationResponse.json();
        
        if (verificationResult.isVerified) {
          // User is verified, skip permissions step
          console.log("✅ User is verified, skipping permissions step");
          setSuccess("Authentication successful! Welcome back.");
          
          // Mark permissions as completed
          sessionStorage.setItem("permissions_completed", "true");
          
          setTimeout(() => {
            if (verifyResult.citizenData) {
              onSuccess(verifyResult.citizenData); // 🎯 GO DIRECTLY TO SUCCESS
            }
          }, 1000);
        } else {
          // User is not verified, show permissions step
          console.log("📋 User is not verified, showing permissions step");
          setStep("permissions");
          setSuccess("Authentication successful! Please review data sharing permissions.");
        }
      } else {
        // Error checking verification, default to showing permissions step
        console.log("❌ Error checking verification status, showing permissions step");
        setStep("permissions");
        setSuccess("Authentication successful! Please review data sharing permissions.");
      }
    } catch (error) {
      console.error("Error checking verification status:", error);
      // On error, default to showing permissions step
      setStep("permissions");
      setSuccess("Authentication successful! Please review data sharing permissions.");
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    setError("Verification failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const handlePermissionToggle = (permission: keyof typeof permissions) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }));
  };

  const handleBackToId = () => {
    setStep("id-entry");
    setError("");
    setSuccess("");
  };

  const handlePermissionsAllow = async () => {
    if (!citizenData) {
      setError("No user data available");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const apiUrl =
        process.env.NODE_ENV === "development"
          ? "/api/permissions"
          : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/permissions`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nationalId,
          permissions,
          email: user?.email, // Add email to request
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save permissions");
      }

      const result = await response.json();
      console.log("Permissions saved:", result);

      // Update is_verified to true
      // try {
      //   const verifyResponse = await fetch("/api/permissions/verify", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       email: user?.email,
      //       nationalId: nationalId,
      //     }),
      //   });

      //   if (verifyResponse.ok) {
      //     console.log("✅ User verification status updated");
      //   }
      // } catch (verifyError) {
      //   console.error("Error updating verification status:", verifyError);
      // }

      setSuccess("Permissions saved successfully! Redirecting...");

      // Mark permissions as completed
      sessionStorage.setItem("permissions_completed", "true");
      sessionStorage.setItem("user_national_id", nationalId);
      sessionStorage.setItem("login_national_id", "true");

      setTimeout(() => {
        onSuccess(citizenData);
      }, 1000);
    } catch (error) {
      console.error("Permissions error:", error);
      setError("Failed to save permissions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FontAwesomeIcon
            icon={faShieldAlt}
            className="w-8 h-8 text-green-600"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {step === "permissions"
            ? "Data Sharing Permissions"
            : "Verify with National ID"}
        </h2>
        <p className="text-gray-600 text-sm">
          {step === "id-entry"
            ? "Enter your National ID number to verify your identity"
            : step === "otp-verification"
            ? "Enter the OTP sent to your registered phone number"
            : "Please review and approve the data sharing permissions below"}
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-center space-x-2">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
              step === "id-entry"
                ? "bg-green-600 text-white"
                : "bg-green-600 text-white"
            }`}
          >
            {step === "otp-verification" || step === "permissions" ? (
              <FontAwesomeIcon icon={faCheckCircle} className="w-3 h-3" />
            ) : (
              "1"
            )}
          </div>
          <div
            className={`w-12 h-1 ${
              step === "otp-verification" || step === "permissions"
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
              step === "otp-verification"
                ? "bg-green-600 text-white"
                : step === "permissions"
                ? "bg-green-600 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {step === "permissions" ? (
              <FontAwesomeIcon icon={faCheckCircle} className="w-3 h-3" />
            ) : (
              "2"
            )}
          </div>
          <div
            className={`w-12 h-1 ${
              step === "permissions" ? "bg-green-600" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
              step === "permissions"
                ? "bg-green-600 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            3
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>ID</span>
          <span>OTP</span>
          <span>Permissions</span>
        </div>

        {/* Debug info */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-2 flex justify-center">
            <span className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded-full">
              Supabase Mode - Loading: {loading ? "TRUE" : "FALSE"}
            </span>
            {loading && (
              <button
                onClick={resetState}
                className="ml-2 bg-red-50 text-red-800 text-xs px-2 py-1 rounded-full"
              >
                Reset State
              </button>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="w-4 h-4 text-red-500 mr-2"
          />
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="w-4 h-4 text-green-500 mr-2"
          />
          <span className="text-green-700 text-sm">{success}</span>
        </div>
      )}

      {/* National ID Entry Form */}
      {step === "id-entry" && (
        <form onSubmit={handleIdSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nationalId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              National ID Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon
                  icon={faIdCard}
                  className="w-5 h-5 text-gray-400"
                />
              </div>
              <input
                type="text"
                id="nationalId"
                value={nationalId}
                onChange={(e) => {
                  // Don't allow changes if user has nationalId
                  if (!user?.nationalId) {
                    setNationalId(
                      e.target.value.replace(/\D/g, "").slice(0, 16)
                    );
                  }
                }}
                placeholder="Enter 16-digit National ID"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 ${
                  user?.nationalId
                    ? "bg-gray-50 border-gray-200 cursor-not-allowed"
                    : "border-gray-300"
                }`}
                disabled={loading || isLoading}
                readOnly={!!user?.nationalId}
                required
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {user?.nationalId
                ? "Your registered National ID (read-only)"
                : "Format: 16 digits (e.g., 1198700123456789)"}
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onBack}
              disabled={loading || isLoading}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700 disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              ref={submitButtonRef}
              type="submit"
              disabled={
                !nationalId || nationalId.length === 0 || loading || isLoading
              }
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all font-medium ${
                !nationalId || nationalId.length === 0 || loading || isLoading
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-60"
                  : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="w-4 h-4 animate-spin"
                  />
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  <span>Send OTP</span>
                  <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* OTP Verification Form */}
      {step === "otp-verification" && (
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          {displayOtp && process.env.NODE_ENV === "development" && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm text-center">
                <strong>Development OTP:</strong> {displayOtp}
              </p>
              <p className="text-yellow-600 text-xs text-center mt-1">
                (Use this OTP for testing - expires in 10 minutes)
              </p>
            </div>
          )}
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Verification Code (OTP)
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="Enter 6-digit code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-center text-lg font-mono tracking-widest text-gray-900"
              disabled={loading || isLoading}
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Development mode: Any 6-digit code will work for testing
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setStep("id-entry")}
              disabled={loading || isLoading}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700 disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              disabled={otp.length !== 6 || loading || isLoading}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="w-4 h-4 animate-spin"
                  />
                  <span>Verifying...</span>
                </div>
              ) : (
                <>
                  <span>Verify & Continue</span>
                  <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Permissions Step */}
      {step === "permissions" && (
        <div className="space-y-6">
          <div className="space-y-4">
            {/* Essential Claims */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Essential Claims
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-700">Email Address</span>
                  <label className="cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.email}
                      onChange={() => handlePermissionToggle("email")}
                      className="sr-only"
                    />
                    <FontAwesomeIcon
                      icon={permissions.email ? faToggleOn : faToggleOff}
                      className={`w-6 h-6 ${
                        permissions.email ? "text-[#2C8E5D]" : "text-gray-400"
                      }`}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Voluntary Claims */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Voluntary Claims
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-700">Birthdate</span>
                  <label className="cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.birthdate}
                      onChange={() => handlePermissionToggle("birthdate")}
                      className="sr-only"
                    />
                    <FontAwesomeIcon
                      icon={permissions.birthdate ? faToggleOn : faToggleOff}
                      className={`w-6 h-6 ${
                        permissions.birthdate
                          ? "text-[#2C8E5D]"
                          : "text-gray-400"
                      }`}
                    />
                  </label>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-700">Gender</span>
                  <label className="cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.gender}
                      onChange={() => handlePermissionToggle("gender")}
                      className="sr-only"
                    />
                    <FontAwesomeIcon
                      icon={permissions.gender ? faToggleOn : faToggleOff}
                      className={`w-6 h-6 ${
                        permissions.gender ? "text-[#2C8E5D]" : "text-gray-400"
                      }`}
                    />
                  </label>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-700">Name</span>
                  <label className="cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.name}
                      onChange={() => handlePermissionToggle("name")}
                      className="sr-only"
                    />
                    <FontAwesomeIcon
                      icon={permissions.name ? faToggleOn : faToggleOff}
                      className={`w-6 h-6 ${
                        permissions.name ? "text-[#2C8E5D]" : "text-gray-400"
                      }`}
                    />
                  </label>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-700">Phone Number</span>
                  <label className="cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.phoneNumber}
                      onChange={() => handlePermissionToggle("phoneNumber")}
                      className="sr-only"
                    />
                    <FontAwesomeIcon
                      icon={permissions.phoneNumber ? faToggleOn : faToggleOff}
                      className={`w-6 h-6 ${
                        permissions.phoneNumber
                          ? "text-[#2C8E5D]"
                          : "text-gray-400"
                      }`}
                    />
                  </label>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-700">Picture</span>
                  <label className="cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.picture}
                      onChange={() => handlePermissionToggle("picture")}
                      className="sr-only"
                    />
                    <FontAwesomeIcon
                      icon={permissions.picture ? faToggleOn : faToggleOff}
                      className={`w-6 h-6 ${
                        permissions.picture ? "text-[#2C8E5D]" : "text-gray-400"
                      }`}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleBackToId}
              disabled={loading || isLoading}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700 disabled:opacity-50"
            >
              <span>Cancel</span>
            </button>

            <button
              type="button"
              onClick={handlePermissionsAllow}
              disabled={loading || isLoading}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="w-4 h-4 animate-spin"
                  />
                  <span>Saving...</span>
                </div>
              ) : (
                <span>Allow</span>
              )}
            </button>
          </div>
        </div>
      )}
      {/* Development Mode Notice */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-xs text-center">
            <strong>Development Mode:</strong> Using Supabase directly. Use any
            16-digit National ID from the database and any 6-digit OTP for
            testing.
          </p>
        </div>
      )}
    </div>
  );
}
