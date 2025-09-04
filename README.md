# HomeBasket 🛒

\
\
\


**HomeBasket** is a full-stack grocery management web app built with **Angular** (frontend), **Django + Django REST Framework** (backend), and **PostgreSQL** (database). It allows users to login, manage items, view dashboards, and track groceries with ease.

---

## 🌟 Features

- JWT-based user authentication (login/logout)
- Dashboard to add, view, and delete grocery items
- Categorized items and multiple units (kg, pcs, liters, etc.)
- Auto-records item creation date (`created_at`)
- Responsive UI with Angular + Bootstrap
- Protected routes using **AuthGuard**
- Fully reactive header displaying `first_name` or `username`

---

## 🛠 Tech Stack

| Layer       | Technology                           |
| ----------- | ------------------------------------ |
| Frontend    | Angular 16, Bootstrap, TypeScript    |
| Backend     | Django 4, Django REST Framework      |
| Database    | PostgreSQL 15                        |
| Auth        | JWT (JSON Web Tokens)                |
| HTTP Client | Angular HttpClient                   |
| State Mgmt  | BehaviorSubject for reactive profile |

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

\
\


---

## 🚀 Setup & Installation

### Backend (Django + PostgreSQL)

1. Create virtual environment:

```bash
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
```

2. Install requirements:

```bash
pip install -r requirements.txt
```

3. Configure PostgreSQL in `homebasket/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'homebasket_db',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}
```

4. Apply migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create superuser (optional):

```bash
python manage.py createsuperuser
```

6. Run backend server:

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

| Method | Endpoint           | Description                |
| ------ | ------------------ | -------------------------- |
| POST   | /api/auth/token/   | Login, get JWT token       |
| GET    | /api/auth/profile/ | Get logged-in user profile |
| GET    | /api/items/        | Fetch all items for user   |
| POST   | /api/items/        | Add new item               |
| DELETE | /api/items/{id}/   | Delete item by ID          |

---

## 💡 Usage

1. **Login** with your credentials
2. **Dashboard**: Add items with name, quantity, unit, category
3. **Item List**: Shows items with `created_at` timestamp
4. **Logout** clears token and redirects to login

---

## ⚙️ Notes

- Dashboard and other routes are protected using **Angular AuthGuard**
- `created_at` is automatically set by the backend
- Header dynamically shows **first\_name** or **username**
- JWT token must be included in headers for all protected API calls

---

## 📝 License

This project is licensed under **MIT License**.

