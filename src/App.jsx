import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardHeader } from '@/components/ui/card.jsx'
import { Smartphone, ArrowRightLeft, Wifi, Phone, LogOut, Eye, EyeOff, Plus, History } from 'lucide-react'
import logo from './assets/limobile_logo_2.png'
import './App.css'

const API_URL = 'https://limobile-backend-3.onrender.com/api'

function App() {
  const [currentScreen, setCurrentScreen] = useState('login')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [showConfirmPin, setShowConfirmPin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)
  const [userAccounts, setUserAccounts] = useState([])
  const [selectedOperator, setSelectedOperator] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const operators = [
    { id: 'airtel', name: 'Airtel', color: 'red', bgColor: 'bg-red-50' },
    { id: 'moov', name: 'Moov', color: 'orange', bgColor: 'bg-orange-50' },
    { id: 'zamani', name: 'Zamani', color: 'blue', bgColor: 'bg-blue-50' }
  ]

  const callPackages = [
    { id: 1, name: 'Forfait Jour Appel', duration: '24h', price: 150, description: 'Appels illimités 24h' },
    { id: 2, name: 'Forfait Semaine Appel', duration: '7 jours', price: 500, description: 'Appels illimités 7 jours' },
    { id: 3, name: 'Forfait Mois Appel', duration: '30 jours', price: 2000, description: 'Appels illimités 30 jours' }
  ]

  const internetPackages = [
    { id: 4, name: 'Forfait Jour Internet', duration: '24h', price: 100, data: '100 Mo', description: '100 Mo pendant 24h' },
    { id: 5, name: 'Forfait Semaine Internet', duration: '7 jours', price: 500, data: '500 Mo', description: '500 Mo pendant 7 jours' },
    { id: 6, name: 'Forfait Mois Internet', duration: '30 jours', price: 2000, data: '2.5 Go', description: '2.5 Go pendant 30 jours' }
  ]

  const fetchUserAccounts = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/user/${userId}/accounts`)
      if (response.ok) {
        const data = await response.json()
        setUserAccounts(data.accounts || [])
        if (data.accounts && data.accounts.length > 0) {
          setSelectedOperator(data.accounts[0].operator)
        }
      }
    } catch (err) {
      console.error('Erreur:', err)
    }
  }

  const fetchTransactions = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/user/${userId}/transactions`)
      if (response.ok) {
        const data = await response.json()
        setTransactions(data.transactions || [])
      }
    } catch (err) {
      console.error('Erreur:', err)
    }
  }

  const handleRegister = async () => {
    setError('')
    setSuccessMessage('')

    if (!phoneNumber.trim() || pin.length !== 4 || confirmPin.length !== 4) {
      setError('Veuillez remplir tous les champs correctement')
      return
    }

    if (pin !== confirmPin) {
      setError('Les codes PIN ne correspondent pas')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_number: phoneNumber,
          pin: pin
        })
      })

      const data = await response.json()
      if (response.ok) {
        setSuccessMessage('Compte créé avec succès ! Connectez-vous maintenant.')
        setTimeout(() => {
          setCurrentScreen('login')
          setPhoneNumber('')
          setPin('')
          setConfirmPin('')
        }, 2000)
      } else {
        setError(data.message || 'Erreur lors de la création du compte')
      }
    } catch (err) {
      setError('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    setError('')
    setSuccessMessage('')

    if (!phoneNumber.trim() || pin.length !== 4) {
      setError('Veuillez remplir tous les champs')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_number: phoneNumber,
          pin: pin
        })
      })

      const data = await response.json()
      if (response.ok) {
        setUserId(data.user_id)
        setIsLoggedIn(true)
        setCurrentScreen('dashboard')
        await fetchUserAccounts(data.user_id)
        await fetchTransactions(data.user_id)
      } else {
        setError(data.message || 'Identifiants invalides')
      }
    } catch (err) {
      setError('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserId(null)
    setUserAccounts([])
    setSelectedOperator(null)
    setTransactions([])
    setCurrentScreen('login')
    setPhoneNumber('')
    setPin('')
    setConfirmPin('')
  }

  const handleAddOperator = async (operatorId) => {
    setError('')
    setSuccessMessage('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/user/${userId}/add-account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operator: operatorId })
      })

      const data = await response.json()
      if (response.ok) {
        setSuccessMessage(`Compte ${operatorId.toUpperCase()} ajouté avec succès !`)
        await fetchUserAccounts(userId)
      } else {
        setError(data.message || 'Erreur lors de l\'ajout du compte')
      }
    } catch (err) {
      setError('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="LiMobile" className="h-20 w-auto" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Bienvenue sur LiMobile</h1>
          <p className="text-gray-600 mt-2">Gestion simple de votre mobile money</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}
          {successMessage && <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{successMessage}</div>}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Numéro de téléphone</label>
            <Input
              type="tel"
              placeholder="+227 XX XX XX XX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Code PIN (4 chiffres)</label>
            <div className="relative">
              <Input
                type={showPin ? "text" : "password"}
                placeholder="••••"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="rounded-xl text-center text-lg tracking-widest pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button 
            onClick={handleLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 text-lg font-medium"
            disabled={!phoneNumber || pin.length !== 4 || loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>

          <Button 
            onClick={() => setCurrentScreen('register')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 text-lg font-medium"
          >
            Créer un compte
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const RegisterScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="LiMobile" className="h-20 w-auto" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Créer un compte</h1>
          <p className="text-gray-600 mt-2">Rejoignez LiMobile aujourd'hui</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}
          {successMessage && <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{successMessage}</div>}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Numéro de téléphone</label>
            <Input
              type="tel"
              placeholder="+227 XX XX XX XX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Code PIN (4 chiffres)</label>
            <div className="relative">
              <Input
                type={showPin ? "text" : "password"}
                placeholder="••••"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="rounded-xl text-center text-lg tracking-widest pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Confirmer le PIN</label>
            <div className="relative">
              <Input
                type={showConfirmPin ? "text" : "password"}
                placeholder="••••"
                maxLength={4}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="rounded-xl text-center text-lg tracking-widest pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPin(!showConfirmPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button 
            onClick={handleRegister}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 text-lg font-medium"
            disabled={!phoneNumber || pin.length !== 4 || confirmPin.length !== 4 || loading}
          >
            {loading ? 'Création...' : 'Créer un compte'}
          </Button>

          <Button 
            onClick={() => {
              setCurrentScreen('login')
              setError('')
              setSuccessMessage('')
            }}
            variant="ghost"
            className="w-full text-green-600 hover:text-green-700"
          >
            Retour à la connexion
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const DashboardScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <img src={logo} alt="LiMobile" className="h-8 w-auto" />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}
        {successMessage && <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{successMessage}</div>}

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Mes opérateurs</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {operators.map((op) => {
                const hasAccount = userAccounts.some(acc => acc.operator === op.id)
                return (
                  <button
                    key={op.id}
                    onClick={() => hasAccount && setSelectedOperator(op.id)}
                    className={`p-4 rounded-xl text-center transition-all ${
                      hasAccount
                        ? selectedOperator === op.id
                          ? `${op.bgColor} border-2 border-${op.color}-600`
                          : 'border-2 border-gray-200 hover:border-gray-300'
                        : 'border-2 border-dashed border-gray-300 cursor-pointer hover:border-green-600'
                    }`}
                  >
                    <div className="font-bold text-sm mb-1">{op.name}</div>
                    {hasAccount ? (
                      <div className="text-xs text-gray-600">Actif</div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddOperator(op.id)
                        }}
                        className="text-xs text-green-600 hover:text-green-700 font-medium"
                      >
                        + Ajouter
                      </button>
                    )}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {selectedOperator && userAccounts.find(acc => acc.operator === selectedOperator) && (
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Solde {selectedOperator.toUpperCase()}</h2>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="text-gray-600 text-sm mb-2">Solde disponible</div>
                <div className="text-4xl font-bold text-green-600">
                  {userAccounts.find(acc => acc.operator === selectedOperator)?.balance || 0} F
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={() => setCurrentScreen('transfer')}
            className="h-24 bg-green-600 hover:bg-green-700 text-white rounded-xl flex flex-col items-center justify-center space-y-2"
          >
            <ArrowRightLeft className="h-6 w-6" />
            <span className="text-sm font-medium">Transférer</span>
          </Button>
          <Button 
            onClick={() => setCurrentScreen('forfait')}
            className="h-24 bg-green-600 hover:bg-green-700 text-white rounded-xl flex flex-col items-center justify-center space-y-2"
          >
            <Wifi className="h-6 w-6" />
            <span className="text-sm font-medium">Forfaits</span>
          </Button>
        </div>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Historique</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setCurrentScreen('history')}
                className="text-green-600"
              >
                Voir tout
              </Button>
            </div>
            <div className="space-y-3">
              {transactions.slice(0, 3).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div>
                    <div className="font-medium text-gray-800">{transaction.description}</div>
                    <div className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString('fr-FR')}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount} F
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const TransferScreen = () => {
    const [destinationNumber, setDestinationNumber] = useState('')
    const [amount, setAmount] = useState('')

    const handleTransfer = async () => {
      setError('')
      setSuccessMessage('')

      if (!destinationNumber.trim() || !amount) {
        setError('Veuillez remplir tous les champs')
        return
      }

      setLoading(true)
      try {
        const response = await fetch(`${API_URL}/transfer`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: userId,
            source_operator: selectedOperator,
            destination_number: destinationNumber,
            amount: parseInt(amount)
          })
        })

        const data = await response.json()
        if (response.ok) {
          setSuccessMessage('Transfert effectué avec succès !')
          setTimeout(() => {
            setCurrentScreen('dashboard')
            setDestinationNumber('')
            setAmount('')
            fetchUserAccounts(userId)
            fetchTransactions(userId)
          }, 2000)
        } else {
          setError(data.message || 'Erreur lors du transfert')
        }
      } catch (err) {
        setError('Erreur de connexion au serveur')
      } finally {
        setLoading(false)
      }
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentScreen('dashboard')}
                className="text-gray-600"
              >
                ← Retour
              </Button>
              <h1 className="text-lg font-semibold">Transfert de crédit</h1>
              <div></div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}
          {successMessage && <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{successMessage}</div>}

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Opérateur source</label>
                <div className="p-3 bg-gray-100 rounded-xl text-gray-800 font-medium">
                  {selectedOperator?.toUpperCase()}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Numéro destinataire</label>
                <Input
                  type="tel"
                  placeholder="+227 XX XX XX XX"
                  className="rounded-xl"
                  value={destinationNumber}
                  onChange={(e) => setDestinationNumber(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Montant</label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[150, 500, 1000, 2500].map((amt) => (
                    <Button 
                      key={amt} 
                      variant="outline" 
                      size="sm" 
                      className="rounded-lg"
                      onClick={() => setAmount(amt.toString())}
                    >
                      {amt}F
                    </Button>
                  ))}
                </div>
                <Input
                  type="number"
                  placeholder="Montant personnalisé"
                  className="rounded-xl"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3"
                onClick={handleTransfer}
                disabled={!destinationNumber || !amount || loading}
              >
                {loading ? 'Transfert en cours...' : 'Effectuer le transfert'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const ForfaitScreen = () => {
    const [beneficiaryNumber, setBeneficiaryNumber] = useState('')
    const [selectedPackage, setSelectedPackage] = useState(null)
    const [packageType, setPackageType] = useState('call')

    const packages = packageType === 'call' ? callPackages : internetPackages

    const handleBuyForfait = async () => {
      setError('')
      setSuccessMessage('')

      if (!beneficiaryNumber.trim() || !selectedPackage) {
        setError('Veuillez remplir tous les champs')
        return
      }

      setLoading(true)
      try {
        const response = await fetch(`${API_URL}/forfait`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: userId,
            operator: selectedOperator,
            beneficiary_number: beneficiaryNumber,
            package_id: selectedPackage.id,
            package_type: packageType
          })
        })

        const data = await response.json()
        if (response.ok) {
          setSuccessMessage('Forfait acheté avec succès !')
          setTimeout(() => {
            setCurrentScreen('dashboard')
            setBeneficiaryNumber('')
            setSelectedPackage(null)
            fetchUserAccounts(userId)
            fetchTransactions(userId)
          }, 2000)
        } else {
          setError(data.message || 'Erreur lors de l\'achat')
        }
      } catch (err) {
        setError('Erreur de connexion au serveur')
      } finally {
        setLoading(false)
      }
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentScreen('dashboard')}
                className="text-gray-600"
              >
                ← Retour
              </Button>
              <h1 className="text-lg font-semibold">Forfaits</h1>
              <div></div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}
          {successMessage && <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{successMessage}</div>}

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Type de forfait</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setPackageType('call')
                      setSelectedPackage(null)
                    }}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      packageType === 'call'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Phone className="h-5 w-5 mx-auto mb-1" />
                    <div className="text-sm font-medium">Forfaits Appel</div>
                  </button>
                  <button
                    onClick={() => {
                      setPackageType('internet')
                      setSelectedPackage(null)
                    }}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      packageType === 'internet'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Wifi className="h-5 w-5 mx-auto mb-1" />
                    <div className="text-sm font-medium">Forfaits Internet</div>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Opérateur</label>
                <div className="p-3 bg-gray-100 rounded-xl text-gray-800 font-medium">
                  {selectedOperator?.toUpperCase()}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Numéro bénéficiaire</label>
                <Input
                  type="tel"
                  placeholder="+227 XX XX XX XX"
                  className="rounded-xl"
                  value={beneficiaryNumber}
                  onChange={(e) => setBeneficiaryNumber(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {packageType === 'call' ? 'Forfaits Appel' : 'Forfaits Internet'}
                </label>
                <div className="space-y-2">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        selectedPackage?.id === pkg.id
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-800">{pkg.name}</div>
                          <div className="text-sm text-gray-600 mt-1">{pkg.description}</div>
                          <div className="text-xs text-gray-500 mt-1">{pkg.duration}</div>
                        </div>
                        <div className="font-bold text-green-600">{pkg.price}F</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3"
                onClick={handleBuyForfait}
                disabled={!beneficiaryNumber || !selectedPackage || loading}
              >
                {loading ? 'Achat en cours...' : `Acheter (${selectedPackage?.price || 0}F)`}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const HistoryScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentScreen('dashboard')}
              className="text-gray-600"
            >
              ← Retour
            </Button>
            <h1 className="text-lg font-semibold">Historique</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            {transactions.length === 0 ? (
              <div className="text-center py-8">
                <History className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Aucune transaction pour le moment</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <div>
                      <div className="font-medium text-gray-800">{transaction.description}</div>
                      <div className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString('fr-FR')}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount} F
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )

  switch (currentScreen) {
    case 'login':
      return <LoginScreen />
    case 'register':
      return <RegisterScreen />
    case 'dashboard':
      return <DashboardScreen />
    case 'transfer':
      return <TransferScreen />
    case 'forfait':
      return <ForfaitScreen />
    case 'history':
      return <HistoryScreen />
    default:
      return <LoginScreen />
  }
}

export default App
