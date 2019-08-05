![SphinxApp](https://github.com/altrazmedia/sphinx-app-client/blob/master/src/images/logo.png)

### SphinxApp is the app I made as a part of my master thesis. It's the app for schools and universities which allows teachers to conduct simple quizes on students.

Client application was made with React (CRA) and Redux. 

Live: http://altrazmedia.com/sphinx/. Login as a teacher (email: "geograf@test.pl", password: "abcde") or as a student (email: "ilona@wp.pl", password: "ilona").

API: https://github.com/altrazmedia/sphinx-app-server

#### i18n

App is available in both Polish and English. [i18next framework](https://www.npmjs.com/package/i18next) was used to provide internationalization. 

All the translated text are stored in `/src/utils18n/translations_keys.json` file, however to add new keys one should edit one of the yaml files stored in `/src/utils18n/translations` directory (or add a new one) and run `/src/parseTranslations.js` script, which watch for changes in yaml files and parses them to the JSON file. 
