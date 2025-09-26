# HomeBasket 🛒

**HomeBasket** is a full-stack grocery management web app built with **Angular** (frontend), **Python + Django REST Framework** (backend), and **PostgreSQL** (database). It allows users to register, login, manage grocery items, view dashboards, and track inventory with ease.

---

## 🌟 Features

- JWT-based user authentication (login/logout)
- Dashboard to add, view, and delete grocery items
- Categorized items with multiple units (kg, pcs, liters, etc.)
- Responsive UI using Angular + Bootstrap
- Protected routes with **AuthGuard**
- Reactive header showing user's `first_name`

---

## 🛠 Tech Stack

| Layer       | Technology                           |
| ----------- | ------------------------------------ |
| Frontend    | Angular 17+, TypeScript, Bootstrap    |
| Backend     | Django 4, Django REST Framework      |
| Database    | PostgreSQL 15+                        |
| Authentication | JWT (JSON Web Tokens)             |
| HTTP Client | Angular HttpClient                   |
| State Management | BehaviorSubject for reactive profile |

---

## 📁 Project Structure

### Backend (`homebasket_backend`)

```
homebasket_backend/
│
├── accounts/         # Auth, JWT, profile APIs
├── grocery/          # Item CRUD APIs
├── homebasket/       # Project settings
├── manage.py
└── requirements.txt
```

### Frontend (`homebasket-frontend`)

```
homebasket-frontend/
│
├── src/app/
│   ├── pages/
│   │   ├── dashboard/
│   │   └── login/
│   ├── services/
│   │   └── auth.service.ts
│   ├── guards/
│   │   └── auth-guard.ts
│   └── app-routing.module.ts
├── angular.json
└── package.json
```

---

## ⚡ Screenshots / Demo

*![alt text](/Plan%20&%20Design/image.png)*
*![alt text](/Plan%20&%20Design/image-1.png)*
*![alt text](/Plan%20&%20Design/image-2.png)*
*![alt text](/Plan%20&%20Design/image-3.png)*
*![alt text](/Plan%20&%20Design/image-4.png)*
*![alt text](/Plan%20&%20Design/image-5.png)*
*![alt text](/Plan%20&%20Design/image-6.png)*

---

## 🚀 Setup & Installation

### Backend (Django + PostgreSQL)

1. **Create virtual environment**:

```bash
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
```

2. **Install dependencies**:

```bash
pip install -r requirements.txt
```

3. **Configure PostgreSQL In ENV** in `HomeBasket\homebasket_backend\.env`:

```bash
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/your_database

```

4. **Apply migrations**:

```bash
python manage.py makemigrations
python manage.py migrate
```

5. **Create superuser (optional)**:

```bash
python manage.py createsuperuser
```

6. **Run backend server**:

```bash
python manage.py runserver
```

---

### Frontend (Angular)

1. Navigate to frontend folder:

```bash
cd homebasket-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run Angular server:

```bash
ng serve
```

4. Open in browser:

```
http://localhost:4200
```

---

## 🔗 API Endpoints

| Method | Endpoint              | Description                |
| ------ | -------------------- | -------------------------- |
| POST   | /api/auth/token/      | Login, get JWT token       |
| GET    | /api/auth/profile/    | Get logged-in user profile |
| GET    | /api/items/           | Fetch all items for user   |
| POST   | /api/items/           | Add new item               |
| DELETE | /api/items/{id}/      | Delete item by ID          |

---

## 💡 Usage

1. **Login** with your credentials  
2. **Dashboard**: Add items with name, quantity, unit, category  
3. **Item List**: Displays items with `created_at` timestamp  
4. **Logout** clears token and redirects to login

---

## ⚙️ Notes

- Dashboard and other routes are protected with **Angular AuthGuard**  
- `created_at` is automatically set by the backend  
- Header dynamically shows **first_name** or **username**  
- JWT token must be included in headers for all protected API calls

---

## 📝 License

This project is licensed under the **MIT License**.