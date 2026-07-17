/**
 * content.js
 * ----------------------------------------------------------------------
 * Contenu pédagogique de démonstration (Phase 2).
 * Quelques matières sont entièrement développées (2-3 chapitres réels)
 * pour valider le moteur de cours/exercices ; les autres sont présentes
 * avec une structure vide ("à venir") à remplir en Phase 4 via le futur
 * back-office administrateur.
 * ----------------------------------------------------------------------
 */

export const concoursList = [
  { id: 'iut', nom: 'IUT de Douala' },
  { id: 'polytechnique', nom: 'Polytechnique Douala' },
];

export const matieres = [
  // ------------------------------------------------------------ IUT --
  {
    id: 'iut-maths',
    concoursId: 'iut',
    nom: 'Mathématiques',
    icon: '📐',
    chapitres: [
      {
        id: 'iut-maths-fonctions',
        titre: 'Fonctions numériques et dérivées',
        statut: 'disponible',
        duree: '20 min',
        lecon: {
          definitions: [
            "Une fonction f associe à chaque nombre x d'un ensemble de départ un unique nombre f(x).",
            "Le nombre dérivé de f en x₀ mesure la pente de la tangente à la courbe de f au point d'abscisse x₀.",
          ],
          formules: [
            "(xⁿ)' = n·xⁿ⁻¹",
            "(u + v)' = u' + v'",
            "(u × v)' = u'v + uv'",
            "(u/v)' = (u'v − uv') / v²  (avec v ≠ 0)",
          ],
          exemples: [
            "Pour f(x) = x³ − 4x + 1, on a f'(x) = 3x² − 4.",
            "Pour f(x) = (2x+1)(x−3), on développe ou on utilise la règle du produit : f'(x) = 2(x−3) + (2x+1) = 4x − 5.",
          ],
          piegesFrequents: [
            "Oublier que la dérivée d'une constante est 0.",
            "Confondre f(x) et f'(x) lors de l'étude du signe pour les variations.",
          ],
        },
        exercices: [
          {
            id: 'ex1', type: 'qcm', difficulte: 'facile',
            enonce: "Quelle est la dérivée de f(x) = 5x² − 3x + 7 ?",
            options: ["f'(x) = 10x − 3", "f'(x) = 5x − 3", "f'(x) = 10x + 7", "f'(x) = 2x − 3"],
            bonneReponse: 0,
            correction: "On dérive terme à terme : (5x²)' = 10x, (−3x)' = −3, (7)' = 0. Donc f'(x) = 10x − 3.",
          },
          {
            id: 'ex2', type: 'qcm', difficulte: 'moyen',
            enonce: "Soit f(x) = (x−2)(x+4). Quelle est f'(x) ?",
            options: ["f'(x) = 2x + 2", "f'(x) = x + 2", "f'(x) = 2x − 2", "f'(x) = 2x + 4"],
            bonneReponse: 0,
            correction: "f(x) = x² + 2x − 8 après développement, donc f'(x) = 2x + 2.",
          },
          {
            id: 'ex3', type: 'vrai_faux', difficulte: 'facile',
            enonce: "La dérivée d'une fonction constante est toujours égale à 1.",
            bonneReponse: false,
            correction: "Faux. La dérivée d'une constante est 0, pas 1, car son taux de variation est nul.",
          },
        ],
      },
      {
        id: 'iut-maths-suites',
        titre: 'Suites numériques',
        statut: 'disponible',
        duree: '18 min',
        lecon: {
          definitions: [
            "Une suite arithmétique vérifie uₙ₊₁ = uₙ + r, où r est la raison.",
            "Une suite géométrique vérifie uₙ₊₁ = uₙ × q, où q est la raison.",
          ],
          formules: [
            "Terme général arithmétique : uₙ = u₀ + n·r",
            "Terme général géométrique : uₙ = u₀ × qⁿ",
            "Somme arithmétique : S = n × (u₀ + uₙ₋₁) / 2",
          ],
          exemples: [
            "Si u₀ = 3 et r = 5, alors u₁₀ = 3 + 10×5 = 53.",
            "Si u₀ = 2 et q = 3, alors u₄ = 2 × 3⁴ = 162.",
          ],
          piegesFrequents: [
            "Confondre le rang de départ (u₀ ou u₁) dans la formule du terme général.",
            "Appliquer la formule arithmétique à une suite géométrique et inversement.",
          ],
        },
        exercices: [
          {
            id: 'ex1', type: 'qcm', difficulte: 'facile',
            enonce: "Une suite arithmétique a pour premier terme u₀ = 4 et raison r = 3. Que vaut u₅ ?",
            options: ["19", "15", "17", "22"],
            bonneReponse: 0,
            correction: "u₅ = u₀ + 5×r = 4 + 5×3 = 19.",
          },
          {
            id: 'ex2', type: 'vrai_faux', difficulte: 'moyen',
            enonce: "Dans une suite géométrique de raison q = 1, tous les termes sont égaux.",
            bonneReponse: true,
            correction: "Vrai. Si q = 1, alors uₙ₊₁ = uₙ pour tout n, la suite est donc constante.",
          },
        ],
      },
      {
        id: 'iut-maths-stats',
        titre: 'Statistiques descriptives',
        statut: 'disponible',
        duree: '15 min',
        lecon: {
          definitions: [
            "La moyenne d'une série est la somme des valeurs divisée par leur effectif total.",
            "La médiane est la valeur qui partage la série ordonnée en deux effectifs égaux.",
          ],
          formules: [
            "Moyenne : x̄ = (Σ xᵢ×nᵢ) / N",
            "Écart-type : σ = √(variance)",
          ],
          exemples: [
            "Pour les notes 8, 12, 14, 10, la moyenne est (8+12+14+10)/4 = 11.",
          ],
          piegesFrequents: [
            "Oublier de pondérer par les effectifs (nᵢ) quand la série est groupée en classes.",
            "Confondre médiane et moyenne : elles ne sont égales que pour des séries symétriques.",
          ],
        },
        exercices: [
          {
            id: 'ex1', type: 'qcm', difficulte: 'facile',
            enonce: "Quelle est la moyenne de la série : 6, 9, 12, 13 ?",
            options: ["10", "10.5", "11", "9.5"],
            bonneReponse: 0,
            correction: "(6+9+12+13)/4 = 40/4 = 10.",
          },
        ],
      },
    ],
  },
  {
    id: 'iut-francais',
    concoursId: 'iut',
    nom: 'Français',
    icon: '📖',
    chapitres: [],
  },
  {
    id: 'iut-anglais',
    concoursId: 'iut',
    nom: 'Anglais',
    icon: '🗣️',
    chapitres: [],
  },
  {
    id: 'iut-culture',
    concoursId: 'iut',
    nom: 'Culture Générale',
    icon: '🌍',
    chapitres: [
      {
        id: 'iut-culture-institutions',
        titre: 'Le Cameroun : institutions et repères',
        statut: 'disponible',
        duree: '12 min',
        lecon: {
          definitions: [
            "Le Cameroun est une république dotée d'un régime semi-présidentiel.",
            "Le pays compte 10 régions administratives.",
          ],
          formules: [],
          exemples: [
            "Savoir situer les grandes villes (Yaoundé, capitale politique ; Douala, capitale économique) est un classique des questions de culture générale.",
          ],
          piegesFrequents: [
            "Confondre capitale politique (Yaoundé) et capitale économique (Douala).",
          ],
        },
        exercices: [
          {
            id: 'ex1', type: 'qcm', difficulte: 'facile',
            enonce: "Quelle ville est la capitale politique du Cameroun ?",
            options: ["Yaoundé", "Douala", "Garoua", "Bafoussam"],
            bonneReponse: 0,
            correction: "Yaoundé est la capitale politique ; Douala est la capitale économique.",
          },
          {
            id: 'ex2', type: 'vrai_faux', difficulte: 'facile',
            enonce: "Le Cameroun compte 10 régions administratives.",
            bonneReponse: true,
            correction: "Vrai, le pays est découpé en 10 régions.",
          },
        ],
      },
      {
        id: 'iut-culture-actualite',
        titre: 'Méthode : traiter une question d\u2019actualité',
        statut: 'disponible',
        duree: '10 min',
        lecon: {
          definitions: [
            "Une question de culture générale attend souvent une réponse structurée : contexte, enjeux, avis argumenté.",
          ],
          formules: [],
          exemples: [
            "Structurer sa réponse en 3 temps (constat, causes, conséquences) évite le hors-sujet.",
          ],
          piegesFrequents: [
            "Répondre par une opinion sans argument factuel.",
          ],
        },
        exercices: [
          {
            id: 'ex1', type: 'vrai_faux', difficulte: 'moyen',
            enonce: "Il est recommandé de structurer sa réponse plutôt que de lister des idées en vrac.",
            bonneReponse: true,
            correction: "Vrai, une réponse structurée est toujours mieux notée qu'une liste d'idées désordonnées.",
          },
        ],
      },
    ],
  },
  {
    id: 'iut-logique',
    concoursId: 'iut',
    nom: 'Logique',
    icon: '🧩',
    chapitres: [
      {
        id: 'iut-logique-syllogismes',
        titre: 'Raisonnement logique et syllogismes',
        statut: 'disponible',
        duree: '15 min',
        lecon: {
          definitions: [
            "Un syllogisme est un raisonnement à deux prémisses qui mène à une conclusion nécessairement vraie si les prémisses le sont.",
          ],
          formules: [],
          exemples: [
            "Prémisse 1 : Tous les A sont B. Prémisse 2 : Tous les B sont C. Conclusion valide : Tous les A sont C.",
          ],
          piegesFrequents: [
            "Confondre 'certains' et 'tous' change complètement la validité du raisonnement.",
          ],
        },
        exercices: [
          {
            id: 'ex1', type: 'qcm', difficulte: 'moyen',
            enonce: "Tous les étudiants de l'IUT révisent. Awa révise. Peut-on conclure qu'Awa est étudiante à l'IUT ?",
            options: [
              "Non, ce raisonnement est invalide",
              "Oui, c'est certain",
              "Oui, mais seulement si Awa est une fille",
              "On ne peut jamais savoir",
            ],
            bonneReponse: 0,
            correction: "Non : le fait que tous les étudiants révisent ne signifie pas que seuls eux révisent. D'autres personnes peuvent aussi réviser.",
          },
        ],
      },
      {
        id: 'iut-logique-suites',
        titre: 'Suites logiques et séries de figures',
        statut: 'disponible',
        duree: '12 min',
        lecon: {
          definitions: [
            "Une suite logique de nombres ou de figures suit une règle cachée qu'il faut identifier avant de continuer la série.",
          ],
          formules: [],
          exemples: [
            "2, 4, 8, 16, ... : chaque terme est multiplié par 2. Le suivant est 32.",
          ],
          piegesFrequents: [
            "Chercher une règle additive alors que la règle est multiplicative (ou inversement).",
          ],
        },
        exercices: [
          {
            id: 'ex1', type: 'qcm', difficulte: 'facile',
            enonce: "Quelle est la suite logique de la série : 3, 6, 12, 24, … ?",
            options: ["48", "36", "30", "27"],
            bonneReponse: 0,
            correction: "Chaque terme est multiplié par 2 : 24 × 2 = 48.",
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------ POLYTECHNIQUE --
  {
    id: 'poly-maths',
    concoursId: 'polytechnique',
    nom: 'Mathématiques',
    icon: '📐',
    chapitres: [
      {
        id: 'poly-maths-complexes',
        titre: 'Nombres complexes',
        statut: 'disponible',
        duree: '20 min',
        lecon: {
          definitions: [
            "Un nombre complexe s'écrit z = a + ib, où a est la partie réelle, b la partie imaginaire et i² = −1.",
            "Le module de z est |z| = √(a² + b²).",
          ],
          formules: [
            "(a+ib)(c+id) = (ac − bd) + i(ad + bc)",
            "Conjugué : z̄ = a − ib, et z × z̄ = a² + b²",
          ],
          exemples: [
            "Pour z = 3 + 4i, |z| = √(9+16) = √25 = 5.",
          ],
          piegesFrequents: [
            "Oublier que i² = −1 lors d'un développement.",
          ],
        },
        exercices: [
          {
            id: 'ex1', type: 'qcm', difficulte: 'moyen',
            enonce: "Quel est le module de z = 6 + 8i ?",
            options: ["10", "14", "48", "100"],
            bonneReponse: 0,
            correction: "|z| = √(6²+8²) = √(36+64) = √100 = 10.",
          },
          {
            id: 'ex2', type: 'vrai_faux', difficulte: 'facile',
            enonce: "i² est égal à −1.",
            bonneReponse: true,
            correction: "Vrai, c'est la définition même du nombre imaginaire i.",
          },
        ],
      },
      {
        id: 'poly-maths-derivees',
        titre: 'Dérivées et étude de fonctions',
        statut: 'disponible',
        duree: '18 min',
        lecon: {
          definitions: [
            "Étudier une fonction consiste à déterminer son domaine, ses variations et ses limites aux bornes.",
          ],
          formules: [
            "f est croissante sur I si f'(x) ≥ 0 sur I.",
            "f est décroissante sur I si f'(x) ≤ 0 sur I.",
          ],
          exemples: [
            "Pour f(x) = x² − 4x, f'(x) = 2x − 4, qui s'annule en x = 2 : f décroît avant 2, croît après.",
          ],
          piegesFrequents: [
            "Oublier d'étudier le signe de f' avant de conclure sur les variations.",
          ],
        },
        exercices: [
          {
            id: 'ex1', type: 'qcm', difficulte: 'moyen',
            enonce: "Pour f(x) = x² − 4x, en quelle valeur de x la dérivée s'annule-t-elle ?",
            options: ["x = 2", "x = 4", "x = 0", "x = −2"],
            bonneReponse: 0,
            correction: "f'(x) = 2x − 4 = 0 ⟹ x = 2.",
          },
        ],
      },
    ],
  },
  {
    id: 'poly-physique',
    concoursId: 'polytechnique',
    nom: 'Physique',
    icon: '⚛️',
    chapitres: [
      {
        id: 'poly-physique-cinematique',
        titre: 'Mécanique du point : cinématique',
        statut: 'disponible',
        duree: '20 min',
        lecon: {
          definitions: [
            "La vitesse moyenne est la distance parcourue divisée par la durée du trajet.",
            "L'accélération mesure la variation de vitesse par unité de temps.",
          ],
          formules: [
            "v = d / t",
            "a = Δv / Δt",
            "d = v₀·t + ½·a·t²  (mouvement uniformément accéléré, position initiale nulle)",
          ],
          exemples: [
            "Un mobile parcourt 150 m en 10 s : v = 150/10 = 15 m/s.",
          ],
          piegesFrequents: [
            "Oublier de convertir les unités (km/h vers m/s) avant de calculer.",
          ],
        },
        exercices: [
          {
            id: 'ex1', type: 'qcm', difficulte: 'facile',
            enonce: "Un véhicule parcourt 200 m en 20 s à vitesse constante. Quelle est sa vitesse ?",
            options: ["10 m/s", "20 m/s", "5 m/s", "100 m/s"],
            bonneReponse: 0,
            correction: "v = d/t = 200/20 = 10 m/s.",
          },
        ],
      },
      {
        id: 'poly-physique-electricite',
        titre: 'Électricité : circuits en courant continu',
        statut: 'disponible',
        duree: '18 min',
        lecon: {
          definitions: [
            "La loi d'Ohm relie tension, intensité et résistance : U = R × I.",
          ],
          formules: [
            "U = R × I",
            "P = U × I  (puissance électrique)",
            "En série : Réq = R₁ + R₂ + …  ; en parallèle : 1/Réq = 1/R₁ + 1/R₂ + …",
          ],
          exemples: [
            "Pour R = 10 Ω et I = 2 A, U = 10 × 2 = 20 V.",
          ],
          piegesFrequents: [
            "Confondre la formule de résistance équivalente en série et en parallèle.",
          ],
        },
        exercices: [
          {
            id: 'ex1', type: 'qcm', difficulte: 'moyen',
            enonce: "Une résistance de 5 Ω est traversée par un courant de 3 A. Quelle est la tension à ses bornes ?",
            options: ["15 V", "8 V", "1.67 V", "5 V"],
            bonneReponse: 0,
            correction: "U = R × I = 5 × 3 = 15 V.",
          },
          {
            id: 'ex2', type: 'vrai_faux', difficulte: 'moyen',
            enonce: "En série, la résistance équivalente est toujours supérieure à chacune des résistances individuelles.",
            bonneReponse: true,
            correction: "Vrai : Réq = R₁ + R₂ + … est nécessairement plus grande que chaque résistance prise seule.",
          },
        ],
      },
      {
        id: 'poly-physique-optique',
        titre: 'Optique géométrique',
        statut: 'disponible',
        duree: '15 min',
        lecon: {
          definitions: [
            "Une lentille convergente fait converger les rayons lumineux parallèles vers un point appelé foyer.",
          ],
          formules: [
            "Relation de conjugaison : 1/OA' − 1/OA = 1/f'",
          ],
          exemples: [
            "Une loupe est une lentille convergente utilisée pour grossir un objet proche.",
          ],
          piegesFrequents: [
            "Confondre lentille convergente et divergente dans le sens de la déviation des rayons.",
          ],
        },
        exercices: [
          {
            id: 'ex1', type: 'vrai_faux', difficulte: 'facile',
            enonce: "Une lentille convergente fait converger les rayons lumineux parallèles vers un foyer.",
            bonneReponse: true,
            correction: "Vrai, c'est la définition même d'une lentille convergente.",
          },
        ],
      },
    ],
  },
  {
    id: 'poly-chimie',
    concoursId: 'polytechnique',
    nom: 'Chimie',
    icon: '🧪',
    chapitres: [],
  },
  {
    id: 'poly-culture',
    concoursId: 'polytechnique',
    nom: 'Culture Générale',
    icon: '🌍',
    chapitres: [],
  },
];

export function getMatiere(id) {
  return matieres.find((m) => m.id === id) || null;
}

export function getChapitre(matiereId, chapitreId) {
  const matiere = getMatiere(matiereId);
  if (!matiere) return null;
  return matiere.chapitres.find((c) => c.id === chapitreId) || null;
}

export function getMatieresByConcours(concoursId) {
  return matieres.filter((m) => m.concoursId === concoursId);
}
