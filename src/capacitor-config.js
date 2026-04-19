/**
 * Configuration Capacitor pour LiMobile
 * Gère les plugins et les futures fonctionnalités
 */

import { SplashScreen } from '@capacitor/splash-screen'
import { App as CapacitorApp } from '@capacitor/app'
import { Device } from '@capacitor/device'

// Configuration des plugins
export const capacitorConfig = {
  splashScreen: {
    autoHide: true,
    fadeOutDuration: 500
  },
  
  notifications: {
    enabled: false, // À activer après intégration
    channels: {
      default: {
        id: 'default',
        name: 'Notifications par défaut',
        importance: 4,
        sound: true,
        vibration: true
      },
      transactions: {
        id: 'transactions',
        name: 'Notifications de transactions',
        importance: 4,
        sound: true,
        vibration: true
      }
    }
  },
  
  permissions: {
    required: ['INTERNET', 'ACCESS_NETWORK_STATE'],
    optional: ['CAMERA', 'READ_EXTERNAL_STORAGE']
  },
  
  security: {
    enableSSL: true,
    certificatePinning: false, // À implémenter en production
    apiTimeout: 30000 // 30 secondes
  },
  
  storage: {
    enabled: true,
    type: 'localStorage', // Peut être changé en 'secureStorage'
    keys: {
      userToken: 'limobile_user_token',
      userId: 'limobile_user_id',
      userPhone: 'limobile_user_phone',
      lastSync: 'limobile_last_sync'
    }
  }
}

/**
 * Initialiser Capacitor
 */
export const initializeCapacitor = async () => {
  try {
    // Masquer le splash screen
    await SplashScreen.hide()
    
    // Récupérer les infos du device
    const info = await Device.getInfo()
    console.log('Device Info:', {
      platform: info.platform,
      osVersion: info.osVersion,
      model: info.model
    })
    
    // Gérer les événements du cycle de vie
    CapacitorApp.addListener('appStateChange', ({ isActive }) => {
      console.log('App state:', isActive ? 'active' : 'inactive')
      // À implémenter: pause/resume logic
    })
    
    CapacitorApp.addListener('backButton', () => {
      console.log('Back button pressed')
      // À implémenter: gestion du bouton retour
    })
    
    return true
  } catch (error) {
    console.log('Capacitor initialization error:', error)
    return false
  }
}

/**
 * Gérer les permissions
 */
export const requestPermissions = async (permissions = []) => {
  try {
    // À implémenter avec @capacitor/core permissions API
    console.log('Requesting permissions:', permissions)
    return true
  } catch (error) {
    console.error('Permission request error:', error)
    return false
  }
}

/**
 * Gestion du stockage sécurisé
 */
export const secureStorage = {
  set: async (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('Storage error:', error)
      return false
    }
  },
  
  get: async (key) => {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch (error) {
      console.error('Storage error:', error)
      return null
    }
  },
  
  remove: async (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Storage error:', error)
      return false
    }
  },
  
  clear: async () => {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('Storage error:', error)
      return false
    }
  }
}

/**
 * Gestion des notifications push (à implémenter)
 */
export const pushNotifications = {
  register: async () => {
    console.log('Push notifications registration not yet implemented')
    // À implémenter avec @capacitor/push-notifications
  },
  
  send: async (notification) => {
    console.log('Sending notification:', notification)
    // À implémenter
  }
}

/**
 * Gestion des appels API sécurisés
 */
export const secureAPI = {
  fetch: async (url, options = {}) => {
    const defaultOptions = {
      timeout: capacitorConfig.security.apiTimeout,
      headers: {
        'Content-Type': 'application/json',
        'X-App-Version': '1.0.0',
        'X-Platform': 'android'
      }
    }
    
    const mergedOptions = { ...defaultOptions, ...options }
    
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), mergedOptions.timeout)
      
      const response = await fetch(url, {
        ...mergedOptions,
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      return response
    } catch (error) {
      console.error('API call error:', error)
      throw error
    }
  }
}

export default capacitorConfig
