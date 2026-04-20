# 🚀 LiMobile - Guide EAS Build (Cloud)

## 📋 Vue d'ensemble

EAS Build est un service cloud **gratuit** qui génère des APK Android sans avoir besoin d'installer Android SDK localement.

**Avantages:**
- ✅ Pas d'Android SDK à installer
- ✅ Build dans le cloud (5-10 min)
- ✅ Gratuit pour les projets open-source
- ✅ Facile et rapide

---

## 🔑 Étape 1: Créer un Compte EAS

### Option A: Créer un compte (Recommandé)

1. **Visite:** https://expo.dev/signup
2. **Remplis le formulaire:**
   - Email
   - Mot de passe
   - Nom d'utilisateur
3. **Valide ton email**
4. **Connecte-toi**

### Option B: Utiliser GitHub
1. **Visite:** https://expo.dev/signup
2. **Clique:** "Sign up with GitHub"
3. **Autorise Expo**
4. **C'est fait !**

---

## 💻 Étape 2: Installation Locale

### Prérequis
- ✅ Node.js 18+ installé
- ✅ Git installé
- ✅ Compte EAS créé

### Installation

```bash
# 1. Installe EAS CLI globalement
npm install -g eas-cli

# 2. Vérifie l'installation
eas --version
# Doit afficher: eas-cli/x.x.x
```

---

## 🔧 Étape 3: Configurer le Projet

### Clone le repo
```bash
git clone https://github.com/medo227-collab/limobile-app.git
cd limobile-app
```

### Installe les dépendances
```bash
npm install
# ou
pnpm install
```

### Crée un fichier `eas.json`

```bash
eas build --platform android --local
```

Cela créera un fichier `eas.json` automatiquement.

**Ou crée-le manuellement:**

```json
{
  "build": {
    "development": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

---

## 🚀 Étape 4: Lancer le Build

### Première connexion

```bash
eas login
```

**Cela ouvrira un navigateur pour:**
1. Te connecter à ton compte EAS
2. Autoriser EAS CLI
3. Retourner au terminal

### Build APK

```bash
# Build en mode développement (plus rapide)
eas build --platform android --profile development

# Ou build en mode production
eas build --platform android --profile production
```

### Suivi du Build

Le terminal affichera:
```
✔ Uploaded project to EAS
✔ Build started
✔ Build in progress...
✔ Build complete!
```

**Durée:** 5-10 minutes

---

## 📥 Étape 5: Télécharger l'APK

### Option A: Depuis le Terminal

```bash
# Après le build, tu verras:
# ✔ Build finished!
# 📱 APK URL: https://...

# Copie l'URL et télécharge
```

### Option B: Depuis le Dashboard

1. **Visite:** https://expo.dev/builds
2. **Connecte-toi** avec ton compte EAS
3. **Localise le build LiMobile**
4. **Clique** sur le lien de téléchargement
5. **Télécharge l'APK**

### Option C: Téléchargement Automatique

```bash
# Télécharge directement après le build
eas build --platform android --profile production --auto-submit
```

---

## 📱 Étape 6: Installer sur Téléphone

### Via ADB
```bash
adb install -r app-debug.apk
```

### Manuelle
1. Transfère l'APK sur ton téléphone
2. Ouvre le gestionnaire de fichiers
3. Localise le fichier APK
4. Appuie dessus
5. Clique "Installer"

---

## 🔍 Dépannage

### Erreur: "Not authenticated"
```bash
# Reconnecte-toi
eas logout
eas login
```

### Erreur: "Project not found"
```bash
# Initialise le projet EAS
eas init

# Puis relance le build
eas build --platform android
```

### Build échoué
1. Vérifie les logs: `eas build --platform android --logs`
2. Consulte: https://docs.expo.dev/build/troubleshooting/
3. Ouvre une issue GitHub

### Lent ou timeout
- Première build: 10-15 min (normal)
- Builds suivantes: 5-10 min
- Attends patiemment ⏳

---

## 📊 Commandes Utiles

```bash
# Voir l'état des builds
eas build --status

# Voir les logs d'un build
eas build --platform android --logs

# Lister les builds
eas build:list

# Configurer le projet
eas init

# Se déconnecter
eas logout
```

---

## 🎯 Résumé Rapide

```bash
# 1. Installe EAS CLI
npm install -g eas-cli

# 2. Clone le repo
git clone https://github.com/medo227-collab/limobile-app.git
cd limobile-app

# 3. Installe les dépendances
npm install

# 4. Se connecte
eas login

# 5. Lance le build
eas build --platform android --profile production

# 6. Attends 5-10 minutes
# 7. Télécharge l'APK
# 8. Installe sur téléphone
```

---

## 💡 Tips & Tricks

### Accélérer les builds
```bash
# Cache les dépendances
npm ci  # au lieu de npm install
```

### Builds multiples
```bash
# Build pour développement et production
eas build --platform android --profile development
eas build --platform android --profile production
```

### Automatiser les builds
```bash
# Avec GitHub Actions (optionnel)
# Voir: https://docs.expo.dev/build/github-actions/
```

---

## 📚 Ressources

- **EAS Docs:** https://docs.expo.dev/build/
- **EAS Dashboard:** https://expo.dev/builds
- **Troubleshooting:** https://docs.expo.dev/build/troubleshooting/
- **GitHub:** https://github.com/medo227-collab/limobile-app

---

## ✅ Checklist

- [ ] Compte EAS créé
- [ ] EAS CLI installé
- [ ] Repo cloné
- [ ] Dépendances installées
- [ ] `eas login` exécuté
- [ ] Build lancé
- [ ] APK téléchargé
- [ ] Installé sur téléphone
- [ ] Tests effectués

---

**Bonne chance ! 🚀**

L'APK sera généré dans le cloud en quelques minutes ! ☁️
