# Employee Management System

A modern, advanced Employee Management System built with Spring Boot, MySQL, and a beautiful web interface.

## 🚀 Features

### Core Features
- ✅ **CRUD Operations** - Create, Read, Update, Delete employees
- ✅ **Advanced Search & Filtering** - Search by name, email, filter by type
- ✅ **Pagination** - Efficient handling of large datasets
- ✅ **Sorting** - Sort by ID, Name, Salary, or Type
- ✅ **Bulk Operations** - Delete multiple employees at once

### Advanced Features
- 📊 **Interactive Dashboard** - Real-time statistics and metrics
- 📈 **Data Visualization** - Charts for salary distribution and employee types
- 📥 **Export Functionality** - Export data to CSV and generate reports
- 🎨 **Modern UI** - Beautiful, responsive design with animations
- ✅ **Form Validation** - Comprehensive input validation
- 🔍 **Real-time Analytics** - Visual insights into your workforce

## 🛠️ Tech Stack

- **Backend**: Spring Boot 2.7.14
- **Database**: MySQL 8.0
- **Frontend**: HTML5, CSS3, JavaScript
- **Charts**: Chart.js
- **Build Tool**: Maven

## 📋 Prerequisites

- Java JDK 8 or higher
- Maven (or use IDE's built-in Maven)
- MySQL Server
- Web Browser (Chrome, Firefox, Edge, etc.)

## 🗄️ Database Setup

1. Start MySQL Server
2. Create database:
```sql
CREATE DATABASE IF NOT EXISTS kodnest;
USE kodnest;

CREATE TABLE IF NOT EXISTS employee (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    salary INT,
    phone INT,
    email VARCHAR(100),
    type VARCHAR(50)
);
```

3. Update database credentials in `src/main/resources/application.properties` if needed:
```properties
spring.datasource.username=root
spring.datasource.password=your_password
```

## 🏃 Running the Application

### Method 1: Using Eclipse/IDE
1. Import project as Maven project
2. Right-click project → **Maven** → **Update Project**
3. Run `EmployeeManagementApplication.java` as Java Application
4. Open browser: `http://localhost:8080`

### Method 2: Using Maven Command Line
```bash
mvn clean install
mvn spring-boot:run
```

## 📁 Project Structure

```
firstMavenProject/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/kodnest/firstMavenProject/
│   │   │       ├── EmployeeManagementApplication.java
│   │   │       ├── EmployeeController.java
│   │   │       ├── EmployeeManagement.java
│   │   │       ├── Employee.java
│   │   │       └── WebConfig.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/
│   │           ├── index.html
│   │           ├── styles.css
│   │           └── script.js
│   └── test/
└── pom.xml
```

## 🎯 API Endpoints

- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `POST /api/employees` - Add new employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

## 📸 Screenshots

The application features:
- Beautiful gradient background
- Animated header with rotating quotes
- Interactive dashboard with statistics
- Advanced filtering and search
- Data visualization charts
- Responsive design

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as part of learning Spring Boot and web development.

---

**Note**: Make sure MySQL is running before starting the application!

