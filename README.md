# Employee Management System

A complete **Employee Management System** built with **Django REST Framework (DRF)**, **JWT Authentication**, and a minimal **HTML + JS + Ajax**.

## 📌 Features

### Authentication & Profile
- Register new users
- Login with JWT (access + refresh token)
- Change password
- View profile

### Dynamic Form Builder
- Create custom forms with fields: Text, Number, Date, Password, Textarea and Checkbox.
- Add fields dynamically (`Add Field` button)
- Drag-and-drop field ordering
- Store form structure in backend via API

### Employee CRUD
- Create employees using selected dynamic form
- Update employee details
- Store data in JSON format to handle flexible fields
- AJAX form submission (no Django form POST actions)

### Employee Listing
- Display all employees with dynamic columns based on form
- Filter by any field label
- Delete employee records
- Fully dynamic, AJAX-powered UI

---

## 🛠️ Tech Stack
- **Backend:** Python, Django, Django REST Framework
- **Auth:** JWT (SimpleJWT)
- **Frontend:** HTML, CSS, JavaScript, Ajax
- **Database:** SQLite
- **API Testing:** Postman collection included

---

## 🚀 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/safwanvk/employee_mngmt_with_form_builder.git
cd employee_mngmt_with_form_builder

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

---

## 📬 API Endpoints Overview

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/register/` | Register a new user |
| POST | `/api/v1/token/` | Login & get JWT |
| POST | `/api/v1/token/refresh/` | Refresh JWT |
| GET  | `/api/v1/users/me/` | View profile |
| POST | `/api/v1/change-password/` | Change password |
| POST | `/api/v1/logout/` | Logout |
| POST | `/api/v1/check-permission/` | Check permission |


### Form Builder
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/forms/` | Create form |
| GET | `/api/v1/forms/` | List forms |
| GET | `/api/v1/forms/{id}/fields` | Get form fields |
| POST | `/api/v1/forms/{id}/add_field/` | Add field to form |
| PUT | `/api/v1/forms/{id}/reorder/` | Reorder fields |

### Employees
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/employees/` | Create employee |
| GET | `/api/v1/employees/` | List employees (filters supported) |
| GET | `/api/v1/employees/{id}/` | Get employee |
| PUT | `/api/v1/employees/{id}/` | Update employee |
| DELETE | `/api/v1/delete-employee/` | Delete employee |

---

## 🧪 Postman Collection
A Postman collection (`postman_collection.json`) is included with:
- Auth API calls
- Form builder API calls
- Employee CRUD API calls
- filter examples

## 📸 Screenshots

A screenshots/ folder is included in this repository.
It contains reference images for:

- Authentication flow (Register, Login, Profile, Change Password)
- Dynamic Form Builder with Add Field + Drag-and-Drop
- Employee Creation & Update screens
- Employee Listing with search, filter, and delete actions

You can open these images to quickly understand the application’s UI and flow.