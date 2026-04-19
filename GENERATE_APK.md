# 📱 LiMobile - Guide Complet pour Générer l'APK

## ⚠️ Situation Actuelle

Le projet Capacitor est **100% configuré et prêt**, mais le sandbox n'a pas d'Android SDK complet.

**Bonne nouvelle:** Tu peux générer l'APK facilement sur ta machine ! 🎉

---

## 🚀 Option 1: Générer sur Ta Machine (Recommandé)

### Prérequis

1. **Java 17+**
   ```bash
   java -version
   # Doit afficher: openjdk 17.x.x ou supérieur
   ```
   
   Si tu n'as pas Java 17:
   - **Windows/Mac:** Télécharge depuis [adoptium.net](https://adoptium.net)
   - **Linux:** `sudo apt-get install openjdk-17-jdk`

2. **Android SDK**
   - **Option A:** Installe Android Studio (inclut SDK)
     - Télécharge: [developer.android.com/studio](https://developer.android.com/studio)
     - Installe et accepte les SDK
   
   - **Option B:** Installe SDK seul
     ```bash
     # Linux/Mac
     brew install android-sdk
     
     # Ou télécharge manuellement
     ```

3. **Gradle** (inclus dans le projet via gradlew)

### Étapes de Build

1. **Clone le repo**
   ```bash
   git clone https://github.com/medo227-collab/limobile-app.git
   cd limobile-app
   ```

2. **Installe les dépendances**
   ```bash
   npm install
   # ou
   pnpm install
   ```

3. **Configure Android SDK** (si nécessaire)
   ```bash
   # Définis ANDROID_HOME
   export ANDROID_HOME=~/Library/Android/sdk  # Mac
   export ANDROID_HOME=~/Android/Sdk           # Linux
   export ANDROID_HOME=%USERPROFILE%\AppData\Local\Android\sdk  # Windows
   
   # Ajoute à ton PATH
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   ```

4. **Build React**
   ```bash
   npm run build
   ```

5. **Synchronise Capacitor**
   ```bash
   npx cap sync
   ```

6. **Build APK Debug**
   ```bash
   cd android
   ./gradlew assembleDebug
   ```

7. **Localise l'APK**
   ```bash
   # L'APK se trouve à:
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

8. **Installe sur ton téléphone**
   ```bash
   # Via ADB
   adb install -r android/app/build/outputs/apk/debug/app-debug.apk
   
   # Ou transfère le fichier APK manuellement
   ```

---

## 🌐 Option 2: Utiliser EAS Build (Expo Application Services)

### Avantages
- ✅ Pas besoin d'installer Android SDK
- ✅ Build dans le cloud
- ✅ APK généré en 5-10 minutes
- ✅ Gratuit pour les projets open-source

### Étapes

1. **Installe EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Configure le projet**
   ```bash
   cd /tmp/limobile-app
   eas build --platform android --local
   ```

3. **Télécharge l'APK**
   - L'APK sera généré et téléchargé automatiquement

---

## 🐳 Option 3: Docker (Recommandé si tu as Docker)

### Avantages
- ✅ Environnement isolé
- ✅ Pas de dépendances locales
- ✅ Reproductible

### Dockerfile

```dockerfile
FROM openjdk:17-jdk

# Installe Android SDK
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Installe Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Installe Android SDK
ENV ANDROID_HOME=/opt/android-sdk
RUN mkdir -p ${ANDROID_HOME} && \
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip && \
    unzip -q commandlinetools-linux-9477386_latest.zip -d ${ANDROID_HOME} && \
    rm commandlinetools-linux-9477386_latest.zip

# Accepte les licenses
RUN yes | ${ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager --licenses

# Clone et build
WORKDIR /app
RUN git clone https://github.com/medo227-collab/limobile-app.git .
RUN npm install -g pnpm && pnpm install
RUN npm run build
RUN npx cap sync
RUN cd android && ./gradlew assembleDebug

# Output
CMD ["cp", "android/app/build/outputs/apk/debug/app-debug.apk", "/output/"]
```

### Utilisation

```bash
# Build l'image
docker build -t limobile-builder .

# Génère l'APK
docker run -v $(pwd)/output:/output limobile-builder

# L'APK sera dans ./output/app-debug.apk
```

---

## 📊 Comparaison des Options

| Option | Facilité | Temps | Prérequis | Recommandé |
|--------|----------|-------|-----------|-----------|
| **Machine locale** | ⭐⭐⭐ | 10-20 min | Java 17 + Android SDK | ✅ Oui |
| **EAS Build** | ⭐⭐⭐⭐ | 5-10 min | Compte EAS | ✅ Oui |
| **Docker** | ⭐⭐ | 30-40 min | Docker | Si tu as Docker |

---

## 🔧 Dépannage

### Erreur: "Java 17 not found"
```bash
# Installe Java 17
# Windows: Télécharge depuis adoptium.net
# Mac: brew install openjdk@17
# Linux: sudo apt-get install openjdk-17-jdk

# Configure JAVA_HOME
export JAVA_HOME=/path/to/java17
```

### Erreur: "Android SDK not found"
```bash
# Installe Android Studio
# Ou configure ANDROID_HOME
export ANDROID_HOME=~/Android/Sdk
```

### Erreur: "gradlew permission denied"
```bash
chmod +x android/gradlew
```

### Build très lent
- Première build: 5-10 min (normal)
- Builds suivantes: 2-3 min (Gradle cache)

### APK trop volumineux
- Debug APK: 50-80 MB (normal)
- Release APK: 30-50 MB (après minification)

---

## 📱 Installation sur Téléphone

### Via ADB (Développeurs)
```bash
adb install -r app-debug.apk
```

### Installation Manuelle
1. Transfère le fichier APK sur ton téléphone
2. Ouvre le gestionnaire de fichiers
3. Localise le fichier APK
4. Appuie dessus
5. Clique "Installer"
6. Accepte les permissions

### Vérification
```bash
# Vérifie que l'app est installée
adb shell pm list packages | grep limobile
```

---

## ✅ Checklist Avant de Générer

- [ ] Java 17+ installé
- [ ] Android SDK installé
- [ ] JAVA_HOME configuré
- [ ] ANDROID_HOME configuré
- [ ] Git clone du repo
- [ ] `npm install` ou `pnpm install` exécuté
- [ ] Téléphone Android en mode développeur (optionnel)

---

## 🎯 Résumé Rapide

**La plus simple (5 min):**
```bash
git clone https://github.com/medo227-collab/limobile-app.git
cd limobile-app
npm install
npm run build
npx cap sync
cd android
./gradlew assembleDebug
# APK généré: android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📞 Support

Si tu rencontres des problèmes:
1. Vérifie les prérequis (Java 17, Android SDK)
2. Consulte le [Capacitor Docs](https://capacitorjs.com/docs/android)
3. Ouvre une issue GitHub

---

**Bonne chance ! 🚀**
L'APK est presque prêt ! 📱
