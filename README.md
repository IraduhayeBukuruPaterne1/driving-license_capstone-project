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
Create a .env.local file in the root folder and add:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token

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




