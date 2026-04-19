# 📱 LiMobile - Guide de Test Android

## 🎯 Objectif

Tester l'application LiMobile sur Android en tant qu'application native installable (APK).

## 📋 Prérequis

- Téléphone Android 8.0+ (API 26+)
- Câble USB (pour connexion ADB) OU
- Accès au fichier APK pour installation manuelle
- Connexion Internet active

## 🚀 Installation de l'APK

### Option 1: Installation via ADB (Recommandée pour développeurs)

1. **Connecte ton téléphone en USB**
   - Active le mode développeur (Paramètres → À propos → Appuie 7 fois sur "Numéro de build")
   - Active le débogage USB

2. **Installe l'APK**
   ```bash
   cd /tmp/limobile-app
   adb install -r android/app/build/outputs/apk/debug/app-debug.apk
   ```

3. **Attends la fin de l'installation**
   ```
   Success
   ```

### Option 2: Installation manuelle (Pour utilisateurs finaux)

1. **Télécharge le fichier APK**
   - Depuis GitHub: `android/app/build/outputs/apk/debug/app-debug.apk`

2. **Transfère sur ton téléphone**
   - Via câble USB ou cloud

3. **Installe sur le téléphone**
   - Ouvre le gestionnaire de fichiers
   - Localise le fichier APK
   - Appuie dessus
   - Clique sur "Installer"
   - Accepte les permissions

## ✅ Flux de Test Complet

### 1️⃣ Lancement de l'application

**Étapes:**
- Ouvre l'app "LiMobile" depuis le tiroir d'applications
- Observe le splash screen (logo LiMobile)
- Attends le chargement complet

**Résultat attendu:**
- ✅ Écran de connexion s'affiche
- ✅ Pas d'erreur de chargement

### 2️⃣ Enregistrement (Créer un compte)

**Données de test:**
- Téléphone: `+22791234567` (ou un autre numéro)
- PIN: `1234`
- Confirmer PIN: `1234`

**Étapes:**
1. Clique sur "Créer un compte"
2. Entre le numéro de téléphone
3. Entre le PIN (4 chiffres)
4. Confirme le PIN
5. Clique sur "Créer un compte"

**Résultat attendu:**
- ✅ Message de succès "Compte créé avec succès"
- ✅ Redirection vers l'écran de connexion après 2 secondes
- ✅ Pas d'erreur réseau

### 3️⃣ Connexion

**Données:**
- Téléphone: `+22791234567`
- PIN: `1234`

**Étapes:**
1. Entre le numéro de téléphone
2. Entre le PIN
3. Clique sur "Se connecter"

**Résultat attendu:**
- ✅ Connexion réussie
- ✅ Accès au dashboard
- ✅ Pas d'erreur d'authentification

### 4️⃣ Dashboard - Vue d'ensemble

**Étapes:**
1. Observe l'écran principal
2. Vérifie les opérateurs affichés (Airtel, Moov, Zamani)

**Résultat attendu:**
- ✅ Trois opérateurs visibles
- ✅ Interface responsive (adaptée à la taille de l'écran)
- ✅ Boutons "Transférer" et "Forfaits" visibles

### 5️⃣ Ajouter un compte opérateur

**Étapes:**
1. Clique sur "+ Ajouter" pour Airtel
2. Confirme l'ajout

**Résultat attendu:**
- ✅ Compte Airtel ajouté
- ✅ Solde initial: 1000 F
- ✅ Statut "Actif" s'affiche

### 6️⃣ Ajouter un deuxième compte

**Étapes:**
1. Clique sur "+ Ajouter" pour Moov
2. Confirme l'ajout

**Résultat attendu:**
- ✅ Compte Moov ajouté
- ✅ Solde initial: 1000 F
- ✅ Deux comptes actifs affichés

### 7️⃣ Voir les forfaits

**Étapes:**
1. Sélectionne Airtel (clique sur la carte)
2. Clique sur le bouton "Forfaits"
3. Observe les forfaits disponibles

**Résultat attendu:**
- ✅ 6 forfaits affichés (3 Appel + 3 Internet)
- ✅ Noms, prix et durées visibles
- ✅ Catégorisation claire

### 8️⃣ Acheter un forfait

**Étapes:**
1. Sélectionne Airtel
2. Clique sur "Forfaits"
3. Clique sur "Forfait Jour Appel" (150 F)
4. Confirme l'achat

**Résultat attendu:**
- ✅ Message "Forfait acheté"
- ✅ Solde Airtel: 850 F (1000 - 150)
- ✅ Transaction enregistrée

### 9️⃣ Vérifier l'historique

**Étapes:**
1. Retour au dashboard
2. Clique sur "Voir tout" dans la section Historique

**Résultat attendu:**
- ✅ Transaction d'achat visible
- ✅ Description: "Achat de Forfait Jour Appel"
- ✅ Montant: -150 F

### 🔟 Transfert de crédit

**Étapes:**
1. Sélectionne Airtel
2. Clique sur "Transférer"
3. Entre le numéro destination: `+22790111111`
4. Entre le montant: `100`
5. Clique sur "Transférer"

**Résultat attendu:**
- ✅ Message "Transfert effectué"
- ✅ Solde Airtel: 750 F (850 - 100)
- ✅ Nouvelle transaction enregistrée

### 1️⃣1️⃣ Déconnexion

**Étapes:**
1. Clique sur le bouton "Déconnexion" (en haut)
2. Confirme la déconnexion

**Résultat attendu:**
- ✅ Retour à l'écran de connexion
- ✅ Session fermée
- ✅ Données sécurisées

## 📊 Checklist de Test

| Fonctionnalité | Testé | Résultat | Notes |
|---|---|---|---|
| Lancement app | ☐ | ☐ | |
| Enregistrement | ☐ | ☐ | |
| Connexion | ☐ | ☐ | |
| Dashboard | ☐ | ☐ | |
| Ajouter compte | ☐ | ☐ | |
| Voir forfaits | ☐ | ☐ | |
| Acheter forfait | ☐ | ☐ | |
| Historique | ☐ | ☐ | |
| Transfert | ☐ | ☐ | |
| Déconnexion | ☐ | ☐ | |
| Responsive | ☐ | ☐ | |
| Performance | ☐ | ☐ | |

## 🐛 Signaler les Bugs

**Format de rapport:**
```
Titre: [Brève description du bug]

Étapes pour reproduire:
1. ...
2. ...
3. ...

Résultat attendu:
...

Résultat obtenu:
...

Environnement:
- Téléphone: [Modèle]
- Android: [Version]
- Version app: 1.0
```

## 📱 Optimisations Testées

- ✅ Interface responsive (toutes tailles d'écran)
- ✅ Support notch/encoche
- ✅ Pas de zoom involontaire sur inputs
- ✅ Tactile optimisé (pas de highlight gris)
- ✅ Splash screen
- ✅ Performances fluides

## 🔗 Ressources

- **Backend API:** https://limobile-backend-3.onrender.com/api
- **Frontend Web:** https://marvelous-sopapillas-9a78ca.netlify.app/
- **GitHub:** https://github.com/medo227-collab/limobile-app

## 📝 Notes Importantes

1. **Données de test:** Tous les comptes et transactions sont en mode mock (pas de vrais opérateurs)
2. **Backend:** Utilise l'API Render en production
3. **Offline:** L'app fonctionne avec Internet (cache à venir)
4. **Permissions:** Demande seulement INTERNET et ACCESS_NETWORK_STATE

## ✨ Prochaines Versions

- [ ] Notifications push
- [ ] Persistance de session
- [ ] Mode offline
- [ ] Version iOS
- [ ] Intégration vraies APIs opérateurs
- [ ] Biométrie (empreinte digitale)

---

**Merci de tester LiMobile ! 🎉**
Tes retours sont précieux pour améliorer l'application.
