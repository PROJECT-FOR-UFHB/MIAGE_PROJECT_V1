# frontend

Comment accéder à l'application ?

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Première utilisation
1. Après avoir cloné le projet en local
2. Ouvrir la ligne de commande de Vscode
3. En ligne de commande se placer dans le sous dossier frontend (exemple : cd .\gestion-miage\frontend\)
4. Entrer la commande suivante dans le cmd :
```sh
npm install
```

### Run, Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# Connexion au backend

Lien de l'api : http://localhost:8000/api

## Procédure

1. Cloner le dossier backend du projet

2. Ouvrir un deuxieme workspace VS code

3. S'assurer que composer est installé, sinon l'installer (https://getcomposer.org/Composer-Setup.exe). Fermer et ouvrir VS code utiliser la version de php > 8.0

4. Créer une base de données

5. Créer le fichier .env et y inscrire le nom de la base de données

6. Générer une clé :

    ```sh
    php artisan generate:key
    ```
7. Entrer les informations concernant la base de données dans .env

8. Lancer en ligne de commande 

    ```sh
    php artisan run dev
    ```

# Communication API (Web socket)

Le dossier services contient les différents services.

## Quelques services

### apiclient

    C'est le service qui aide à entrer en contact avec le backend Laravel grace a Axios

#### authService

    Contient les fonctions qui communique avec le backend
    Il fait des appelles vers les endpoints necessaires à l'authentification
 