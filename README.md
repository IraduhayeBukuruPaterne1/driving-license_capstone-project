# 🚗 Enhancing Driver’s License Issuance and Verification in Burundi

## 🚀 Overview
This project is a **full-stack digital system** designed to improve the efficiency, security, and accessibility of driver’s license issuance and verification in Burundi.  
The solution addresses the challenges of the current manual process — which is centralized, paper-based, and prone to delays and fraud — by introducing a **secure, online, and automated workflow**.

### ✅ Key Features
- **Online account creation** and driver’s license applications
- **OTP-based National ID verification** to ensure legitimate applicants
- **Automatic retrieval of personal details** after ID verification
- **Multiple document uploads** (driving school and medical certificates)
- **Integrated payment step** before application submission
- **Admin dashboard** to approve or reject applications with instant notifications
- **QR-code embedded digital license** for real-time roadside verification
- **Biometric fingerprint verification** at pickup centers for secure license collection

---

## 🛠 Tech Stack
- **Frontend:** [Next.js](https://nextjs.org/) (React framework)
- **Backend:** Node.js + Express (RESTful APIs)
- **Database:** Supabase (used for secure data storage)
- **OTP Service:** Twilio SMS
- **QR Code Generation:** `qrcode` npm library
- **Biometric Verification:** Simulated fingerprint matching module
- **Containerization:** Docker for local development and consistent testing

## 📦 Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/IraduhayeBukuruPaterne1/driving-license_capstone-project.git
cd driving-license_capstone-project

2️⃣ Install Dependencies:

npm install

3️⃣ Configure Environment Variables

This project uses two .env files to store sensitive credentials.

1️⃣ Backend (.env)
Create a .env file in the root folder with the following placeholders:

SUPABASE_URL=https://your-supabase-project-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

PORT=8090
NODE_ENV=development
JWT_SECRET=your-jwt-secret
FRONTEND_URL=http://localhost:3000

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
SMS_PROVIDER=mock

BACKEND_API_URL=http://localhost:8090

2️⃣ Frontend (.env.local)
Create a .env.local file in the root folder with:

NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8090/api
NEXT_PUBLIC_ENVIRONMENT=development

NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

NEXT_PUBLIC_ESIGNET_API_URL=http://localhost:8089
NEXT_PUBLIC_MOCK_IDENTITY_URL=http://localhost:8088

NEXT_PUBLIC_APP_NAME="DLV Burundi"
NEXT_PUBLIC_APP_DESCRIPTION="Digital License Verification System for Burundi"

NEXT_PUBLIC_ENABLE_NATIONAL_ID_AUTH=true
NEXT_PUBLIC_MOCK_OTP_ENABLED=true
NEXT_PUBLIC_DEFAULT_OTP=123456


4️⃣ Run the Application
With Docker:

docker-compose up

Without Docker (manual run):

# Run backend
cd backend
npm start

# Open a new terminal to run frontend
cd frontend
npm run dev

Access the application in your browser at:


http://localhost:3000

👩‍💻 Developer Guide
If another developer wants to join and contribute to this project, follow the instructions below:

📂 Project Structure

driving-license_capstone-project/
│── backend/        # Node.js API (routes, controllers, services)
│── frontend/       # Next.js UI components and pages
│── database/       # Supabase configuration files and schema
│── screenshots/    # UI screenshots for documentation
│── docker-compose.yml
│── README.md

⚙️ Getting Started
Clone and Install

git clone <repo-link>
cd driving-license_capstone-project
npm install

Set Up Environment Variables

Use the keys provided by the project owner for database and OTP services.

Run Application

Docker: docker-compose up

Manual: Start backend and frontend as shown above.

Database

Supabase setup required (contact owner for credentials).

Schema files are in /database/.

Contributing

Create a feature branch: feature-name

Commit with clear messages

Submit a pull request for review


✅ Testing
Sign-Up & Login: Ensures unique accounts and rejects duplicates.

OTP Verification: Tested with valid, expired, and invalid codes.

Document Upload: Accepts valid file formats (PDF, PNG, JPEG) only.

Payment Step: Application cannot proceed without payment confirmation.

Admin Review: Approve and reject workflows tested; rejection reasons displayed.

QR Code: Successfully scanned to validate licenses in real time.

Fingerprint Verification: Simulated matching to confirm correct applicant at pickup.

📽 Demo Video:
https://drive.google.com/file/d/1BmR5QLQkm1kBGHYfYzV_K9JpqpvGMgM4/view?usp=sharing

🚧 Recommendations & Future Work
Full integration with National ID database for real-time verification

Mobile app version for users with limited computer access

Kirundi voice guidance to improve inclusivity

Secure online payment gateway for license fees

👨‍💻 Author
Iraduhaye Bukuru Paterne
BSc. in Software Engineering – African Leadership University
📧 p.iraduhaye@alustudent.com


<img width="1366" height="768" alt="Screenshot 2025-07-21 214247" src="https://github.com/user-attachments/assets/afc2d8fb-7888-45e2-bfde-6ab1e91d8800" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 213436" src="https://github.com/user-attachments/assets/4b8856a8-3bd7-4254-8ddf-92dd7ad23612" />
<img width="1366" height="768" alt="Screenshot 2025-07-21 144641" src="https://github.com/user-attachments/assets/28f750c3-a896-490d-9281-514f77a9ac9e" />

You can find more screenshots here:
https://drive.google.com/drive/folders/1_VhW7WWXnrBEas0JeJMWBM6U3M5oaBTg?usp=sharing




