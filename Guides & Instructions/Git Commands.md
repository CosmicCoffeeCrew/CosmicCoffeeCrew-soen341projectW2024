# Git Commands

## Configuring Git
- `git config --global user.name "Your Name"`: Set your username globally.
- `git config --global user.email "youremail@example.com"`: Set your email globally.

## Initializing a Repository
- `git init`: Initialize a new Git repository in the current directory.

## Cloning a Repository
- `git clone <repository-url>`: Clone a repository from a remote server to your local machine.

## Adding and Committing Changes
- `git add <file>`: Add a file to the staging area.
- `git add .`: Add all changes in the current directory to the staging area.
- `git commit -m "Commit message"`: Commit staged changes with a descriptive message.

## Branching and Merging
- `git branch`: List all branches in the repository.
- `git branch <branch-name>`: Create a new branch.
- `git checkout <branch-name>`: Switch to a different branch.
- `git merge <branch-name>`: Merge changes from one branch into the current branch.

## Checking Status and History
- `git status`: Show the status of the working directory and staging area.
- `git log`: Display the commit history.
- `git diff`: Show the differences between the working directory, staging area, and the last commit.

## Remote Repositories
- `git remote add origin <repository-url>`: Add a remote repository.
- `git push -u origin <branch-name>`: Push changes to a remote repository.
- `git pull origin <branch-name>`: Pull changes from a remote repository.

## Undoing Changes
- `git reset HEAD <file>`: Unstage a file.
- `git checkout -- <file>`: Discard changes in the working directory for a specific file.
- `git reset --hard HEAD`: Discard all changes in the working directory and staging area since the last commit.
