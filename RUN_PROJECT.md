# How to Run the Employee Management System

## Quick Start Guide

### Step 1: Update Maven Dependencies (First Time Only)

**In Eclipse:**
1. Right-click on the project (`firstMavenProject`) in Package Explorer
2. Select **Maven** → **Update Project...**
3. Check **"Force Update of Snapshots/Releases"**
4. Click **OK**
5. Wait for dependencies to download (check Progress view at bottom)

### Step 2: Ensure MySQL Database is Running

**Before running, make sure:**
1. MySQL Server is running
2. Database `kodnest` exists
3. Table `employee` exists with correct structure

**If database doesn't exist, run this SQL:**
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

**Check database credentials** in `src/main/resources/application.properties`:
- Username: `root`
- Password: `ayesha` (change if yours is different)

### Step 3: Run the Application

**Option A: Run in Eclipse (Recommended)**
1. Open `EmployeeManagementApplication.java`
   - Path: `src/main/java/com/kodnest/firstMavenProject/EmployeeManagementApplication.java`
2. Right-click on the file
3. Select **Run As** → **Java Application**
   - OR if available: **Run As** → **Spring Boot App**

**Option B: Run from Command Line (if Maven is installed)**
```bash
cd "D:\New folder\firstMavenProject"
mvn spring-boot:run
```

### Step 4: Check Console Output

Look for this message in the console:
```
Started EmployeeManagementApplication in X.XXX seconds
```

If you see errors, check the Troubleshooting section below.

### Step 5: Open the Web UI

1. Open your web browser
2. Go to: **http://localhost:8080**
3. You should see the Employee Management System UI

---

## Troubleshooting

### Error: "Cannot connect to database"
**Solution:**
- Make sure MySQL is running
- Check database credentials in `application.properties`
- Verify database `kodnest` exists
- Test connection: Try connecting with MySQL Workbench or command line

### Error: "Port 8080 already in use"
**Solution:**
1. Change port in `src/main/resources/application.properties`:
   ```
   server.port=8081
   ```
2. Then access at `http://localhost:8081`

### Error: "Dependencies not found" or compilation errors
**Solution:**
1. Right-click project → **Maven** → **Update Project**
2. Check **"Force Update"**
3. Wait for download to complete
4. If still errors: Project → **Clean** → Clean all projects

### Error: "ClassNotFoundException" or Spring Boot not starting
**Solution:**
1. Make sure you're running `EmployeeManagementApplication.java` (not `App.java`)
2. Check that Spring Boot dependencies are downloaded
3. Right-click project → **Refresh** (F5)

### UI not loading or showing errors
**Solution:**
1. Make sure you're accessing `http://localhost:8080` (not file://)
2. Check browser console (F12) for JavaScript errors
3. Verify files exist in `src/main/resources/static/`
4. Make sure the server started successfully

---

## Testing the Application

Once running:
1. **View Employees**: Click "View Employees" tab → Click "Refresh List"
2. **Add Employee**: Fill the form with employee details → Click "Add Employee"
3. **Search**: Enter an ID → Click "Search"
4. **Update**: Enter ID, select field, enter new value → Click "Update Employee"
5. **Delete**: Enter ID → Click "Delete Employee" → Confirm

---

## Stopping the Application

- In Eclipse: Click the red stop button in the Console view
- Or close the console/terminal window



