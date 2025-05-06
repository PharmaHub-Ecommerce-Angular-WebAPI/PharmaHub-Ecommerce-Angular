# PharmaHub Ecommerce - Angular Frontend

PharmaHub is a modern Angular-based ecommerce frontend designed for pharmacy owners to manage their online stores and for users to search for and purchase medicines and beauty products from the nearest available pharmacy.

This frontend connects to the [PharmaHub ASP.NET Web API](https://github.com/PharmaHub-Ecommerce-Angular-WebAPI/PharmaHub-Ecommerce-WebAPI.git) backend and offers a seamless, responsive, and user-friendly experience.

## 🌐 Live Features

- 🔐 **Authentication (JWT-based)**
- 📩 **Email Confirmation Workflow**
- 🛒 **Shopping Cart with Stripe Payment Integration**
- 🏥 **Nearest Pharmacy Search by Medicine**
- 🧾 **Product Filtering, Sorting, Pagination**
- 📦 **Support for Product Packages**
- 📤 **Cloudinary Integration for Images**
- 🧪 **Client-side Form Validation**
- 📱 **Responsive Design (Mobile Friendly)**

## 🛠️ Technologies Used

- Angular 18
- TypeScript
- RxJS
- Angular Router
- Bootstrap 5
- Reactive Forms
- Cloudinary
- Stripe JS
- JSON Web Tokens (JWT)
- Angular Interceptors & Guards
- SweetAlert2 for notifications

## 🧪 Features in Detail

- **Login/Register with Email Confirmation**
- **Role-Based Access (Admin, Pharmacy Owner, User)**
- **Token Storage & Auto Logout on Expiry**
- **CRUD Operations for Pharmacies & Products**
- **Stripe Checkout with real card support**
- **Cloudinary file uploads with preview**
- **Responsive and adaptive layout**
- **Error handling via centralized services**

## 📁 Folder Structure

```bash
PharmaHub.Ecommerce.Angular/
├── src/
│   ├── app/
│   │   ├── core/              # Interceptors, guards, services
│   │   ├── shared/            # Shared components, pipes, directives
│   │   ├── auth/              # Login, register, email confirmation
│   │   ├── pharmacy/          # Pharmacy dashboard & management
│   │   ├── product/           # Product listing, details, packages
│   │   ├── cart/              # Shopping cart & checkout
│   │   ├── pages/             # Home, About, Contact
│   │   └── app.module.ts      # Main app module
│   ├── assets/                # Static files and images
│   ├── environments/          # Environment configs
│   └── index.html             # Root HTML file
├── angular.json              # Angular CLI config
├── package.json              # NPM dependencies
└── tsconfig.json             # TypeScript config
