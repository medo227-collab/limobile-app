# 📱 LiMobile - Guide Capacitor Android

## ✅ Étapes Complétées

- ✅ Capacitor initialisé (v8.3.1)
- ✅ Plateforme Android ajoutée
- ✅ Web assets synchronisés
- ✅ Interface optimisée pour mobile
- ✅ Splash screen configuré
- ✅ Plugins installés:
  - @capacitor/app
  - @capacitor/device
  - @capacitor/splash-screen

## 📋 Configuration

**App ID:** `com.limobile.app`
**App Name:** `LiMobile`
**Web Directory:** `dist/`

## 🚀 Générer l'APK

### Prérequis
- Java JDK 11+ installé
- Android SDK installé
- Gradle configuré

### Méthode 1: Script automatisé (Recommandé)
```bash
cd /tmp/limobile-app
chmod +x build-apk.sh
./build-apk.sh
```

### Méthode 2: Commandes manuelles
```bash
# 1. Build React
pnpm run build

# 2. Synchroniser avec Capacitor
npx cap sync

# 3. Build APK debug
cd android
./gradlew assembleDebug

# 4. Build APK release (signé)
./gradlew assembleRelease
```

## 📍 Localisation des APK

- **Debug APK:** `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK:** `android/app/build/outputs/apk/release/app-release.apk`

## 📱 Installation sur téléphone

### Via ADB (Android Debug Bridge)
```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

### Installation manuelle
1. Télécharge le fichier APK
2. Transfère-le sur ton téléphone
3. Ouvre le fichier APK sur le téléphone
4. Appuie sur "Installer"

## 🔄 Workflow de développement

```
Modifier code React
    ↓
pnpm run build
    ↓
npx cap sync
    ↓
./gradlew assembleDebug
    ↓
adb install -r app-debug.apk
    ↓
Tester sur téléphone
```

## 🎨 Optimisations Mobile

- ✅ Safe area (notch support)
- ✅ Tap highlight désactivé
- ✅ Font size 16px (prévient le zoom)
- ✅ Touch-action optimisé
- ✅ Viewport-fit: cover
- ✅ Responsive design mobile-first

## 🔐 Permissions Android

Les permissions suivantes sont configurées dans `AndroidManifest.xml`:
- INTERNET (pour les appels API)
- ACCESS_NETWORK_STATE

Pour ajouter des permissions:
1. Édite `android/app/src/main/AndroidManifest.xml`
2. Ajoute les permissions requises
3. Relance le build

## 🚨 Dépannage

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

### APK trop volumineux
- Minify le JavaScript (déjà activé)
- Compresse les images
- Utilise ProGuard

## 📊 Taille de l'APK

- **Debug APK:** ~50-80 MB (avec assets)
- **Release APK:** ~30-50 MB (minifié)

## 🔗 Ressources

- [Capacitor Docs](https://capacitorjs.com/docs)
- [Android Gradle Plugin](https://developer.android.com/studio/build)
- [Capacitor Android Deployment](https://capacitorjs.com/docs/android/deploying)

## 📝 Notes

- Le backend API est configuré sur: `https://limobile-backend-3.onrender.com/api`
- L'app fonctionne en mode offline (avec cache futur)
- Les notifications push peuvent être ajoutées ultérieurement
- Supporte Android 8.0+ (API 26+)

## 🎯 Prochaines étapes

1. Générer l'APK avec le script
2. Tester sur un téléphone Android
3. Valider les flux (register → login → dashboard)
4. Ajouter les notifications push
5. Implémenter la persistance de session
6. Préparer la version iOS (avec Capacitor)
