# Test Technique de Youssef Hadidi pour Appsolute

créer le fichier de variables d'environnement (.env) et ajouter cette variable qui contiendra la clé api à newsapi:
```
$ REACT_APP_NEWSKEY
```

installer les dependences de l'application:
```
$ npm install
```


Lancer l'application:
```
$ npm run dev
```


Améliorations potentielles:
- Persistance des données easy-peasy qui semble ne pas fonctionner en dev (serveur + client sur la même machine?) donc impossible d'actualiser une page de details d'un article
- Chargement des images auquelles on n'a pas accès (404 + peut etre un problème de CORS?) qui n'est pas previsible