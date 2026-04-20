# 📱 LiMobile - Télécharger l'APK (Guide Rapide)

## ⚡ Solution Rapide (Recommandée)

### **Option 1: Utiliser Appetize.io (Émulateur Cloud)**

Tu peux **tester l'application directement dans le navigateur** sans télécharger d'APK !

1. **Visite:** https://appetize.io
2. **Clique:** "Upload App"
3. **Sélectionne:** Le fichier APK (voir ci-dessous)
4. **Clique:** "Upload"
5. **Teste dans le navigateur** 📱

---

### **Option 2: Générer l'APK Localement (Recommandé)**

**Sur ta machine (Windows/Mac/Linux):**

```bash
# 1. Clone
git clone https://github.com/medo227-collab/limobile-app.git
cd limobile-app

# 2. Installe
npm install

# 3. Build
npm run build
npx cap sync

# 4. Génère APK
cd android
./gradlew assembleDebug

# 5. APK généré à:
# android/app/build/outputs/apk/debug/app-debug.apk
```

**Prérequis:**
- Java 17+
- Android Studio (ou Android SDK seul)

---

### **Option 3: Utiliser EAS Build (Cloud - Recommandé)**

```bash
# 1. Installe EAS CLI
npm install -g eas-cli

# 2. Clone
git clone https://github.com/medo227-collab/limobile-app.git
cd limobile-app

# 3. Se connecte
eas login

# 4. Build
eas build --platform android --profile production

# 5. Télécharge l'APK
```

**Avantages:**
- ✅ Pas besoin d'Android SDK
- ✅ Build dans le cloud
- ✅ Gratuit

---

## 📥 Télécharger l'APK

### **Depuis GitHub Releases**

Si un APK est disponible:
1. **Visite:** https://github.com/medo227-collab/limobile-app/releases
2. **Télécharge:** `limobile-app.apk`
3. **Installe** sur ton téléphone

---

### **Depuis GitHub Actions Artifacts**

1. **Visite:** https://github.com/medo227-collab/limobile-app/actions
2. **Clique sur le dernier build:** "Build APK"
3. **Scroll en bas:** Section "Artifacts"
4. **Télécharge:** `limobile-apk`
5. **Décompresse** et installe

---

## 📱 Installation sur Téléphone Android

### **Méthode 1: Installation Directe**

1. Télécharge l'APK sur ton téléphone
2. Ouvre le fichier
3. Clique "Installer"
4. Accepte les permissions
5. C'est fait ! 🎉

### **Méthode 2: Via ADB (Développeurs)**

```bash
adb install -r app-debug.apk
```

---

## 🧪 Tester l'Application

Une fois installée:

1. **Ouvre LiMobile**
2. **Crée un compte:**
   - Téléphone: `+22790123456`
   - PIN: `1234`
   - Confirmer PIN: `1234`
3. **Se connecte** avec les mêmes identifiants
4. **Teste les fonctionnalités:**
   - Ajouter un compte (Airtel, Moov, Zamani)
   - Voir les forfaits
   - Acheter un forfait
   - Transférer du crédit

---

## 📊 Spécifications

| Aspect | Détail |
|--------|--------|
| **Nom** | LiMobile |
| **Package** | com.limobile.app |
| **Version** | 1.0.0 |
| **Min SDK** | Android 8.0 (API 24) |
| **Target SDK** | Android 14 (API 34) |
| **Taille** | 50-80 MB (debug) |
| **Backend** | https://limobile-backend-3.onrender.com/api |

---

## 🔗 Ressources

| Ressource | URL |
|-----------|-----|
| **GitHub** | https://github.com/medo227-collab/limobile-app |
| **Backend** | https://github.com/medo227-collab/limobile-backend |
| **Frontend Web** | https://marvelous-sopapillas-9a78ca.netlify.app |
| **Capacitor Docs** | https://capacitorjs.com/docs |
| **EAS Build** | https://docs.expo.dev/build |

---

## ❓ FAQ

### **Q: L'APK ne s'installe pas**
A: Vérifie que:
- ✅ Tu as autorisé l'installation d'apps inconnues
- ✅ Ton téléphone a assez d'espace
- ✅ Tu utilises Android 8.0+

### **Q: L'app plante au démarrage**
A: Essaie:
- ✅ Redémarrer le téléphone
- ✅ Désinstaller et réinstaller
- ✅ Vérifier la connexion internet

### **Q: Comment mettre à jour l'app ?**
A: Génère un nouvel APK et réinstalle (il remplacera l'ancienne version)

### **Q: Puis-je partager l'APK ?**
A: Oui ! L'APK est open-source. Partage le lien GitHub !

---

**Bonne chance ! 🚀**
