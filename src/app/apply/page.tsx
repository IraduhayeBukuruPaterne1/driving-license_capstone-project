"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarSide,
  faArrowRight,
  faInfoCircle,
  faShieldAlt,
  faCheckCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/contexts/AuthContext";
import { useApplication } from "@/contexts/ApplicationContext";
// import { supabaseAuthService } from "@/services/supabaseAuth";
import {
  ApplicationSteps,
  LoadingSpinner,
} from "./components/ApplicationShared";

export default function ApplyPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { applicationData, updateLicenseType, setCurrentStep } =
    useApplication();
  const [selectedLicenseType, setSelectedLicenseType] = useState<string>(
    applicationData.licenseType || ""
  );
  const [checkingPermissions, setCheckingPermissions] = useState(false);

  useEffect(() => {
    setCurrentStep(1);
    if (applicationData.licenseType) {
      setSelectedLicenseType(applicationData.licenseType);
    }
  }, [applicationData.licenseType, setCurrentStep]);
  // Show loading while checking authentication
  if (isLoading) {
    return <LoadingSpinner message="Loading..." />;
  }

  // If user is not authenticated, let ConditionalLayout handle the redirect
  if (!user) {
    return null;
  }
  const licenseTypes = [
    {
      id: "car",
      name: "Private Car License (Class B)",
      description: "For private vehicles up to 3.5 tons",
      price: "50,000 BIF",
      duration: "5 years",
      requirements: [
        "18+ years old",
        "Medical certificate",
        "Driving school certificate",
      ],
      icon: faCarSide,
      color: "bg-blue-500",
    },
    {
      id: "motorcycle",
      name: "Motorcycle License (Class A)",
      description: "For motorcycles and scooters",
      price: "30,000 BIF",
      duration: "5 years",
      requirements: [
        "16+ years old",
        "Medical certificate",
        "Driving school certificate",
      ],
      icon: faCarSide,
      color: "bg-green-500",
    },
    {
      id: "commercial",
      name: "Commercial License (Class C)",
      description: "For trucks and commercial vehicles",
      price: "75,000 BIF",
      duration: "3 years",
      requirements: [
        "21+ years old",
        "Medical certificate",
        "Advanced driving course",
        "Clean driving record",
      ],
      icon: faCarSide,
      color: "bg-orange-500",
    },
  ];
  const handleStartApplication = async () => {
    console.log("handleStartApplication called");
    console.log("selectedLicenseType:", selectedLicenseType);
    console.log("applicationData.licenseType:", applicationData.licenseType);

    if (!selectedLicenseType) {
      console.log("No license type selected");
      alert("Please select a license type before continuing");
      return;
    }

    console.log("Updating license type...");
    updateLicenseType(selectedLicenseType);

    // Check if user has existing permissions
    setCheckingPermissions(true);

    try {
      // Check if user is verified in user_permissions table
      console.log("🔄 Checking user verification status...");
      const verificationResponse = await fetch(
        `/api/permissions/check-verified?email=${user?.email}`
      );
      
      if (verificationResponse.ok) {
        const verificationResult = await verificationResponse.json();
        
        if (verificationResult.isVerified) {
          // User is verified, skip verification step
          console.log("✅ User is verified, skipping verification step");
          
          // Mark permissions as completed
          sessionStorage.setItem("permissions_completed", "true");
          
          // Navigate directly to personal info
          const targetUrl = `/apply/personal-info?type=${selectedLicenseType}`;
          console.log("Navigating directly to:", targetUrl);
          router.push(targetUrl);
          return;
        } else {
          // User is not verified, show verification step
          console.log("📋 User is not verified, proceeding to verification form");
          const targetUrl = `/apply/national-id-verification?type=${selectedLicenseType}`;
          console.log("Navigating to:", targetUrl);
          router.push(targetUrl);
        }
      } else {
        // Error checking verification, default to showing verification step
        console.log("❌ Error checking verification status, proceeding to verification form");
        const targetUrl = `/apply/national-id-verification?type=${selectedLicenseType}`;
        console.log("Error occurred, navigating to:", targetUrl);
        router.push(targetUrl);
      }
    } catch (error) {
      console.error("Error checking verification status:", error);
      // On error, default to verification flow
      const targetUrl = `/apply/national-id-verification?type=${selectedLicenseType}`;
      console.log("Error occurred, navigating to:", targetUrl);
      router.push(targetUrl);
    } finally {
      setCheckingPermissions(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <ApplicationSteps currentStep={1} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-inter font-bold text-gray-900 mb-2">
                Choose Your License Type
              </h2>
              <p className="text-gray-600 font-inter mb-8">
                Select the type of driving license you want to apply for. Each
                license type has different requirements and fees.
              </p>
              <div className="space-y-4">
                {licenseTypes.map((license) => (
                  <div
                    key={license.id}
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                      selectedLicenseType === license.id
                        ? "border-[#2C8E5D] bg-[#2C8E5D]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => {
                      console.log("License type clicked:", license.id);
                      setSelectedLicenseType(license.id);
                      console.log("License type set to:", license.id);
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${license.color}`}
                      >
                        <FontAwesomeIcon
                          icon={license.icon}
                          className="w-6 h-6 text-white"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-inter font-semibold text-gray-900">
                            {license.name}
                          </h3>
                          <div className="text-right">
                            <p className="text-lg font-inter font-bold text-[#2C8E5D]">
                              {license.price}
                            </p>
                            <p className="text-sm text-gray-500">
                              Valid for {license.duration}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-600 font-inter mb-3">
                          {license.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {license.requirements.map((req, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedLicenseType === license.id
                              ? "border-[#2C8E5D] bg-[#2C8E5D]"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedLicenseType === license.id && (
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className="w-4 h-4 text-white"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>{" "}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={(e) => {
                    console.log("Button clicked!", e);
                    handleStartApplication();
                  }}
                  disabled={!selectedLicenseType || checkingPermissions}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-inter font-medium transition-all ${
                    selectedLicenseType && !checkingPermissions
                      ? "bg-[#2C8E5D] hover:bg-[#245A47] text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {checkingPermissions ? (
                    <>
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="w-4 h-4 animate-spin"
                      />
                      <span>Checking Status...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue Application</span>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="w-4 h-4"
                      />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Requirements Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="w-5 h-5 text-blue-600 mr-2"
                />
                <h3 className="font-inter font-semibold text-blue-900">
                  General Requirements
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Valid National ID card
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Medical certificate (not older than 6 months)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Driving school completion certificate
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Passport-sized photographs
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Application fee payment
                </li>
              </ul>
            </div>

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <FontAwesomeIcon
                  icon={faShieldAlt}
                  className="w-5 h-5 text-green-600 mr-2"
                />
                <h3 className="font-inter font-semibold text-green-900">
                  Secure Application
                </h3>
              </div>
              <p className="text-sm text-green-800">
                Your personal information is encrypted and protected. All
                documents are verified through secure government channels.
              </p>
            </div>

            {/* Support */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-inter font-semibold text-gray-900 mb-4">
                Need Help?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Contact our support team if you have questions about the
                application process.
              </p>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-inter text-sm font-medium transition-all">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}