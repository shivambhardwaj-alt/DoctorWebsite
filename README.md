# Doctor Appointment Booking System

A Full-Stack MERN Application for Seamless Healthcare Appointment Management

License: MIT

---

## Introduction

**Doctor Appointment Booking System** is a full-featured, production-ready web application built on the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) that digitizes the entire doctor appointment workflow. It provides three dedicated, role-based interfaces — **Patient**, **Doctor**, and **Admin** — each with secure authentication, real-time appointment management, integrated online payments, and analytical dashboards.

Designed with scalability, security, and user experience in mind, this project demonstrates real-world full-stack engineering practices including RESTful API design, JWT-based authorization, cloud image storage, and payment gateway integration.

---

## Features

### Patient Features
- User Registration & Login
- JWT Authentication
- Browse Doctors
- Search & Filter by Specialization
- Doctor Profile View
- Book Appointment
- Cancel Appointment
- View Appointment History
- Online Payment Integration
- Profile Management

### Doctor Features
- Doctor Login
- Personalized Dashboard
- View Upcoming Appointments
- Accept / Reject Appointment
- Mark Appointment as Completed
- Update Availability
- Manage Profile

### Admin Features
- Admin Login
- Dashboard with Analytics
- Add Doctor
- Edit Doctor
- Delete Doctor
- View All Doctors
- View All Users
- View All Appointments
- Manage Doctor Availability
- Revenue Statistics

---

## Tech Stack

**Frontend**
| Technology | Purpose |
|---|---|
| React.js | UI Library |
| React Router DOM | Client-side Routing |
| Axios | HTTP Client |
| Context API | State Management |
| Tailwind CSS | Styling |

**Backend**
| Technology | Purpose |
|---|---|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |

**Authentication**
| Technology | Purpose |
|---|---|
| JWT | Token-based Auth |
| bcrypt | Password Hashing |

**Payments & Storage**
| Technology | Purpose |
|---|---|
| Stripe / Razorpay | Payment Gateway |
| Cloudinary | Image Storage |

**Other Packages:** `dotenv` `cors` `multer` `validator` `cookie-parser` `jsonwebtoken` `mongoose`

---

## Folder Structure

```
doctor-appointment-booking-system/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/              # Images, icons, static files
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── DoctorCard.jsx
│   │   │   └── ...
│   │   ├── pages/                # Route-level pages
│   │   │   ├── Home.jsx
│   │   │   ├── Doctors.jsx
│   │   │   ├── Appointment.jsx
│   │   │   ├── MyAppointments.jsx
│   │   │   ├── Login.jsx
│   │   │   └── ...
│   │   ├── context/              # Global state (AppContext, AdminContext, DoctorContext)
│   │   ├── routes/                # Route definitions
│   │   ├── utils/                 # Helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   │   ├── mongodb.js            # Database connection
│   │   └── cloudinary.js         # Cloudinary configuration
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── doctorController.js
│   │   ├── adminController.js
│   │   └── appointmentController.js
│   ├── middleware/
│   │   ├── authUser.js
│   │   ├── authDoctor.js
│   │   ├── authAdmin.js
│   │   └── multer.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── doctorModel.js
│   │   └── appointmentModel.js
│   ├── routes/
│   │   ├── userRoute.js
│   │   ├── doctorRoute.js
│   │   ├── adminRoute.js
│   │   └── appointmentRoute.js
│   ├── uploads/                    # Temporary file uploads
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## Database Schema

### Users Collection
Stores patient account and profile information.

| Field | Type | Description |
|---|---|---|
| `name` | String | Full name of the user |
| `email` | String | Unique login identifier |
| `password` | String | Hashed password (bcrypt) |
| `image` | String | Profile picture URL (Cloudinary) |
| `address` | Object | Line 1 & Line 2 |
| `gender` | String | Gender |
| `dob` | String | Date of birth |
| `phone` | String | Contact number |

### Doctors Collection
Stores doctor profile, specialization, and availability data.

| Field | Type | Description |
|---|---|---|
| `name` | String | Doctor's full name |
| `email` | String | Unique login identifier |
| `password` | String | Hashed password (bcrypt) |
| `image` | String | Profile picture URL |
| `speciality` | String | Medical specialization |
| `degree` | String | Educational qualification |
| `experience` | String | Years of experience |
| `about` | String | Short bio |
| `fees` | Number | Consultation fee |
| `available` | Boolean | Availability status |
| `slots_booked` | Object | Booked time slots |
| `address` | Object | Clinic address |

### Appointments Collection
Tracks bookings between patients and doctors.

| Field | Type | Description |
|---|---|---|
| `userId` | String | Reference to Users collection |
| `docId` | String | Reference to Doctors collection |
| `slotDate` | String | Appointment date |
| `slotTime` | String | Appointment time |
| `userData` | Object | Snapshot of patient data |
| `docData` | Object | Snapshot of doctor data |
| `amount` | Number | Consultation fee |
| `date` | Number | Timestamp of booking |
| `cancelled` | Boolean | Cancellation status |
| `payment` | Boolean | Payment status |
| `isCompleted` | Boolean | Completion status |

---

## API Endpoints

### User APIs
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/user/register` | Register a new patient | Public |
| `POST` | `/api/user/login` | Patient login | Public |
| `GET` | `/api/user/get-profile` | Get logged-in user profile | Private |
| `POST` | `/api/user/update-profile` | Update user profile | Private |

### Doctor APIs
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/doctors` | Get list of all doctors | Public |
| `POST` | `/api/doctor/login` | Doctor login | Public |
| `GET` | `/api/doctor/appointments` | Get doctor's appointments | Private (Doctor) |
| `POST` | `/api/doctor/complete-appointment` | Mark appointment completed | Private (Doctor) |
| `POST` | `/api/doctor/cancel-appointment` | Cancel an appointment | Private (Doctor) |
| `POST` | `/api/doctor/update-availability` | Toggle availability | Private (Doctor) |

### Admin APIs
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/admin/login` | Admin login | Public |
| `POST` | `/api/admin/add-doctor` | Add a new doctor | Private (Admin) |
| `POST` | `/api/admin/edit-doctor/:id` | Edit doctor details | Private (Admin) |
| `DELETE` | `/api/admin/delete-doctor/:id` | Remove a doctor | Private (Admin) |
| `GET` | `/api/admin/all-doctors` | Get all doctors | Private (Admin) |
| `GET` | `/api/admin/all-users` | Get all registered users | Private (Admin) |
| `GET` | `/api/admin/appointments` | Get all appointments | Private (Admin) |
| `GET` | `/api/admin/dashboard` | Get analytics & revenue stats | Private (Admin) |

### Appointment APIs
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/appointment/book` | Book a new appointment | Private (User) |
| `GET` | `/api/appointment/list` | Get user's appointment list | Private (User) |
| `DELETE` | `/api/appointment/:id` | Cancel an appointment | Private (User) |
| `POST` | `/api/appointment/payment` | Process online payment | Private (User) |

---

## Installation Guide

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/doctor-appointment-booking-system.git
cd doctor-appointment-booking-system
```

### 2. Install Dependencies

**Frontend**
```bash
cd frontend
npm install
```

**Backend**
```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the **frontend** directory:
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

Create a `.env` file inside the **backend** directory:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_admin_password
```

### 4. Start the Backend Server
```bash
cd backend
npm run server
```

### 5. Start the Frontend Application
```bash
cd frontend
npm run dev
```

The application should now be running at `http://localhost:5173`

---

## Future Improvements

- Video Consultation
- Email Notifications
- SMS Notifications
- AI-Based Doctor Recommendation
- Medical Reports Upload
- Prescription Download
- Real-Time Chat System
- Rating & Reviews
- Dark Mode
- PWA (Progressive Web App) Support

---

## Security Features

- JWT-Based Authentication
- Password Hashing with bcrypt
- Protected & Role-Based Routes
- Input Validation
- Role-Based Authorization (Patient / Doctor / Admin)
- Secure Environment Variables
- MongoDB Injection Prevention
- XSS Protection
- CORS Configuration

---

## Performance Optimizations

- Lazy Loading of Components
- Code Splitting
- Image Optimization via Cloudinary
- Pagination for Large Data Sets
- Efficient MongoDB Queries & Indexing
- React Memoization (`useMemo`, `useCallback`, `React.memo`)

---

## Deployment

| Layer | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render / Railway |
| Database | MongoDB Atlas |

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. **Fork** the repository
2. **Create** your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

Please make sure to:
- Follow the existing code style and conventions
- Write clear, concise commit messages
- Test your changes thoroughly before submitting
- Update documentation where relevant

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## Author

**shivam bhardwaj**

- GitHub: https://github.com/shivambhardwaj-alt/DoctorWebsite
- Email: shivambhardwaj2115@gmail.com