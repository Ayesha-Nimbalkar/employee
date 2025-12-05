# Terminal Commands to Run the Project

## Option 1: Using Maven (if Maven is installed)

### Step 1: Open Terminal/PowerShell
Navigate to your project directory:
```powershell
cd "D:\New folder\firstMavenProject"
```

### Step 2: Download Dependencies (First Time Only)
```powershell
mvn clean install
```

### Step 3: Run the Application
```powershell
mvn spring-boot:run
```

### Step 4: Open Browser
Once you see: `Started EmployeeManagementApplication in X.XXX seconds`
Open: **http://localhost:8080**

---

## Option 2: Using Eclipse (Recommended - No Terminal Needed)

### Step 1: Update Maven Dependencies
1. Right-click project → **Maven** → **Update Project...**
2. Check **"Force Update"**
3. Click **OK**

### Step 2: Run the Application
1. Open `EmployeeManagementApplication.java`
2. Right-click → **Run As** → **Java Application**
3. Check console for: `Started EmployeeManagementApplication...`
4. Open browser: **http://localhost:8080**

---

## Option 3: Compile and Run Manually (Advanced)

### Compile:
```powershell
javac -cp "target/classes;target/lib/*" src/main/java/com/kodnest/firstMavenProject/*.java
```

### Run:
```powershell
java -cp "target/classes;target/lib/*" com.kodnest.firstMavenProject.EmployeeManagementApplication
```

---

## Quick Check Commands

### Check if Maven is installed:
```powershell
mvn -version
```

### Check if Java is installed:
```powershell
java -version
```

### Check if project compiles:
```powershell
mvn compile
```

---

## Troubleshooting

### If Maven command not found:
- Use **Eclipse** method (Option 2) - it's easier!
- Or install Maven and add it to PATH

### If port 8080 is busy:
Change port in `src/main/resources/application.properties`:
```
server.port=8081
```

### If database connection fails:
- Make sure MySQL is running
- Check credentials in `application.properties`
- Verify database `kodnest` exists

---

## Stop the Application

**In Terminal:** Press `Ctrl + C`

**In Eclipse:** Click the red stop button in Console view

