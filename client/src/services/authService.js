const USERS_KEY = "memona_users";
const SESSION_KEY = "memona_session";

const getUsers = () => {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const setSession = (user) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

const stripPassword = (user) => {
  const { password, ...safe } = user;
  return safe;
};

const normalizeEmail = (value = "") => value.trim().toLowerCase();

const ensureGoogleUser = () => {
  const users = getUsers();
  const existing = users.find((u) => normalizeEmail(u.email) === "demo@memona.app");
  if (existing) return existing;

  const newUser = {
    id: `user_${Date.now()}`,
    name: "Google User",
    email: "demo@memona.app",
    password: "demo123",
    accountType: "Personal",
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const authService = {
  login: async ({ email, password }) => {
    const normalizedEmail = normalizeEmail(email);
    const normalizedPassword = String(password || "");

    if (!normalizedEmail || !normalizedPassword) {
      throw new Error("Email and password are required");
    }

    const users = getUsers();
    const user = users.find(
      (u) => normalizeEmail(u.email) === normalizedEmail && String(u.password || "") === normalizedPassword
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const safeUser = stripPassword(user);
    setSession(safeUser);
    return safeUser;
  },

  signup: async ({ name, email, password, accountType = "Personal" }) => {
    const normalizedEmail = normalizeEmail(email);
    const safeName = String(name || "").trim();
    const safePassword = String(password || "");

    if (!safeName || !normalizedEmail || !safePassword) {
      throw new Error("Name, email and password are required");
    }

    const users = getUsers();
    const exists = users.some((u) => normalizeEmail(u.email) === normalizedEmail);

    if (exists) {
      throw new Error("Account already exists for this email");
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name: safeName,
      email: normalizedEmail,
      password: safePassword,
      accountType,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    const safeUser = stripPassword(newUser);
    setSession(safeUser);
    return safeUser;
  },

  loginWithGoogle: async () => {
    const googleUser = ensureGoogleUser();
    const safeUser = stripPassword(googleUser);
    setSession(safeUser);
    return safeUser;
  },

  logout: async () => {
    localStorage.removeItem(SESSION_KEY);
    return true;
  },

  getCurrentUser: async () => {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
};

