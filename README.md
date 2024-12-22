# 🐾 **PetAdoption**

PetAdoption is a web-based platform designed to simplify the pet adoption process by seamlessly connecting pet owners with potential adopters. Built using modern technologies, the platform offers robust features for managing pets, streamlining adoption workflows, and enhancing user engagement.

---

## 🌟 **Key Features**

### 🐕 1. **Owner Pages**

- 🖍️ **Owner Form**:
  - Allows pet owners to submit details about their pets for adoption, including images, descriptions, and other necessary information.
- 🐾 **My Animals Page**:
  - Displays a personalized list of pets uploaded by the owner, with options for managing or updating pet details.

### 🐾 2. **Adopter Features**

- 🔍 **Browse Registered Pets**:
  - Adopters can view a comprehensive list of all registered pets, complete with images and details.
- 🐶 **Pet Adoption Requests**:
  - Adopters can choose pets they wish to adopt directly from the list.
- 🏆 **Leaderboard Page**:
  - Features a ranking of top adopters, rewarding the top 3 users with a **₹500 discount** on adoption fees.

### ⚙️ 3. **Backend Functionality**

- 🗾️ **Image Management**:
  - Owners upload pet images, which are stored and managed efficiently via the backend API.
- 🔒 **JWT Authentication**:
  - Secures the application by requiring token-based authentication for critical API interactions.
- 👥 **Role-Based Access**:
  - Ensures proper access control for owners and adopters, maintaining a secure and seamless experience.

### 🔄 4. **Live Features**

- 🚀 **Dynamic Content Updates**:
  - Pet details and availability statuses are updated in real time, ensuring users have the most accurate information.
- ⚠️ **Efficient Error Handling**:
  - Unauthorized requests are managed gracefully using an HTTP interceptor for attaching JWT tokens automatically.

---

## 🛠️ **Technology Stack**

### 🎨 **Frontend**

- 🔍 **Framework**: Angular 18
- 🎨 **Design**: Light-colored buttons and responsive layout ensuring accessibility and readability on white backgrounds.

### 💄 **Backend**

- ⚙️ **API**: .NET Core for robust backend operations.
- 🗃️ **Database**: SQL Server Management Studio (SSMS) for efficient data storage and retrieval.

### 🔗 **Key Integrations**

- 🔐 **HTTP Interceptors**: Facilitates seamless API requests with token-based authentication.
- 📂 **Assets Configuration**: Images and static files are served from the `public` folder for optimized loading.

---

## 🚀 **Get Started**

> Explore, adopt, and connect with pets in need of a loving home! ❤️

