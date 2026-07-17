/**
 * auth-service.js
 * ----------------------------------------------------------------------
 * Couche d'abstraction pour l'authentification.
 *
 * IMPORTANT : cette implémentation utilise localStorage comme backend
 * de démonstration pour la Phase 1 (aucune donnée n'est envoyée à un
 * serveur, tout reste dans le navigateur de l'utilisateur).
 *
 * Pour la mise en production, remplacer le corps de chaque méthode par
 * les appels Firebase Authentication équivalents (voir commentaires
 * "// FIREBASE:" à chaque méthode) sans changer la signature des
 * fonctions exposées — le reste de l'application n'a pas à être modifié.
 * ----------------------------------------------------------------------
 */

const STORAGE_KEYS = {
  USERS: 'onejeysiredu237_users',
  SESSION: 'onejeysiredu237_session',
};

function readUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
}

function writeUsers(users) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

// Hash très simple côté client — UNIQUEMENT pour la démo locale.
// En production, ne jamais gérer le hachage de mot de passe côté client :
// Firebase Authentication (ou tout backend réel) s'en charge de façon sécurisée.
async function demoHash(text) {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const AuthService = {
  /**
   * Crée un compte candidat.
   * FIREBASE: createUserWithEmailAndPassword(auth, email, password)
   */
  async register({ fullName, email, password, concours }) {
    const users = readUsers();
    if (users.some((u) => u.email === email)) {
      throw new Error('Un compte existe déjà avec cet email.');
    }
    const passwordHash = await demoHash(password);
    const user = {
      id: crypto.randomUUID(),
      fullName,
      email,
      concours: concours || null,
      passwordHash,
      createdAt: new Date().toISOString(),
      failedAttempts: 0,
      lockedUntil: null,
    };
    users.push(user);
    writeUsers(users);
    this._setSession(user);
    return this._publicUser(user);
  },

  /**
   * Connecte un candidat existant.
   * FIREBASE: signInWithEmailAndPassword(auth, email, password)
   */
  async login({ email, password }) {
    const users = readUsers();
    const user = users.find((u) => u.email === email);
    if (!user) throw new Error('Email ou mot de passe incorrect.');

    if (user.lockedUntil && Date.now() < user.lockedUntil) {
      const mins = Math.ceil((user.lockedUntil - Date.now()) / 60000);
      throw new Error(`Trop de tentatives. Réessaie dans ${mins} min.`);
    }

    const passwordHash = await demoHash(password);
    if (passwordHash !== user.passwordHash) {
      user.failedAttempts = (user.failedAttempts || 0) + 1;
      // Limitation des tentatives de connexion (protection brute-force)
      if (user.failedAttempts >= 5) {
        user.lockedUntil = Date.now() + 15 * 60 * 1000; // 15 min
        user.failedAttempts = 0;
      }
      writeUsers(users);
      throw new Error('Email ou mot de passe incorrect.');
    }

    user.failedAttempts = 0;
    user.lockedUntil = null;
    writeUsers(users);
    this._setSession(user);
    return this._publicUser(user);
  },

  /**
   * Déconnecte l'utilisateur courant.
   * FIREBASE: signOut(auth)
   */
  logout() {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  /**
   * Envoie un lien / code de récupération de mot de passe.
   * FIREBASE: sendPasswordResetEmail(auth, email)
   * Démo : simule l'envoi sans révéler si l'email existe (bonne pratique sécurité).
   */
  async requestPasswordReset(email) {
    await new Promise((r) => setTimeout(r, 600));
    return { sent: true, email };
  },

  /**
   * Retourne l'utilisateur connecté (session locale) ou null.
   * FIREBASE: onAuthStateChanged(auth, callback)
   */
  getCurrentUser() {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
    return raw ? JSON.parse(raw) : null;
  },

  requireAuth(redirectTo = 'login.html') {
    const user = this.getCurrentUser();
    if (!user) {
      window.location.href = redirectTo;
    }
    return user;
  },

  _setSession(user) {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(this._publicUser(user)));
  },

  _publicUser(user) {
    // Ne jamais exposer le hash de mot de passe au reste de l'app.
    const { passwordHash, failedAttempts, lockedUntil, ...publicUser } = user;
    return publicUser;
  },
};
