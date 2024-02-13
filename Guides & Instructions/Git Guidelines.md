# Git Guidelines

These guidelines are designed to help streamline our development process, ensuring consistency and efficiency across our team. By following these guidelines, we aim to maintain a clean and organized codebase, facilitate collaboration, and simplify the process of reviewing and merging code.

## Branching Strategy
- **Main Branch ('main'):** Represents the official release history. Only release-ready code should be merged into this branch.
- **Create a new branch for each feature or task.**
- **Use naming convention for branches:**
    1. Prefix the branch name with the task or feature ID, such as `TASK-4.2/`.
    2. Add a short, descriptive name of the task or feature after the ID, separated by dashes (e.g., `TASK-4.2/CSR-access-pending-customer-reservations-log`).
    3. Prefix bug fix branches with `bugfix/` followed by a brief, descriptive name (e.g., `bugfix/issue-123`).

## Commit Messages
- **Commit messages are essential for understanding the history of a project and the reasons behind each change.**
- **Use the imperative mood:** Start the message with a verb in the present tense, such as "Add," "Fix," "Update," etc.
- **Keep it short and descriptive:** Limit the first line to around 50 characters.
- **Be consistent:** Maintain a consistent style and format for commit messages across the project.

## Pull Requests
- **Before merging a feature branch into main, create a pull request (PR) for review.**
- **Assign at least two team members to review the PR:** For frontend tasks, the reviewers should be frontend developers, and for backend tasks, the reviewers should be backend developers.
- **Use PR templates to include necessary information,** such as a description of the changes, testing steps, and any relevant documentation updates.

## Code Reviews
- **Conduct thorough code reviews to maintain code quality and identify potential issues.**
- **Provide constructive feedback and suggestions for improvement.**

## Handling Merge Conflicts
- **If you encounter a merge conflict, resolve it locally before pushing your changes.**
- **Communicate with team members to ensure everyone is aware of the conflict and its resolution.**

## Labels Usage

### User Story
- Use the `user-story` label for issues or tasks that correspond to a user story in the project's backlog.

### Task
- Use the `task` label for general tasks that need to be completed as part of the project.

### Bug
- Use the `bug` label for issues that represent bugs or defects in the code.

### Icebox
- Use the `icebox` label for tasks or issues that are not currently prioritized but may be considered in the future.

### Frontend
- Use the `frontend` label for tasks or issues that are related to frontend development.

### Backend
- Use the `backend` label for tasks or issues that are related to backend development.

### Documentation
- Use the `documentation` label for tasks or issues that are related to documentation updates or improvements.

