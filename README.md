The front end of this app is depolyed on netfily and can be found below 
FrontEnd-Netlify: https://chimerical-unicorn-5cfe13.netlify.app
FrontEnd-Github: https://github.com/antunishdPursuit/movie-night-list
The backend of this app is depolyed on render and can be found below
BackEnd-Netlify: https://moviebackend-h9qz.onrender.com
BackEnd-Github: https://github.com/antunishdPursuit/moviesBackEnd

how to create a react app

1. npx create-react-app name of project
2. npm install react-router-dom dotenv axios
3. Created a components and page folder
4. touch .env in the main folder, not in src or any other folders
### within .env should have 

```
REACT_APP_API_URL=http://localhost:3003
```

5. Add .env within the .gitignore file
6. Added a command "git log -3;" to script within package.json to show the last three recent commits from git log can be seen during the netifily build
7. In Netlify, make sure to add the envirnoment variable 

```
REACT_APP_API_URL=Name of the backend you created on render and not the name of the database(make sure to double check your route)
```


