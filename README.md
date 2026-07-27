# Portfolio de Dimitry LEONCO

Portfolio statique en HTML, CSS et JavaScript, conçu pour être publié sur GitHub Pages.

## Structure

```text
Portfolio/
├── index.html
├── css/style.css
├── js/script.js
└── assets/
    ├── cv/
    ├── images/
    └── projects/
```

## Modifier les liens

Les liens vers GitHub, LinkedIn, Instagram et les dépôts des projets sont regroupés au début de `js/script.js`, dans l'objet `portfolioLinks`.

Une URL de projet vide affiche automatiquement « Dépôt bientôt disponible ».

## Tester localement

Ouvrez `index.html` dans un navigateur, ou lancez un serveur local depuis ce dossier :

```bash
python -m http.server 8000
```

Puis ouvrez `http://localhost:8000`.

## Publication avec GitHub Pages

1. Copiez le contenu de ce dossier dans le dépôt GitHub du portfolio.
2. Envoyez les fichiers sur la branche `main`.
3. Dans GitHub, ouvrez **Settings > Pages**.
4. Choisissez **Deploy from a branch**, puis `main` et `/ (root)`.
5. Enregistrez et attendez la publication de l'URL GitHub Pages.
