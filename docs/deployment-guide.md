# Guide de déploiement

## Déploiement statique (Phase 1 — démo)

Le projet actuel est 100% statique (HTML/CSS/JS, aucun build requis) et peut
être déployé gratuitement sur n'importe lequel de ces hébergeurs :

### Netlify (recommandé pour la simplicité)
1. Créer un compte sur netlify.com
2. Glisser-déposer le dossier du projet sur le tableau de bord Netlify
   (ou connecter un dépôt Git pour un déploiement automatique)
3. Le site est en ligne immédiatement avec une URL `*.netlify.app`

### Vercel
1. `npm i -g vercel` puis `vercel` depuis la racine du projet
2. Suivre les instructions (aucune configuration nécessaire, projet statique)

### GitHub Pages
1. Pousser le projet sur un dépôt GitHub
2. Paramètres du dépôt → Pages → Source : branche `main`, dossier `/`
3. Le site est disponible sur `https://<utilisateur>.github.io/<repo>/`

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## Migration vers un backend réel (Firebase) — avant la Phase 4

L'authentification actuelle (`localStorage`) est **uniquement pour la démo**.
Avant toute mise en production avec de vrais utilisateurs :

1. Créer un projet sur [console.firebase.google.com](https://console.firebase.google.com)
2. Activer **Authentication** (méthode Email/Mot de passe)
3. Activer **Firestore Database** et configurer les règles de sécurité
   (voir `docs/data-model.md` pour le schéma et les règles d'accès attendues)
4. Remplacer le contenu de `src/js/services/auth-service.js` par les appels
   Firebase correspondants (les emplacements sont indiqués par des
   commentaires `// FIREBASE:` dans le fichier) — la signature des fonctions
   ne change pas, donc aucune autre partie du code n'a besoin d'être modifiée
5. Ajouter la configuration Firebase du projet (clés publiques) dans un
   fichier `src/js/firebase-config.js` (ces clés sont publiques par design
   côté client ; la sécurité réelle vient des règles Firestore, pas du secret
   de ces clés)

## Points de vigilance sécurité avant mise en production

- Configurer les règles Firestore pour qu'un candidat ne puisse lire/écrire
  que ses propres données (voir `data-model.md`)
- Activer la limitation de tentatives de connexion côté Firebase Authentication
- Mettre en place des sauvegardes automatiques Firestore
- Ajouter les mentions légales, CGU/CGV et politique de confidentialité
  (Phase 5) avant toute commercialisation
