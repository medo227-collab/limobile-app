FROM openjdk:17-jdk-slim

# Installe les dépendances système
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Installe Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Installe pnpm
RUN npm install -g pnpm

# Configure Android SDK
ENV ANDROID_HOME=/opt/android-sdk
ENV PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools

# Crée le répertoire Android SDK
RUN mkdir -p $ANDROID_HOME

# Télécharge et installe Android SDK
RUN wget -q https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip && \
    unzip -q commandlinetools-linux-9477386_latest.zip -d $ANDROID_HOME && \
    mv $ANDROID_HOME/cmdline-tools $ANDROID_HOME/cmdline-tools-temp && \
    mkdir -p $ANDROID_HOME/cmdline-tools/latest && \
    mv $ANDROID_HOME/cmdline-tools-temp/* $ANDROID_HOME/cmdline-tools/latest/ && \
    rm -f commandlinetools-linux-9477386_latest.zip

# Accepte les licenses Android
RUN yes | sdkmanager --licenses

# Installe les SDK Android nécessaires
RUN sdkmanager \
    "platform-tools" \
    "platforms;android-34" \
    "build-tools;34.0.0"

# Répertoire de travail
WORKDIR /app

# Clone le repo LiMobile
RUN git clone https://github.com/medo227-collab/limobile-app.git .

# Installe les dépendances npm
RUN pnpm install

# Build React
RUN pnpm run build

# Synchronise Capacitor
RUN npx cap sync

# Build APK Debug
RUN cd android && chmod +x gradlew && ./gradlew assembleDebug

# Copie l'APK vers le volume de sortie
RUN mkdir -p /output && \
    cp android/app/build/outputs/apk/debug/app-debug.apk /output/

# Commande par défaut
CMD ["sh", "-c", "echo 'APK généré: /output/app-debug.apk' && ls -lh /output/"]
