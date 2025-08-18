import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardHeader } from '@/components/ui/card.jsx'
import { Smartphone, ArrowRightLeft, Wifi } from 'lucide-react'
import logo from './assets/limobile_logo_2.png'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('login') // 'login', 'dashboard', 'transfer', 'forfait'
  const [phoneNumber, setPhoneNumber] = useState('')
  const [pin, setPin] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userBalance, setUserBalance] = useState({
    airtel: 1000,
    moov: 500
  })
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'forfait', description: 'Forfait d\'appel', amount: -200, date: '22 avril 2024' },
    { id: 2, type: 'transfer', description: 'Transfert de crédit', amount: -500, date: '21 avril 2024' },
    { id: 3, type: 'forfait', description: 'Forfait internet', amount: -300, date: '20 avril 2024' }
  ])

  const handleLogin = () => {
    // Simplification pour le MVP - accepter toute saisie non vide
    if (phoneNumber.trim() && pin.trim()) {
      setIsLoggedIn(true)
      setCurrentScreen('dashboard')
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
          <p className="text-gray-600 mt-2">Le transfert simple et rapide</p>
        </CardHeader>
        <CardContent className="space-y-6">
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
            <label className="text-sm font-medium text-gray-700">Code PIN</label>
            <Input
              type="password"
              placeholder="••••"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="rounded-xl text-center text-lg tracking-widest"
            />
          </div>
          <Button 
            onClick={handleLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 text-lg font-medium"
            disabled={!phoneNumber || pin.length !== 4}
          >
            Se connecter
          </Button>
          <Button 
            onClick={() => {
              setPhoneNumber('+22790123456')
              setPin('1234')
              setIsLoggedIn(true)
              setCurrentScreen('dashboard')
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 text-lg font-medium"
          >
            Demo (Test)
          </Button>
          <div className="text-center">
            <button className="text-green-600 hover:text-green-700 font-medium">
              Créer un compte
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const DashboardScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <img src={logo} alt="LiMobile" className="h-8 w-auto" />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setIsLoggedIn(false)
                setCurrentScreen('login')
                setPhoneNumber('')
                setPin('')
              }}
              className="text-gray-600"
            >
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Soldes */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Mes soldes</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <div className="text-red-600 font-bold text-sm mb-1">AIRTEL</div>
                <div className="text-2xl font-bold text-gray-800">{userBalance.airtel} F</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <div className="text-orange-600 font-bold text-sm mb-1">MOOV</div>
                <div className="text-2xl font-bold text-gray-800">{userBalance.moov} F</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions principales */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={() => setCurrentScreen('transfer')}
            className="h-24 bg-green-600 hover:bg-green-700 text-white rounded-xl flex flex-col items-center justify-center space-y-2"
          >
            <ArrowRightLeft className="h-6 w-6" />
            <span className="text-sm font-medium">Transférer du crédit</span>
          </Button>
          <Button 
            onClick={() => setCurrentScreen('forfait')}
            className="h-24 bg-green-600 hover:bg-green-700 text-white rounded-xl flex flex-col items-center justify-center space-y-2"
          >
            <Wifi className="h-6 w-6" />
            <span className="text-sm font-medium">Acheter un forfait</span>
          </Button>
        </div>

        {/* Historique */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Historique</h3>
              <Button variant="ghost" size="sm" className="text-green-600">
                Voir tout
              </Button>
            </div>
            <div className="space-y-3">
              {transactions.slice(0, 3).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-2">
                  <div>
                    <div className="font-medium text-gray-800">{transaction.description}</div>
                    <div className="text-sm text-gray-500">{transaction.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-800">{transaction.amount} F</div>
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
    const [sourceOperator, setSourceOperator] = useState("Airtel")
    const [destinationNumber, setDestinationNumber] = useState("")
    const [amount, setAmount] = useState("")

    const handleTransfer = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/credit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source_operator: sourceOperator,
            destination_number: destinationNumber,
            amount: parseInt(amount),
          }),
        })
        const data = await response.json()
        if (data.status === "success") {
          alert(data.message)
          setCurrentScreen("dashboard")
        } else {
          alert("Erreur: " + data.message)
        }
      } catch (error) {
        console.error("Erreur lors du transfert:", error)
        alert("Une erreur est survenue lors du transfert.")
      }
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentScreen("dashboard")}
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
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Opérateur source</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-xl bg-white"
                  value={sourceOperator}
                  onChange={(e) => setSourceOperator(e.target.value)}
                >
                  <option>Airtel (1000 F disponible)</option>
                  <option>Moov (500 F disponible)</option>
                </select>
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
              >
                Continuer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const ForfaitScreen = () => {
    const [operator, setOperator] = useState("Airtel")
    const [beneficiaryNumber, setBeneficiaryNumber] = useState("")
    const [forfaitType, setForfaitType] = useState("")

    const handleBuyForfait = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/forfait", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            operator: operator,
            beneficiary_number: beneficiaryNumber,
            forfait_type: forfaitType,
          }),
        })
        const data = await response.json()
        if (data.status === "success") {
          alert(data.message)
          setCurrentScreen("dashboard")
        } else {
          alert("Erreur: " + data.message)
        }
      } catch (error) {
        console.error("Erreur lors de l\"achat de forfait:", error)
        alert("Une erreur est survenue lors de l\"achat de forfait.")
      }
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCurrentScreen("dashboard")}
                className="text-gray-600"
              >
                ← Retour
              </Button>
              <h1 className="text-lg font-semibold">Acheter un forfait</h1>
              <div></div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Opérateur</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-xl bg-white"
                  value={operator}
                  onChange={(e) => setOperator(e.target.value)}
                >
                  <option>Airtel</option>
                  <option>Moov</option>
                </select>
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
                <label className="text-sm font-medium text-gray-700">Type de forfait</label>
                <div className="space-y-2">
                  <Card 
                    className={`p-4 border ${forfaitType === "Forfait Jour - 100Mo" ? "border-green-600 bg-green-50" : "border-gray-200"}`}
                    onClick={() => setForfaitType("Forfait Jour - 100Mo")}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Forfait Jour - 100Mo</div>
                        <div className="text-sm text-gray-600">Valable 24h</div>
                      </div>
                      <div className="font-bold text-green-600">100F</div>
                    </div>
                  </Card>
                  <Card 
                    className={`p-4 border ${forfaitType === "Forfait Semaine - 500Mo" ? "border-green-600 bg-green-50" : "border-gray-200"}`}
                    onClick={() => setForfaitType("Forfait Semaine - 500Mo")}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Forfait Semaine - 500Mo</div>
                        <div className="text-sm text-gray-600">Valable 7 jours</div>
                      </div>
                      <div className="font-bold">500F</div>
                    </div>
                  </Card>
                  <Card 
                    className={`p-4 border ${forfaitType === "Forfait Mois - 2.5Go" ? "border-green-600 bg-green-50" : "border-gray-200"}`}
                    onClick={() => setForfaitType("Forfait Mois - 2.5Go")}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Forfait Mois - 2.5Go</div>
                        <div className="text-sm text-gray-600">Valable 30 jours</div>
                      </div>
                      <div className="font-bold">2000F</div>
                    </div>
                  </Card>
                </div>
              </div>

              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3"
                onClick={handleBuyForfait}
              >
                Acheter le forfait
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  switch (currentScreen) {
    case 'login':
      return <LoginScreen />
    case 'dashboard':
      return <DashboardScreen />
    case 'transfer':
      return <TransferScreen />
    case 'forfait':
      return <ForfaitScreen />
    default:
      return <LoginScreen />
  }
}

export default App


