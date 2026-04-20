# 🎓 Student Performance Prediction — Project Flowchart

---

## 1. Overall System Architecture

```mermaid
graph TB
    User(["👤 User<br/>(Browser)"])

    subgraph FE["⚛️ React Frontend  •  Vite  •  Port 3000"]
        Login["Login / Register"]
        Auth["AuthContext<br/>JWT + Role State"]
        Router["React Router<br/>Protected Routes"]
        Pages["Pages / Views"]
        API["api.js<br/>Axios Service"]
    end

    subgraph BN["🟩 Node.js Backend  •  Express  •  Port 5000"]
        AuthRoute["/api/auth"]
        StudentRoute["/api/students"]
        AuthCtrl["authController"]
        StudCtrl["studentController"]
        MW["JWT Middleware<br/>protect()"]
        Models["Mongoose Models<br/>User | Student"]
    end

    subgraph BP["🐍 Python Backend  •  FastAPI  •  Port 8000"]
        PredRoute["/api/predict"]
        MLModel["ML Prediction<br/>Model / Logic"]
        PredSchema["Schemas<br/>predict_schemas.py"]
    end

    DB[("🍃 MongoDB")]

    User -->|"HTTP"| Login
    Login --> Auth
    Auth --> Router
    Router --> Pages
    Pages --> API
    API -->|"REST + JWT"| AuthRoute
    API -->|"REST + JWT"| StudentRoute
    AuthRoute --> AuthCtrl
    StudentRoute --> MW --> StudCtrl
    AuthCtrl --> Models
    StudCtrl --> Models
    Models --> DB
    StudCtrl -->|"Triggers Prediction"| PredRoute
    PredRoute --> MLModel
    MLModel --> PredSchema
    PredSchema -->|"Prediction Result"| StudCtrl
```

---

## 2. Authentication Flow

```mermaid
flowchart TD
    A([Start]) --> B["User visits '/'"]
    B --> C{"Already\nlogged in?\n(localStorage token)"}
    C -->|Yes| D["Go to /dashboard"]
    C -->|No| E["Show Login Page"]

    E --> F{"Login or\nSignup?"}

    F -->|Signup| G["Fill: email + password + role\n+ name / phone / address"]
    G --> H["POST /api/auth/register"]
    H --> I{"Success?"}
    I -->|No| J["Show error message"]
    J --> E
    I -->|Yes| K["Show ✅ Account Created popup"]
    K --> E

    F -->|Login| L["Enter email + password\n+ select role"]
    L --> M["POST /api/auth/login"]
    M --> N{"Valid\ncredentials?"}
    N -->|No| O["Show error:\nInvalid email or password"]
    O --> E
    N -->|Yes| P["Receive JWT token + user data"]
    P --> Q["AuthContext.login(userData)\nSaves to state + localStorage"]
    Q --> R["setThemeByRole(role)"]
    R --> D

    D --> S["PrivateRoute checks token"]
    S --> T{"Token\nexists?"}
    T -->|No| E
    T -->|Yes| U["ProtectedRoute checks role"]
    U --> V{"Role\nallowed?"}
    V -->|No| W["/unauthorized"]
    V -->|Yes| X["✅ Render Page"]
```

---

## 3. Role-Based Access Control (RBAC)

```mermaid
flowchart LR
    subgraph Roles
        A["👑 Admin"]
        T["👨‍🏫 Teacher"]
        S["👨‍🎓 Student"]
    end

    subgraph Pages
        DB["📊 Dashboard"]
        STU["👥 Students"]
        BR["🌿 Branches"]
        SUB["📚 Subjects"]
        AN["📈 Analytics"]
        PR["🤖 Prediction"]
        PRO["👤 My Profile"]
        EP["✏️ Edit Profile"]
        SET["⚙️ Settings"]
        UNA["🚫 Unauthorized"]
    end

    A --> DB
    A --> STU
    A --> BR
    A --> SUB
    A --> AN
    A --> PR
    A --> PRO
    A --> EP
    A --> SET

    T --> DB
    T --> STU
    T --> BR
    T --> SUB
    T --> AN
    T --> PR
    T --> PRO
    T --> EP
    T --> SET

    S --> DB
    S --> STU
    S --> PR
    S --> PRO
    S --> EP
    S --> SET

    S -. "blocked" .-> BR
    S -. "blocked" .-> SUB
    S -. "blocked" .-> AN
    S -. "blocked" .-> UNA
```

---

## 4. Student Data CRUD Flow

```mermaid
flowchart TD
    A([User on Students Page]) --> B{"Action?"}

    B -->|"View List"| C["GET /api/students\n(with filters/pagination)"]
    C --> D["studentController.getAll()"]
    D --> E["MongoDB Query"]
    E --> F["Return student list"]
    F --> G["Render Students table"]

    B -->|"Add Student"| H["Fill Add Student Form"]
    H --> I["POST /api/students"]
    I --> J["studentController.create()"]
    J --> K["Save to MongoDB"]
    K --> L["Trigger Python AI Prediction"]
    L --> M["POST :8000/api/predict"]
    M --> N["ML Model runs"]
    N --> O["Return predicted grade/risk"]
    O --> P["Store prediction in student doc"]
    P --> Q["✅ Student Added + Predicted"]

    B -->|"Edit Student"| R["Open Edit Form\npopulate fields"]
    R --> S["PUT /api/students/:id"]
    S --> T["studentController.update()"]
    T --> U["Update MongoDB"]
    U --> L

    B -->|"Delete Student"| V["Confirm delete dialog"]
    V --> W["DELETE /api/students/:id"]
    W --> X["studentController.delete()"]
    X --> Y["Remove from MongoDB"]
    Y --> Z["✅ Deleted, refresh list"]
```

---

## 5. AI Prediction Flow

```mermaid
flowchart TD
    A([Trigger: Student Created / Updated]) --> B["Node.js calls\nPOST http://localhost:8000/api/predict"]

    B --> C["FastAPI receives request"]
    C --> D["Validate payload\npredict_schemas.py"]

    D --> E{"Validation\nPassed?"}
    E -->|No| F["Return 422 Error"]
    E -->|Yes| G["Extract features:\nmarks, attendance,\nbranch, semester..."]

    G --> H["ML Model processes features"]
    H --> I["Calculate performance score"]
    I --> J{"Risk Level?"}

    J -->|"Score < 40"| K["🔴 High Risk"]
    J -->|"Score 40-70"| L["🟡 Average"]
    J -->|"Score > 70"| M["🟢 Good Performance"]

    K --> N["Return prediction result\n+ recommendations"]
    L --> N
    M --> N

    N --> O["Node.js stores result\nin Student document"]
    O --> P["Frontend displays\nPrediction Badge + Chart"]
```

---

## 6. Profile Edit Flow

```mermaid
flowchart TD
    A([User clicks Edit Profile]) --> B["Load /edit-profile"]
    B --> C["Read from AuthContext\n(in-memory state)"]
    C --> D{"AuthContext\nhas user?"}
    D -->|No| E["Fall back to localStorage"]
    E --> F{"localStorage\nhas user?"}
    F -->|No| G["Show: Please login again"]
    F -->|Yes| H["Populate form fields"]
    D -->|Yes| H

    H --> I["User edits fields\nname / phone / address\nbranch / semester / bio"]
    I --> J["Click Save Changes"]
    J --> K["handleSave()"]
    K --> L["AuthContext.updateUser(fields)"]
    L --> M["Update React state (setUser)"]
    L --> N["Update localStorage"]
    M --> O["✅ Profile updated everywhere\nNavbar, Profile page, etc."]
    N --> O
```

---

## 7. Frontend Component Tree

```mermaid
graph TD
    Main["main.jsx"]
    App["App.jsx\nBrowserRouter"]
    TP["ThemeProvider\n(ThemeContext)"]
    AP["AuthProvider\n(AuthContext)"]

    Main --> App
    App --> TP --> AP

    AP --> PUB["Public Routes"]
    AP --> PRIV["Protected Routes\nPrivateRoute + ProtectedRoute"]

    PUB --> LG["Login.jsx"]
    PUB --> RG["Register.jsx"]
    PUB --> UN["Unauthorized.jsx"]

    PRIV --> DB["Dashboard.jsx"]
    PRIV --> ST["Students.jsx"]
    PRIV --> BR["Branches.jsx"]
    PRIV --> SB["Subjects.jsx"]
    PRIV --> AN["Analytics.jsx"]
    PRIV --> PR["Prediction.jsx"]
    PRIV --> PRO["StudentProfile.jsx"]
    PRIV --> EP["EditProfile.jsx"]
    PRIV --> SE["Settings.jsx"]

    DB --> SB2["Sidebar.jsx"]
    DB --> NB["Navbar.jsx"]
    DB --> AI["AISidebar.jsx"]
```

---

## 8. Data Models

```mermaid
erDiagram
    USER {
        ObjectId _id
        string email
        string password
        string role
        date createdAt
        date updatedAt
    }

    STUDENT {
        ObjectId _id
        string name
        string email
        string branch
        int semester
        float marks
        float attendance
        string status
        string prediction
        float riskScore
        date createdAt
    }

    PREDICTION_RESULT {
        string studentId
        float score
        string riskLevel
        string[] recommendations
        date generatedAt
    }

    USER ||--o{ STUDENT : "manages"
    STUDENT ||--|| PREDICTION_RESULT : "has"
```

---

## 9. Tech Stack Summary

| Layer | Technology | Port |
|-------|-----------|------|
| **Frontend** | React + Vite + React Router | 3000 |
| **Styling** | TailwindCSS + React Icons | — |
| **State** | AuthContext + StudentContext | — |
| **HTTP Client** | Axios (api.js) | — |
| **Node Backend** | Express.js + JWT + bcrypt | 5000 |
| **Python Backend** | FastAPI + Uvicorn | 8000 |
| **Database** | MongoDB + Mongoose | 27017 |
| **Auth** | JWT Bearer Token | — |
| **AI/ML** | Python ML Model (FastAPI) | 8000 |
