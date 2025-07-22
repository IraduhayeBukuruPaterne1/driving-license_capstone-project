# Enhancing Driver’s License Issuance and Verification in Burundi

A full-stack digital system designed to improve the efficiency, security, and accessibility of driver’s license issuance and verification in Burundi. The system streamlines the entire workflow — from online application to QR-code-based verification and biometric-secured license pickup.

---

## **Overview**

The current manual licensing process in Burundi is centralized, paper-based, and prone to delays and fraud. This system solves these issues by:

✅ Allowing **online account creation and license applications**  
✅ **OTP-based National ID verification** to ensure only legitimate applicants apply  
✅ **Automatic retrieval of personal details** after ID verification  
✅ **Multiple document uploads** (e.g., driving school and medical certificates)  
✅ **Integrated payment step** before submitting applications  
✅ **Admin dashboard** to approve or reject applications, with instant notifications to applicants  
✅ **QR-code-embedded digital license** for real-time roadside verification  
✅ **Biometric fingerprint verification** at pickup centers to ensure secure license collection  

The prototype was built and tested locally using **Docker** to simulate a production environment.

---

## **Tech Stack**

- **Frontend:** [Next.js](https://nextjs.org/) (React framework for fast, responsive UI)
- **Backend:** [Node.js](https://nodejs.org/) + Express (RESTful APIs)
- **Database:** [Supabase](https://supabase.com/) (used instead of MongoDB Atlas for secure data storage)
- **OTP Verification:** [Twilio](https://www.twilio.com/) SMS service
- **QR Code:** `qrcode` npm library for dynamic license QR generation
- **Biometric Verification:** Simulated fingerprint matching module
- **Containerization:** [Docker](https://www.docker.com/) for local development and consistent testing

---

## **Core Functionalities**

1. **Account Management**
   - Users can sign up using their full name, email, phone number, and password.
   - Login via email/phone + password.

2. **License Application**
   - Applicants select a license category, fill out the form, and verify their National ID using an OTP.
   - Personal information auto-fills after OTP verification.

3. **Document Upload & Payment**
   - Applicants upload multiple required documents (driving school certificate, medical certificate, etc.).
   - Integrated payment step before submission.

4. **Admin Dashboard**
   - Admins can approve or reject applications and add remarks.
   - Approved users receive instant notifications.

5. **Digital License & Verification**
   - A digital license with a unique QR code is generated upon approval.
   - Traffic officers can scan the QR code to validate licenses in real time.

6. **Secure Pickup**
   - Fingerprint verification (simulated) ensures that only the correct applicant collects the license.

---

## **Installation & Setup**

### **Prerequisites**
- [Node.js](https://nodejs.org/) installed  
- [Docker](https://www.docker.com/) installed (for local testing)
- Git installed

### **Steps**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/IraduhayeBukuruPaterne1/driving-license_capstone-project.git
   cd driving-license_capstone-project
   
**2. Install Dependencies**
npm install

**3. Set Environment Variables** 

Create a .env.local file and add:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token

**4. Run Locally with Docker**

docker-compose up

**5. Access the App**

Open your browser and go to: http://localhost:3000

**Testing Strategies & Results** 

**Tested Modules**

 Sign-Up & Login: Unique accounts created; duplicate prevention tested successfully
 OTP Verification: Tested with correct, expired, and invalid OTPs
 Document Upload: Valid (PDF, PNG, JPEG) vs invalid formats rejected
 Payment Step: Ensured users cannot submit without payment confirmation
 Admin Review: Approve & reject workflows tested; rejection reasons displayed
 QR Code: Successfully scanned license ID & returned correct applicant details
 Fingerprint Verification: Simulated identity confirmation at pickup center

 **Hardware & Software Performance**
 
Environment: Local Docker containers

Tested on:

Windows 10 (i5, 8GB RAM)

MacBook Air M1

API Response Times: Average 1.8 seconds under multiple concurrent uploads


**Demo Video:**
https://drive.google.com/file/d/1BmR5QLQkm1kBGHYfYzV_K9JpqpvGMgM4/view?usp=sharing



**Screenshots**

<img width="1366" height="768" alt="Screenshot 2025-07-22 142145" src="https://github.com/user-attachments/assets/93b1736d-51da-4d4f-a2d8-505ccec40f8f" />
<img width="1366" height="768" alt="Screenshot 2025-07-22 104241" src="https://github.com/user-attachments/assets/292727b7-232f-40a5-a2e5-ac002b52725a" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 220921" src="https://github.com/user-attachments/assets/36c4bfbb-57cd-4a19-ba3d-63cd89d28008" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 220915" src="https://github.com/user-attachments/assets/5d865eef-2874-49e6-9fc3-4adc81b60b8a" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 220858" src="https://github.com/user-attachments/assets/c27ce2b2-6c74-4342-89c4-1a4349b2a261" />

<img width="1366" height="768" alt="Screenshot 2025-07-21 215503" src="https://github.com/user-attachments/assets/64c2f02a-1ecb-4fe8-bbda-0f52f2d053e8" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 215432" src="https://github.com/user-attachments/assets/aaa5bb1d-9e7e-47aa-9c0a-11b227f5cbf7" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 215413" src="https://github.com/user-attachments/assets/940d74ff-2b0f-4369-a5e2-0ffdc3f3e5cc" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 215359" src="https://github.com/user-attachments/assets/5c4b2fd2-db32-4dc5-b43b-f77a167700bf" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 215120" src="https://github.com/user-attachments/assets/8a067a25-47ff-44b1-8a27-8ef4f402ed29" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 215110" src="https://github.com/user-attachments/assets/e90eaad8-1f63-4223-bad9-acc822645b1b" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 215057" src="https://github.com/user-attachments/assets/df186f06-0c98-4de2-bbea-4f515b4de1b8" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 215045" src="https://github.com/user-attachments/assets/e99aa433-837a-4b8e-8cfe-68609589914c" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 215042" src="https://github.com/user-attachments/assets/a8e4dbbf-c6a8-455b-a571-73590f402fde" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 215014" src="https://github.com/user-attachments/assets/dd83ad14-fca3-4339-a744-ac606245777b" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 215006" src="https://github.com/user-attachments/assets/094ce516-47c0-4048-80e2-06c0fc703f5e" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 214953" src="https://github.com/user-attachments/assets/2eb65f78-2ca0-49e5-a8a9-e50a97940452" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 214949" src="https://github.com/user-attachments/assets/e042fb52-3854-4ad4-89d4-c0e9dc538356" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 214923" src="https://github.com/user-attachments/assets/387d1b9c-ab76-4638-b8ce-ed5bafb9d549" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 214534" src="https://github.com/user-attachments/assets/892e6a47-2cf8-49e1-ac94-8455e502379e" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 214519" src="https://github.com/user-attachments/assets/23b34ba8-7188-41d8-892d-fc4e0520228c" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 214307" src="https://github.com/user-attachments/assets/7f52ed68-e9fb-4312-8d58-579b334bc949" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 214247" src="https://github.com/user-attachments/assets/6f1250d4-ad05-45e1-ac10-39960fa64557" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 214025" src="https://github.com/user-attachments/assets/8570232d-0e2b-4717-acfe-68eb19f0ed61" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 214010" src="https://github.com/user-attachments/assets/ff745455-a97e-458f-8040-1c2e92332b7d" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 213927" src="https://github.com/user-attachments/assets/5c9f0a07-6fc7-49a4-88d4-f7cea2b11c6e" />

Performance tests showed stable API response times (avg. 1.8s) during simultaneous uploads and OTP requests.

<img width="1366" height="768" alt="Screenshot 2025-07-21 213902" src="https://github.com/user-attachments/assets/ceeb9541-9a70-4315-9886-9b0fa6f14661" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 213712" src="https://github.com/user-attachments/assets/334c5df4-dd5d-49aa-9a58-fc42a1f08967" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 213436" src="https://github.com/user-attachments/assets/51b77d0f-6eef-4eb7-bd6e-2991487187ab" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 144848" src="https://github.com/user-attachments/assets/b9e5e3cd-59d3-46ba-addb-eb48fc87ab7b" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 144715" src="https://github.com/user-attachments/assets/f9439833-7a7a-4184-8617-e7d1be4ba76b" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 144641" src="https://github.com/user-attachments/assets/faece4a2-b2c2-4f5f-a06d-255139fc3d75" />


**Analysis**

The system achieved all the main objectives in the proposal:
 Improved efficiency – processing time reduced by more than half compared to manual workflows
 Enhanced transparency – applicants tracked progress via real-time notifications
 Better security – OTP verification + QR scanning prevented impersonation & forgery

Minor issues included reliance on stable internet connectivity and the need for further integration with government biometric hardware.

**Recommendations & Future Work**

Full Integration with National ID database for real-time identity verification.

Mobile App Version for rural populations with limited access to computers.

Kirundi Voice Guidance to enhance inclusivity.

Secure Payment Gateway Integration to allow online license fees processing.

**Author**

 **Iraduhaye Bukuru Paterne**
 
BSc. in Software Engineering – African Leadership University
 p.iraduhaye@alustudent.com


