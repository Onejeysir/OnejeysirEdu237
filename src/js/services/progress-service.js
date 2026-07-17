/**
 * progress-service.js
 * ----------------------------------------------------------------------
 * Suivi de la progression réelle du candidat, à partir des exercices
 * effectivement complétés (Phase 2). Remplace les données 100% factices
 * du dashboard de la Phase 1 pour les matières qui ont du contenu.
 *
 * Stockage : localStorage, par utilisateur. FIREBASE : à remplacer par
 * des écritures dans la collection `resultatsExamens` / `progression`
 * décrite dans docs/data-model.md, avec la même signature de fonctions.
 * ----------------------------------------------------------------------
 */

import { matieres } from '../data/content.js';

const KEY_PREFIX = 'onejeysiredu237_progress_';

function keyFor(userId) {
  return `${KEY_PREFIX}${userId}`;
}

function readAll(userId) {
  return JSON.parse(localStorage.getItem(keyFor(userId)) || '{}');
}

function writeAll(userId, data) {
  localStorage.setItem(keyFor(userId), JSON.stringify(data));
}

export const ProgressService = {
  /**
   * Enregistre le résultat d'une session d'exercices pour un chapitre.
   * FIREBASE: setDoc(doc(db, 'progression', `${userId}_${chapitreId}`), {...})
   */
  recordChapterResult(userId, matiereId, chapitreId, score, total) {
    const data = readAll(userId);
    if (!data[matiereId]) data[matiereId] = {};
    data[matiereId][chapitreId] = {
      score,
      total,
      pourcentage: total > 0 ? Math.round((score / total) * 100) : 0,
      date: new Date().toISOString(),
    };
    writeAll(userId, data);
  },

  /**
   * Historique brut d'un utilisateur (utilisé pour l'activité récente).
   */
  getHistory(userId) {
    const data = readAll(userId);
    const events = [];
    Object.entries(data).forEach(([matiereId, chapitres]) => {
      const matiere = matieres.find((m) => m.id === matiereId);
      Object.entries(chapitres).forEach(([chapitreId, res]) => {
        const chapitre = matiere?.chapitres.find((c) => c.id === chapitreId);
        events.push({
          texte: `Exercices « ${chapitre?.titre || chapitreId} » — ${res.score}/${res.total}`,
          date: res.date,
          type: res.pourcentage >= 60 ? 'success' : 'gold',
        });
      });
    });
    return events.sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  /**
   * Progression (%) d'une matière = moyenne des scores des chapitres
   * complétés parmi les chapitres actuellement disponibles.
   * Un chapitre non tenté compte pour 0.
   */
  getMatiereProgress(userId, matiereId) {
    const matiere = matieres.find((m) => m.id === matiereId);
    if (!matiere || matiere.chapitres.filter((c) => c.statut === 'disponible').length === 0) return null;
    const data = readAll(userId)[matiereId] || {};
    const disponibles = matiere.chapitres.filter((c) => c.statut === 'disponible');
    const total = disponibles.reduce((sum, c) => sum + (data[c.id]?.pourcentage || 0), 0);
    return Math.round(total / disponibles.length);
  },

  /**
   * Progression globale = moyenne des progressions de toutes les
   * matières qui ont du contenu disponible.
   */
  getGlobalProgress(userId) {
    const withContent = matieres.filter((m) => m.chapitres.some((c) => c.statut === 'disponible'));
    if (withContent.length === 0) return 0;
    const total = withContent.reduce((sum, m) => sum + (this.getMatiereProgress(userId, m.id) || 0), 0);
    return Math.round(total / withContent.length);
  },

  isChapterCompleted(userId, matiereId, chapitreId) {
    const data = readAll(userId);
    return Boolean(data[matiereId]?.[chapitreId]);
  },

  getChapterResult(userId, matiereId, chapitreId) {
    const data = readAll(userId);
    return data[matiereId]?.[chapitreId] || null;
  },

  countCompletedExams(userId) {
    const data = readAll(userId);
    let count = 0;
    Object.values(data).forEach((chapitres) => { count += Object.keys(chapitres).length; });
    return count;
  },

  getScoreMoyen(userId) {
    const data = readAll(userId);
    let sum = 0, n = 0;
    Object.values(data).forEach((chapitres) => {
      Object.values(chapitres).forEach((r) => { sum += (r.pourcentage / 100) * 20; n += 1; });
    });
    return n > 0 ? Math.round((sum / n) * 10) / 10 : 0;
  },
};
