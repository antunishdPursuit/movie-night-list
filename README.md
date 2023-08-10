how to create a react app

1. npx create-react-app name of project
2. npm install react-router-dom dotenv axios
3. Created a components and page folder
4. touch .env in the main folder, not in src or any other folders
### within .env should have 

```
REACT_APP_API_URL=http://localhost:3003
```

5. Add .env and .gitignore within the .gitignore file
6. Added a command "git log -1;"to the build script so last three recent commits from git log can be seen during the netifily build
7. In nettify, make sure to add the env vavirable 

```
REACT_APP_API_URL=Name of the backend(make sure to double check your route)
```

FrontEnd: https://chimerical-unicorn-5cfe13.netlify.app
BackEnd: https://moviebackend-h9qz.onrender.com
