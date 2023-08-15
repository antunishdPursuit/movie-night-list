The front end of this app is deployed on netfily and can be found below 
<br>
**FrontEnd-Netlify:** https://chimerical-unicorn-5cfe13.netlify.app
<br>
**FrontEnd-Github:** https://github.com/antunishdPursuit/movie-night-list
<br>
The backend of this app is deployed on render and can be found below
<br>
**BackEnd-Netlify:** https://moviebackend-h9qz.onrender.com
<br>
**BackEnd-Github:** https://github.com/antunishdPursuit/moviesBackEnd
<br>

how to create a react app

1. npx create-react-app name of project
2. npm install react-router-dom dotenv axios
3. Create a components and page folder
4. touch .env in the main folder, not in src or any other folders
    - within .env should have 

```
REACT_APP_API_URL=http://localhost:3003
```

5. Add .env within the .gitignore file
6. Add the command "git log -3;" to the script.build key within package.json to show the last three recent commits. This can help to show you what was the last commits that was used to build the website
7. In Netlify(or render), make sure to add the envirnoment variable 

```
REACT_APP_API_URL=Name of the backend you created on render and not the name of the database(make sure to double check your route)
```


