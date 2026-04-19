# 📱 LiMobile - Application Mobile Android

## 🎯 Vue d'ensemble

LiMobile est une application mobile de gestion de mobile money, permettant aux utilisateurs de:
- 💳 Gérer plusieurs comptes opérateurs (Airtel, Moov, Zamani)
- 📞 Acheter des forfaits appel et internet
- 💸 Transférer du crédit
- 📊 Consulter l'historique des transactions

## 🏗️ Architecture

```
limobile-app/
├── src/                          # Code React
│   ├── App.jsx                   # Composant principal
│   ├── capacitor-config.js       # Configuration Capacitor
│   ├── components/               # Composants UI
│   └── assets/                   # Images et ressources
├── android/                      # Projet Android natif
│   ├── app/                      # Application Android
│   ├── build.gradle              # Configuration Gradle
│   └── gradlew                   # Gradle wrapper
├── capacitor.config.json         # Configuration Capacitor
├── package.json                  # Dépendances npm
├── vite.config.js                # Configuration Vite
└── build-apk.sh                  # Script de build APK
```

## 🛠️ Stack Technologique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| **Frontend** | React | 19.1.0 |
| **Build** | Vite | 6.3.5 |
| **Mobile** | Capacitor | 8.3.1 |
| **UI** | shadcn/ui + Tailwind | Latest |
| **Backend** | Python Flask | Render |
| **Database** | PostgreSQL | Render |

## 📦 Dépendances Clés

### Capacitor Plugins
- `@capacitor/core` - Core Capacitor
- `@capacitor/app` - App lifecycle
- `@capacitor/device` - Device info
- `@capacitor/splash-screen` - Splash screen

### UI Components
- `shadcn/ui` - Composants UI premium
- `tailwindcss` - Utility-first CSS
- `lucide-react` - Icons

### Utilitaires
- `react-hook-form` - Gestion des formulaires
- `zod` - Validation de schémas
- `framer-motion` - Animations

## 🚀 Démarrage Rapide

### Installation

```bash
# Cloner le repo
git clone https://github.com/medo227-collab/limobile-app.git
cd limobile-app

# Installer les dépendances
pnpm install

# Installer Capacitor (si pas déjà fait)
pnpm add @capacitor/core @capacitor/cli @capacitor/android
```

### Développement Web

```bash
# Démarrer le serveur de développement
pnpm run dev

# Accès: http://localhost:5173
```

### Build APK

```bash
# Option 1: Script automatisé
chmod +x build-apk.sh
./build-apk.sh

# Option 2: Commandes manuelles
pnpm run build
npx cap sync
cd android
./gradlew assembleDebug
```

## 📱 Configuration Mobile

### Capacitor Config
```json
{
  "appId": "com.limobile.app",
  "appName": "LiMobile",
  "webDir": "dist"
}
```

### Android Manifest
- **Min SDK:** 26 (Android 8.0)
- **Target SDK:** 34 (Android 14)
- **Permissions:** INTERNET, ACCESS_NETWORK_STATE

## 🔐 Sécurité

### Implémenté
- ✅ HTTPS pour toutes les requêtes API
- ✅ Timeout des requêtes (30s)
- ✅ Validation des inputs
- ✅ Gestion des erreurs

### À Implémenter
- 🔲 Certificate pinning
- 🔲 Stockage sécurisé des tokens
- 🔲 Biométrie (empreinte digitale)
- 🔲 Chiffrement des données locales

## 📊 API Backend

**Base URL:** `https://limobile-backend-3.onrender.com/api`

### Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/register` | Créer un compte |
| POST | `/login` | Se connecter |
| GET | `/user/{id}/accounts` | Récupérer les comptes |
| POST | `/user/{id}/add-account` | Ajouter un compte |
| GET | `/forfaits/{operator}` | Lister les forfaits |
| POST | `/forfait` | Acheter un forfait |
| POST | `/transfer` | Transférer du crédit |
| GET | `/user/{id}/transactions` | Historique |

## 🎨 Design & UX

### Optimisations Mobile
- ✅ Safe area support (notch)
- ✅ Responsive design (mobile-first)
- ✅ Touch-optimized (44px min buttons)
- ✅ Font size 16px (prévient le zoom)
- ✅ Splash screen personnalisé

### Thème
- **Couleur primaire:** Vert (#22c55e)
- **Couleur secondaire:** Gris
- **Mode:** Light (extensible à Dark)

## 📈 Performance

### Optimisations
- ✅ Code splitting (Vite)
- ✅ Lazy loading des images
- ✅ Minification du JavaScript
- ✅ CSS optimisé

### Taille
- **Debug APK:** ~50-80 MB
- **Release APK:** ~30-50 MB

## 🧪 Tests

### Test Manuel
Voir [TESTING_GUIDE.md](./TESTING_GUIDE.md)

### Checklist
- [ ] Enregistrement
- [ ] Connexion
- [ ] Ajouter comptes
- [ ] Acheter forfaits
- [ ] Transférer crédit
- [ ] Historique
- [ ] Responsive
- [ ] Performance

## 🔄 Workflow de Développement

```
1. Modifier code React (src/)
   ↓
2. pnpm run build
   ↓
3. npx cap sync
   ↓
4. ./gradlew assembleDebug
   ↓
5. adb install -r app-debug.apk
   ↓
6. Tester sur téléphone
```

## 📚 Documentation

- [CAPACITOR_SETUP.md](./CAPACITOR_SETUP.md) - Setup Capacitor
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Guide de test
- [Capacitor Docs](https://capacitorjs.com/docs)
- [React Docs](https://react.dev)

## 🐛 Dépannage

### Erreur: "gradlew not found"
```bash
cd android
chmod +x gradlew
./gradlew assembleDebug
```

### Erreur: "SDK not found"
- Installe Android SDK
- Configure ANDROID_HOME
- Relance le build

### APK ne s'installe pas
```bash
# Désinstalle l'ancienne version
adb uninstall com.limobile.app

# Réinstalle
adb install -r app-debug.apk
```

## 📞 Support

- **Issues:** GitHub Issues
- **Email:** support@limobile.app
- **Docs:** https://github.com/medo227-collab/limobile-app

## 🚀 Roadmap

### V1.0 (Actuel)
- ✅ Enregistrement/Connexion
- ✅ Gestion multi-opérateurs
- ✅ Forfaits
- ✅ Transferts
- ✅ Historique

### V1.1 (Prochaine)
- 🔲 Notifications push
- 🔲 Persistance de session
- 🔲 Mode offline
- 🔲 Biométrie

### V2.0 (Futur)
- 🔲 iOS
- 🔲 Vraies APIs opérateurs
- 🔲 Paiement intégré
- 🔲 Statistiques avancées

## 📄 Licence

MIT License - Voir LICENSE.md

## 👥 Contributeurs

- **Développement:** Manus AI
- **Backend:** Python Flask
- **Frontend:** React + Capacitor

---

**Dernière mise à jour:** Avril 2026
**Version:** 1.0.0
**Status:** ✅ Stable
