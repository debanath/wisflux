# Day 3

## Git
It is a distributed version control system that creates checkpoints in our timeline allowing us to go back to it if some anomalies or problem occurs
> [!Note]  
> Git follows a graph structure where each commit carries the pointer to the parent commit, enabling git to track history and mange branches efficently


commands :
- `git init` -> initialise git repo in the current directory
- `git add .` -> adds all changes to the staging area
- `git add <filename>` -> adds a specific file to the staging area
- `git status` -> displays the current state of the working directory and staging area
- `git add` -> starts tracing changes to new or modified files
- `git log` -> shows a log/history of commits in the current branch
- `git commit -m "message"` -> commits the stageg changes with a message
- `git checkout -b <branchName>` -> creates adn switches to a new branch
- `git checkout master` -> switches to the master branch
- `git checkout -` -> switches to the previous branch we were on
- `git remote add origin <link>`-> adds a remote repository
- `git push` -> pushes our committed changes to the remote repo
- `git fetch` -> fetches updates from the remote repository
- `git pull` -> fetches and automatically merges changes from the remote repo into our current branch
- `git merge <branch>` -> merges a specific branch into our current branch

> [!IMPORTANT]  
> **Git Fetch vs Git Pull**
> 
> - git fetch  
>   - downloads updates from the remote.  
>   - does not merge into your local branch.  
>   - safe for checking updates first.  
> 
> - git pull  
>   - does everything fetch does plus a merge.  
>   - automatically updates your current branch.  
>   - great when you're ready to sync with remote.


