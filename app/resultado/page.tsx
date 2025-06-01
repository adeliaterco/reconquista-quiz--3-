"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Gift, Star, Shield, ArrowRight, Check, Clock, AlertTriangle, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CountdownTimer } from "@/components/countdown-timer"
import { bonuses, getPersonalizedContent } from "@/lib/quiz-data"
import { enviarEvento } from '../../lib/analytics'

export default function ResultPage() {
  const [unlockedBonuses, setUnlockedBonuses] = useState<number[]>([])
  const [totalValue, setTotalValue] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [recentBuyers, setRecentBuyers] = useState(3)
  const [userGender, setUserGender] = useState<string>("")

  useEffect(() => {
    const savedBonuses = localStorage.getItem("unlockedBonuses")
    const savedValue = localStorage.getItem("totalValue")
    const savedGender = localStorage.getItem("userGender")

    if (savedBonuses) setUnlockedBonuses(JSON.parse(savedBonuses))
    if (savedValue) setTotalValue(Number.parseInt(savedValue))
    if (savedGender) setUserGender(savedGender)

    setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    // Simulate recent buyers
    const interval = setInterval(() => {
      setRecentBuyers((prev) => Math.min(prev + 1, 17))
    }, 30000)

    // Registra visualização da página de resultado
    try {
      enviarEvento('visualizou_resultado');
      console.log('Evento de visualização registrado com sucesso');
    } catch (error) {
      console.error('Erro ao registrar evento de visualização:', error);
    }

    return () => clearInterval(interval)
  }, [])

  const handlePurchase = () => {
    window.open("https://pay.cakto.com.br/ko6ftx6_410912", "_blank")
  }

  const getPersonalizedTitle = () => {
    if (userGender === "MASCULINO") {
      return "DE REJEITADO A DESEJADO"
    } else if (userGender === "FEMININO") {
      return "DE REJEITADA A DESEJADA"
    }
    return "DE REJEITADO(A) A DESEJADO(A)"
  }

  const getPersonalizedCTA = () => {
    if (userGender === "MASCULINO") {
      return "RECONQUISTAR ELA AGORA"
    } else if (userGender === "FEMININO") {
      return "RECONQUISTAR ELE AGORA"
    }
    return "RECONQUISTAR AGORA"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{getPersonalizedTitle()}</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-orange-400 mb-8">EM 21 DIAS OU MENOS</h2>

          <div className="max-w-4xl mx-auto mb-12">
            <Card className="bg-gray-50 border-2 border-gray-300 overflow-hidden">
              <CardContent className="p-8 text-center">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 1, -1, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="w-full h-64 rounded-lg overflow-hidden mb-4 shadow-lg"
                >
                  <img
                    src="https://optimalhealthscout.shop/wp-content/uploads/2025/05/DEFINITIVA-antes-depois-plano.png"
                    alt="Transformação Antes e Depois"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <p className="text-gray-600 font-medium">A transformação real que você pode alcançar com o método</p>
                <div className="mt-8 relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/30 to-red-600/30 blur-2xl animate-pulse"></div>
                  <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/15 to-pink-500/15 blur-lg animate-pulse"
                    style={{ animationDelay: "2s" }}
                  ></div>

                  <motion.div
                    animate={{
                      y: [0, -12, 0],
                      scale: [1, 1.02, 1],
                      rotate: [0, 0.8, -0.8, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="relative z-10 bg-white rounded-xl p-3 shadow-2xl border-2 border-orange-400"
                  >
                    <img
                      src="https://optimalhealthscout.shop/wp-content/uploads/2025/05/500151711_949235423852094_7663597077093180780_n.jpg"
                      alt="Resultado Real de Transformação"
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-3 h-3 rounded-full opacity-60 ${
                        i % 3 === 0 ? "bg-orange-400" : i % 3 === 1 ? "bg-yellow-400" : "bg-red-400"
                      }`}
                      animate={{
                        x: [0, Math.random() * 120 - 60, 0],
                        y: [0, Math.random() * 120 - 60, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [0.5, 1.8, 0.5],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.4,
                      }}
                      style={{
                        left: `${15 + Math.random() * 70}%`,
                        top: `${15 + Math.random() * 70}%`,
                      }}
                    />
                  ))}
                </div>
              </CardContent>
              <div className="max-w-4xl mx-auto mb-12">
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    scale: [1, 1.01, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="rounded-lg overflow-hidden shadow-2xl"
                >
                  <img
                    src="https://optimalhealthscout.shop/wp-content/uploads/2025/05/imagem_gerada-2025-05-30T002615.171.png"
                    alt="Oferta Especial Plano A"
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Oferta Principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-2xl border-4 border-yellow-400">
            <CardContent className="p-8 text-center">
              <div className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-full inline-block mb-6">
                🔥 OFERTA LIMITADA - APENAS HOJE
              </div>

              <h3 className="text-3xl md:text-5xl font-bold mb-4">PLANO A - RECONQUISTA RÁPIDA</h3>

              <p className="text-xl md:text-2xl mb-6 font-semibold">
                O Sistema Completo que Já Reconquistou Mais de 3.847 Relacionamentos
              </p>

              <div className="bg-white/20 rounded-lg p-6 mb-6">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-yellow-300">21 DIAS</div>
                    <div className="text-sm">Prazo máximo</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-300">97%</div>
                    <div className="text-sm">Taxa de sucesso</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-300">3.847</div>
                    <div className="text-sm">Pessoas ajudadas</div>
                  </div>
                </div>
              </div>

              {/* Botão de Compra na Oferta - Personalizado */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Button
                  onClick={handlePurchase}
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-6 rounded-full text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-4 w-full sm:w-auto"
                >
                  {getPersonalizedCTA()}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
              <p className="text-yellow-200 text-sm">✅ Acesso imediato • 💳 Parcelamento disponível</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* O QUE VOCÊ VAI RECEBER - MÓDULO ÚNICO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-8">O QUE VOCÊ VAI RECEBER:</h3>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-orange-500 shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-6">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-orange-400">PLANO A - RECONQUISTA RÁPIDA</h4>
                    <p className="text-orange-300 font-semibold text-lg">Sistema Completo de Reconquista</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-xl font-bold text-orange-200 mb-4">📚 CONTEÚDO PRINCIPAL:</h5>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>✅ Sistema completo de 21 dias passo-a-passo</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>✅ 7 Pilares da Presença Irresistível</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>✅ 21 Gatilhos Emocionais Infalíveis</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>✅ Protocolo de 72 horas para casos urgentes</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>✅ Estratégias para cada tipo de término</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>✅ Como sair da friendzone definitivamente</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xl font-bold text-orange-200 mb-4">🎯 INCLUI TAMBÉM:</h5>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>📱 Acesso pelo celular, tablet ou computador</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>✅ Atualizações gratuitas vitalícias</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-3" />
                        <span>✅ Suporte prioritário por 30 dias</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <div className="text-4xl font-bold text-orange-400">VALOR TOTAL: R$ 297</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Bonuses Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-2">+ 5 BÔNUS EXCLUSIVOS</h3>
          <p className="text-orange-400 text-center font-semibold mb-8 text-xl">
            (Você desbloqueou {unlockedBonuses.length} de 5 no quiz!)
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bonuses.map((bonus, index) => (
              <motion.div
                key={bonus.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card
                  className={`h-full ${
                    unlockedBonuses.includes(bonus.id)
                      ? "bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 shadow-lg"
                      : "bg-gray-50 border border-gray-300"
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                        unlockedBonuses.includes(bonus.id) ? "bg-green-500" : "bg-gray-400"
                      }`}
                    >
                      {unlockedBonuses.includes(bonus.id) ? (
                        <Check className="w-8 h-8 text-white" />
                      ) : (
                        <Gift className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">BÔNUS #{bonus.id}</h4>
                    <p className="text-sm text-gray-700 mb-3">{getPersonalizedContent(bonus.title, userGender)}</p>
                    <div className="text-2xl font-bold text-green-600">R$ {bonus.value}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Seção de Preço */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-black to-gray-900 text-white shadow-2xl border-4 border-yellow-500">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="text-red-400 text-2xl font-bold mb-2">
                  <span className="line-through">VALOR TOTAL: R$ 297</span>
                </div>
                <div className="text-6xl font-bold text-yellow-400 mb-2">R$ 37</div>
                <div className="text-2xl text-orange-400 font-bold">OU 3x DE R$ 12,33</div>
              </div>

              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 px-6 rounded-lg inline-block mb-4">
                💰 ECONOMIA DE R$ 260 HOJE!
              </div>

              <p className="text-lg mb-6">Menos que o preço de um lanche no shopping!</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Adicional após preço - Personalizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.7 }}
          className="mb-8 text-center"
        >
          <EmailCapture />
          <Button
            onClick={handlePurchase}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            GARANTIR VAGA
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-gray-400 text-sm mt-2">Clique aqui para ir direto ao checkout seguro</p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <Card className="bg-red-600 text-white border-4 border-yellow-400">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <AlertTriangle className="w-8 h-8 text-yellow-300" />
                <h3 className="text-2xl md:text-3xl font-bold">OFERTA EXPIRA EM:</h3>
              </div>
              <CountdownTimer />
              <p className="text-xl font-bold mt-4 text-yellow-300">Depois disso, volta ao preço normal de R$ 297!</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Principal - Personalizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 1.0 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl border-4 border-yellow-400">
            <CardContent className="p-8 text-center">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Button
                  onClick={handlePurchase}
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-5 px-8 rounded-full text-xl md:text-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-6 w-full sm:w-auto"
                >
                  {getPersonalizedCTA()}
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </motion.div>

              <div className="space-y-3">
                <p className="text-xl font-semibold">✅ Acesso imediato após o pagamento</p>
                <p className="text-lg">💳 Parcelamento em até 3x sem juros</p>
                <p className="text-lg">🔒 Compra 100% segura e protegida</p>
                <p className="text-lg">🎯 Garantia de 30 dias ou seu dinheiro de volta</p>
              </div>

              {recentBuyers > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="mt-6 bg-red-500 text-white py-2 px-4 rounded-full inline-block"
                >
                  🔥 {recentBuyers} pessoas compraram nas últimas 2 horas!
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Garantias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 1.2 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-8">SUAS GARANTIAS:</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-green-50 border-2 border-green-300">
              <CardContent className="p-6 text-center">
                <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-green-800 mb-2">GARANTIA #1</h4>
                <p className="text-green-700 font-semibold">Resultados em 7 dias ou devolução integral</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-2 border-blue-300">
              <CardContent className="p-6 text-center">
                <Star className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-blue-800 mb-2">GARANTIA #2</h4>
                <p className="text-blue-700 font-semibold">Suporte prioritário 24/7</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-2 border-purple-300">
              <CardContent className="p-6 text-center">
                <Clock className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-purple-800 mb-2">GARANTIA #3</h4>
                <p className="text-purple-700 font-semibold">30 dias sem questionamentos</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Depoimentos - Substituído por uma única imagem flutuante */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 1.4 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-8">RESULTADOS REAIS:</h3>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-50 border-2 border-gray-300 overflow-hidden">
              <CardContent className="p-6 text-center">
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 1, -1, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="w-full rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src="https://optimalhealthscout.shop/wp-content/uploads/2025/05/02-depoimento-1.png"
                    alt="Depoimento de Cliente"
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
                <p className="text-gray-600 font-medium mt-4">
                  Veja o que nossos clientes estão dizendo sobre os resultados!
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* CTA Final - Personalizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 1.6 }}
          className="mb-12 text-center"
        >
          <Button
            onClick={handlePurchase}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            COMPRAR AGORA
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-red-400 text-sm mt-2 font-semibold">⚠️ Esta oferta expira em breve!</p>
        </motion.div>
      </div>
    </div>
  )
}

// Componente de captura de email
function EmailCapture() {
  const handleSubmitEmail = (email: string) => {
    try {
      enviarEvento('capturou_lead', {
        tipo_captura: 'email'
      });
      console.log('Evento de captura de lead registrado com sucesso');
      
      // Seu código para processar o email
    } catch (error) {
      console.error('Erro ao registrar evento de captura de lead:', error);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const emailInput = e.currentTarget.querySelector('input[type="email"]') as HTMLInputElement;
      if (emailInput && emailInput.value) {
        handleSubmitEmail(emailInput.value);
      }
    }}>
      <input type="email" placeholder="Seu melhor email" required className="mb-4 p-2 border rounded"/>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Receber resultados</button>
    </form>
  );
}
