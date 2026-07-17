# Modèle de données — OnejeysirEdu237

Ce document décrit le schéma cible pour la base de données (pensé pour Firestore,
mais transposable à toute base NoSQL/relationnelle équivalente). En Phase 1, ces
données sont simulées en `localStorage` — ce schéma sert de contrat pour les
phases suivantes.

## Collections principales

### `users`
| Champ | Type | Description |
|---|---|---|
| id | string | UID généré par le fournisseur d'auth |
| fullName | string | Nom complet |
| email | string | Email (unique) |
| role | 'candidat' \| 'admin' | Détermine l'accès au back-office (Phase 4) |
| concours | 'iut' \| 'polytechnique' | Concours principal préparé |
| createdAt | timestamp | Date de création du compte |
| lastLoginAt | timestamp | Dernière connexion (journalisation) |

### `concours`
| Champ | Type | Description |
|---|---|---|
| id | string | ex: `iut`, `polytechnique` |
| nom | string | Nom affiché |
| filieres | array\<string\> | Filières optionnelles (OGA, Génie Informatique…) |

### `matieres`
| Champ | Type | Description |
|---|---|---|
| id | string | |
| concoursId | string | Référence vers `concours` |
| nom | string | |
| ordre | number | Ordre d'affichage |

### `chapitres`
| Champ | Type | Description |
|---|---|---|
| id | string | |
| matiereId | string | |
| titre | string | |
| sousChapitres | array\<{titre, contenuMarkdown, formules, exemples}\> | |
| ressources | array\<{type: 'pdf'\|'video'\|'image', url}\> | Les vidéos sont des liens externes (YouTube/Vimeo), jamais des fichiers hébergés |

### `exercices`
| Champ | Type | Description |
|---|---|---|
| id | string | |
| chapitreId | string | |
| type | 'qcm' \| 'vrai_faux' \| 'calcul' | |
| difficulte | 'facile' \| 'moyen' \| 'difficile' | |
| enonce | string | |
| options | array\<string\> (si QCM) | |
| bonneReponse | string \| number | |
| correctionDetaillee | string | |

### `sujetsExamens`
| Champ | Type | Description |
|---|---|---|
| id | string | |
| concoursId | string | |
| annee | number | |
| matiereId | string | |
| dureeMinutes | number | |
| questions | array\<exerciceId\> | |
| pdfUrl | string | |

### `resultatsExamens`
| Champ | Type | Description |
|---|---|---|
| id | string | |
| userId | string | |
| sujetId | string | |
| score | number | |
| dureeUtilisee | number | secondes |
| reponses | array\<{questionId, reponseDonnee, correcte}\> | |
| date | timestamp | |

### `progression`
| Champ | Type | Description |
|---|---|---|
| userId | string | |
| matiereId | string | |
| pourcentage | number | |
| heuresRevision | number | |
| derniereActivite | timestamp | |

## Règles d'accès (aperçu, à détailler en Phase 4 dans `firestore.rules`)
- Un candidat ne peut lire/écrire que ses propres `resultatsExamens` et `progression`.
- Seul un utilisateur avec `role: admin` peut écrire dans `matieres`, `chapitres`, `exercices`, `sujetsExamens`.
- Les collections de contenu pédagogique sont en lecture publique pour tout utilisateur authentifié.
