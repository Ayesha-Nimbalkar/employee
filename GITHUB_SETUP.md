# How to Upload Project to GitHub

## Step-by-Step Guide

### Step 1: Create a GitHub Account (if you don't have one)
1. Go to [github.com](https://github.com)
2. Sign up for a free account
3. Verify your email

### Step 2: Create a New Repository on GitHub
1. Click the **"+"** icon in the top right corner
2. Select **"New repository"**
3. Fill in the details:
   - **Repository name**: `employee-management-system` (or any name you prefer)
   - **Description**: "Advanced Employee Management System with Spring Boot"
   - **Visibility**: Choose **Public** or **Private**
   - **DO NOT** check "Initialize with README" (we already have files)
4. Click **"Create repository"**

### Step 3: Initialize Git in Your Project

Open **Terminal/PowerShell** in your project folder (`firstMavenProject`):

```powershell
cd "D:\New folder\firstMavenProject"
```

### Step 4: Initialize Git Repository

```bash
git init
```

### Step 5: Add All Files

```bash
git add .
```

### Step 6: Create Initial Commit

```bash
git commit -m "Initial commit: Employee Management System"
```

### Step 7: Add GitHub Remote

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/employee-management-system.git
```

**Or if you're using SSH:**
```bash
git remote add origin git@github.com:YOUR_USERNAME/employee-management-system.git
```

### Step 8: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

You'll be prompted for your GitHub username and password (or personal access token).

---

## 🔐 Authentication Issues?

If you get authentication errors, use a **Personal Access Token**:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **"Generate new token"**
3. Give it a name and select scopes: `repo`
4. Copy the token
5. Use the token as password when pushing

---

## 📝 Quick Commands Summary

```bash
# Navigate to project
cd "D:\New folder\firstMavenProject"

# Initialize git
git init

# Add files
git add .

# Commit
git commit -m "Initial commit: Employee Management System"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/employee-management-system.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🔄 Updating Your Repository

After making changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

---

## 📋 What Gets Uploaded?

The `.gitignore` file ensures these are **NOT** uploaded:
- Compiled `.class` files
- `target/` folder (Maven build output)
- IDE configuration files
- Log files
- Database credentials

**These WILL be uploaded:**
- Source code (`.java` files)
- Frontend files (HTML, CSS, JS)
- Configuration files (`pom.xml`, `application.properties`)
- Documentation (README.md)

---

## ✅ Verify Upload

1. Go to your GitHub repository page
2. You should see all your project files
3. The README.md will be displayed on the repository homepage

---

## 🎉 Done!

Your project is now on GitHub! Share the repository URL with others.

