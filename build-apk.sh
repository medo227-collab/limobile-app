#!/bin/bash

echo "🚀 LiMobile APK Build Script"
echo "============================"
echo ""

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "capacitor.config.json" ]; then
    echo "❌ Erreur: capacitor.config.json non trouvé"
    exit 1
fi

echo "📦 Étape 1: Build React..."
pnpm run build
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build React"
    exit 1
fi

echo "✅ Build React réussi"
echo ""

echo "🔄 Étape 2: Synchroniser avec Capacitor..."
npx cap sync
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la synchronisation"
    exit 1
fi

echo "✅ Synchronisation réussie"
echo ""

echo "🏗️ Étape 3: Build APK (debug)..."
cd android
./gradlew assembleDebug
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build APK"
    exit 1
fi

echo "✅ APK build réussi!"
echo ""

# Trouver le fichier APK généré
APK_FILE=$(find . -name "app-debug.apk" -type f)
if [ -z "$APK_FILE" ]; then
    echo "⚠️ Fichier APK non trouvé"
    exit 1
fi

echo "🎉 APK généré avec succès!"
echo "📍 Localisation: $APK_FILE"
echo ""
echo "📱 Pour installer sur un téléphone:"
echo "   adb install -r $APK_FILE"
echo ""
echo "✨ Ou télécharge le fichier APK et installe-le manuellement"
