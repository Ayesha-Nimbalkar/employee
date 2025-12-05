# Quick GitHub Upload Guide

## 🚀 Fast Track (Copy & Paste)

### 1. Open PowerShell in Project Folder
```powershell
cd "D:\New folder\firstMavenProject"
```

### 2. Run These Commands (One by One)

```powershell
# Initialize git
git init

# Add all files
git add .

# Create commit
git commit -m "Initial commit: Employee Management System"

# Add your GitHub repository URL (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 📝 Before You Start

1. **Create GitHub Repository First:**
   - Go to github.com
   - Click "+" → "New repository"
   - Name it (e.g., "employee-management-system")
   - Click "Create repository"
   - Copy the repository URL

2. **Replace in commands above:**
   - `YOUR_USERNAME` = Your GitHub username
   - `REPO_NAME` = Your repository name

---

## 🔑 Authentication

When you run `git push`, GitHub will ask for:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your GitHub password)

**To create token:**
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select `repo` scope
4. Copy and use as password

---

## ✅ That's It!

Your project will be on GitHub! Check `GITHUB_SETUP.md` for detailed instructions.

