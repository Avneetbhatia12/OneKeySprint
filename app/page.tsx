// /*eslint-disable*/
// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Users, Trophy, Timer, Zap, Play, RotateCcw, Medal, Crown } from "lucide-react"

// type GameState = "setup" | "playing" | "results"
// type GamePhase = "waiting" | "countdown" | "go" | "finished"
// type Player = {
//   name: string
//   time?: number
//   accuracy?: number
// }

// export default function SprintGame() {
//   const [gameState, setGameState] = useState<GameState>("setup")
//   const [gamePhase, setGamePhase] = useState<GamePhase>("waiting")
//   const [players, setPlayers] = useState<Player[]>([])
//   const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
//   const [newPlayerName, setNewPlayerName] = useState("")

//   const [startTime, setStartTime] = useState<number>(0)
//   const [playerTime, setPlayerTime] = useState<number>(0)
//   const [countdown, setCountdown] = useState<number>(0)
//   const [isListening, setIsListening] = useState<boolean>(false)

//   const handleKeyPress = useCallback(
//     (event: KeyboardEvent) => {
//       if (event.code === "Space" && isListening && gamePhase === "go") {
//         event.preventDefault()
//         const endTime = Date.now()
//         const timeTaken = endTime - startTime
//         setPlayerTime(timeTaken)
//         setGamePhase("finished")
//         setIsListening(false)

//         // Update current player's time
//         const updatedPlayers = [...players]
//         updatedPlayers[currentPlayerIndex] = {
//           ...updatedPlayers[currentPlayerIndex],
//           time: timeTaken,
//           accuracy: Math.abs(5000 - timeTaken),
//         }
//         setPlayers(updatedPlayers)
//       }
//     },
//     [isListening, gamePhase, startTime, players, currentPlayerIndex],
//   )

//   useEffect(() => {
//     if (gameState === "playing") {
//       window.addEventListener("keydown", handleKeyPress)
//       return () => window.removeEventListener("keydown", handleKeyPress)
//     }
//   }, [gameState, handleKeyPress])

//   const startPlayerTurn = () => {
//     setGamePhase("countdown")
//     setCountdown(3)

//     const countdownInterval = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev <= 1) {
//           clearInterval(countdownInterval)
//           setStartTime(Date.now())
//           setGamePhase("go")
//           setIsListening(true)
//           return 0
//         }
//         return prev - 1
//       })
//     }, 1000)
//   }

//   const nextPlayer = () => {
//     if (currentPlayerIndex < players.length - 1) {
//       setCurrentPlayerIndex(currentPlayerIndex + 1)
//       setGamePhase("waiting")
//       setPlayerTime(0)
//     } else {
//       setGameState("results")
//     }
//   }

 
// const restartGame = () => {
//   setGameState("setup")   // back to player entry
//   setPlayers([])          // clear all players
//   setCurrentPlayerIndex(0)
//   setPlayerTime(0)
//   setStartTime(0)
//   setCountdown(0)
//   setIsListening(false)
  
// }



//   const addPlayer = () => {
//     if (newPlayerName.trim() && players.length < 8) {
//       setPlayers([...players, { name: newPlayerName.trim() }])
//       setNewPlayerName("")
//     }
//   }

//   const removePlayer = (index: number) => {
//     setPlayers(players.filter((_, i) => i !== index))
//   }

 
//   const startGame = () => {
//   if (players.length >= 2) {
//     // hard reset for a brand-new run
//     setCurrentPlayerIndex(0)
//     setPlayerTime(0)
//     setStartTime(0)
//     setCountdown(0)
//     setIsListening(false)

//     setGamePhase("waiting")   
//     setGameState("playing")
//   }
// }


//   if (gameState === "playing") {
//     const currentPlayer = players[currentPlayerIndex]

//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-4">
//         <div className="w-full max-w-4xl space-y-4 sm:space-y-8">
//           {/* Game Header */}
//           <div className="text-center space-y-2 sm:space-y-4">
//             <h1 className="text-2xl sm:text-4xl font-black text-foreground">SPRINT CHALLENGE</h1>
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
//               <Badge variant="outline" className="text-sm sm:text-lg px-2 sm:px-4 py-1 sm:py-2">
//                 Player {currentPlayerIndex + 1} of {players.length}
//               </Badge>
//               <Badge
//                 variant="secondary"
//                 className="text-sm sm:text-lg px-2 sm:px-4 py-1 sm:py-2 max-w-[200px] sm:max-w-[300px]"
//               >
//                 <span className="truncate">{currentPlayer.name}</span>
//               </Badge>
//             </div>
//           </div>

//           {/* Game Area */}
//           <Card className="border-2 sm:border-4 border-primary/30 shadow-2xl">
//             <CardContent className="p-4 sm:p-12">
//               <div className="text-center space-y-4 sm:space-y-8">
//                 {gamePhase === "waiting" && (
//                   <div className="space-y-4 sm:space-y-6">
//                     <div className="text-3xl sm:text-6xl font-black text-primary mb-2 sm:mb-4 break-words px-2">
//                       <span className="inline-block max-w-full">{currentPlayer.name}</span>'s Turn
//                     </div>
//                     <p className="text-base sm:text-xl text-muted-foreground mb-4 sm:mb-8 px-2">
//                       Get ready! Press SPACEBAR exactly 5 seconds after "GO!" appears
//                     </p>
//                     <Button
//                       onClick={startPlayerTurn}
//                       size="lg"
//                       className="text-lg sm:text-2xl font-black py-4 sm:py-8 px-6 sm:px-12 bg-primary hover:bg-primary/90"
//                     >
//                       <Play className="h-4 w-4 sm:h-8 sm:w-8 mr-2 sm:mr-4" />
//                       Start Turn
//                     </Button>
//                   </div>
//                 )}

//                 {gamePhase === "countdown" && countdown > 0 && (
//                   <div className="space-y-4 sm:space-y-6">
//                     <div className="text-6xl sm:text-8xl font-black text-accent animate-pulse">{countdown}</div>
//                     <p className="text-lg sm:text-xl text-muted-foreground">Get ready...</p>
//                   </div>
//                 )}

//                 {gamePhase === "go" && (
//                   <div className="space-y-4 sm:space-y-6">
//                     <div className="text-7xl sm:text-9xl font-black text-destructive animate-bounce">GO!</div>
//                     <p className="text-xl sm:text-2xl font-bold text-destructive animate-pulse">PRESS SPACEBAR NOW!</p>
//                     <div className="text-base sm:text-lg text-muted-foreground">Target: 5000ms exactly</div>
//                   </div>
//                 )}

//                 {gamePhase === "finished" && (
//                   <div className="space-y-4 sm:space-y-6">
//                     <div className="text-4xl sm:text-6xl font-black text-primary">Time's Up!</div>
//                     <div className="space-y-2 sm:space-y-4">
//                       <div className="text-3xl sm:text-4xl font-bold">{playerTime}ms</div>
//                       <div className="text-lg sm:text-xl">Accuracy: {Math.abs(5000 - playerTime)}ms off target</div>
//                     </div>
//                     <Button
//                       onClick={nextPlayer}
//                       size="lg"
//                       className="text-lg sm:text-xl font-black py-4 sm:py-6 px-6 sm:px-8"
//                     >
//                       {currentPlayerIndex < players.length - 1 ? "Next Player" : "View Results"}
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Progress Bar */}
//           <div className="space-y-2">
//             <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
//               <span>Progress</span>
//               <span>
//                 {currentPlayerIndex + 1} / {players.length}
//               </span>
//             </div>
//             <Progress
//               value={((currentPlayerIndex + (gamePhase === "finished" ? 1 : 0)) / players.length) * 100}
//               className="h-2 sm:h-3"
//             />
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (gameState === "setup") {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-4">
//         <div className="w-full max-w-2xl space-y-4 sm:space-y-8">
//           {/* Header */}
//           <div className="text-center space-y-2 sm:space-y-4">
//             <div className="flex items-center justify-center gap-2 sm:gap-3">
//               <Zap className="h-8 w-8 sm:h-12 sm:w-12 text-primary" />
//               <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight">SPRINT</h1>
//             </div>
//             <p className="text-lg sm:text-xl text-muted-foreground font-medium">The Ultimate Timing Challenge</p>
//             <Badge variant="secondary" className="text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2">
//               <Timer className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
//               Hit 5000ms Exactly!
//             </Badge>
//           </div>

//           {/* Player Setup Card */}
//           <Card className="border-2 border-primary/20 shadow-xl">
//             <CardHeader className="text-center">
//               <CardTitle className="text-2xl sm:text-3xl font-black flex items-center justify-center gap-2">
//                 <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
//                 Player Setup
//               </CardTitle>
//               <CardDescription className="text-base sm:text-lg">
//                 Add 2-8 players to start the competition
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4 sm:space-y-6">
//               {/* Add Player Input */}
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <Input
//                   placeholder="Enter player name..."
//                   value={newPlayerName}
//                   onChange={(e) => setNewPlayerName(e.target.value)}
//                   onKeyPress={(e) => e.key === "Enter" && addPlayer()}
//                   className="text-base sm:text-lg h-10 sm:h-12 border-2 focus:border-primary"
//                   maxLength={20}
//                 />
//                 <Button
//                   onClick={addPlayer}
//                   disabled={!newPlayerName.trim() || players.length >= 8}
//                   size="lg"
//                   className="px-6 sm:px-8 font-bold w-full sm:w-auto"
//                 >
//                   Add Player
//                 </Button>
//               </div>

//               {/* Players List */}
//               {players.length > 0 && (
//                 <div className="space-y-3">
//                   <h3 className="text-lg sm:text-xl font-bold text-foreground">Players ({players.length}/8)</h3>
//                   <div className="grid gap-3">
//                     {players.map((player, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center justify-between p-3 sm:p-4 bg-card border-2 border-border rounded-lg hover:border-primary/50 transition-colors gap-2"
//                       >
//                         <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
//                           <Badge variant="outline" className="font-bold text-xs sm:text-sm flex-shrink-0">
//                             {index + 1}
//                           </Badge>
//                           <span className="text-sm sm:text-lg font-semibold text-card-foreground truncate max-w-[120px] sm:max-w-none">
//                             {player.name}
//                           </span>
//                         </div>
//                         <Button
//                           variant="destructive"
//                           size="sm"
//                           onClick={() => removePlayer(index)}
//                           className="font-bold text-xs sm:text-sm flex-shrink-0"
//                         >
//                           Remove
//                         </Button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Start Game Button */}
//               <div className="pt-2 sm:pt-4">
//                 <Button
//                   onClick={startGame}
//                   disabled={players.length < 2}
//                   size="lg"
//                   className="w-full text-base sm:text-xl font-black py-4 sm:py-6 bg-primary hover:bg-primary/90"
//                 >
//                   <Trophy className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
//                   <div className="flex flex-col sm:flex-row items-center gap-0 sm:gap-2">
//                     <span>Start Sprint Challenge</span>
//                     {players.length < 2 && <span className="text-xs sm:text-sm opacity-75">(Need 2+ players)</span>}
//                   </div>
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Game Rules */}
//           <Card className="bg-muted/50 border-accent/30">
//             <CardContent className="pt-4 sm:pt-6">
//               <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
//                 <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
//                 How to Play
//               </h3>
//               <div className="space-y-1 sm:space-y-2 text-sm sm:text-base text-muted-foreground">
//                 <p>• Wait for the "GO!" signal to appear</p>
//                 <p>• Press SPACEBAR exactly after 5000ms (5 seconds)</p>
//                 <p>• The player closest to 5000ms wins!</p>
//                 <p>• Each player gets one turn</p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     )
//   }

//   if (gameState === "results") {
//     // Sort players by accuracy (closest to 5000ms wins)
//     const sortedPlayers = [...players]
//       .filter((player) => player.time !== undefined)
//       .sort((a, b) => (a.accuracy || Number.POSITIVE_INFINITY) - (b.accuracy || Number.POSITIVE_INFINITY))

//     const winner = sortedPlayers[0]


//     const getRankIcon = (index: number) => {
//       switch (index) {
//         case 0:
//           return <Crown className="h-6 w-6 text-yellow-500" />
//         case 1:
//           return <Medal className="h-6 w-6 text-gray-400" />
//         case 2:
//           return <Medal className="h-6 w-6 text-amber-600" />
//         default:
//           return <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
//       }
//     }

//     const getRankColor = (index: number) => {
//       switch (index) {
//         case 0:
//           return "border-yellow-500/50 bg-yellow-500/10"
//         case 1:
//           return "border-gray-400/50 bg-gray-400/10"
//         case 2:
//           return "border-amber-600/50 bg-amber-600/10"
//         default:
//           return "border-border bg-card"
//       }
//     }

//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-4">
//         <div className="w-full max-w-4xl space-y-4 sm:space-y-8">
//           {/* Winner Announcement */}
//           <div className="text-center space-y-4 sm:space-y-6">
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
//               <Trophy className="h-12 w-12 sm:h-16 sm:w-16 text-yellow-500" />
//               <div>
//                 <h1 className="text-4xl sm:text-6xl font-black text-foreground">WINNER!</h1>
//                 <p className="text-2xl sm:text-3xl font-bold text-primary mt-1 sm:mt-2">{winner.name}</p>
//               </div>
//               <Trophy className="h-12 w-12 sm:h-16 sm:w-16 text-yellow-500" />
//             </div>
//           </div>

//           {/* Leaderboard */}
//           <Card className="border-2 border-primary/20 shadow-xl">
//             <CardHeader className="text-center">
//               <CardTitle className="text-2xl sm:text-3xl font-black flex flex-col sm:flex-row items-center justify-center gap-2">
//                 <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
//                 Final Leaderboard
//               </CardTitle>
//               <CardDescription className="text-base sm:text-lg">Ranked by accuracy to 5000ms target</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3 sm:space-y-4">
//               {sortedPlayers.map((player, index) => (
//                 <div
//                   key={player.name}
//                   className={`flex items-center justify-between p-4 sm:p-6 rounded-lg border-2 transition-all hover:scale-[1.02] ${getRankColor(index)}`}
//                 >
//                   <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
//                     <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
//                       {getRankIcon(index)}
//                     </div>
//                     <div className="min-w-0 flex-1">
//                       <h3 className="text-lg sm:text-xl font-bold text-foreground truncate">{player.name}</h3>
//                       <p className="text-xs sm:text-sm text-muted-foreground">
//                         {index === 0
//                           ? "Champion"
//                           : index === 1
//                             ? "Runner-up"
//                             : index === 2
//                               ? "Third place"
//                               : `${index + 1}th place`}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="text-right space-y-1 flex-shrink-0">
//                     <div className="text-xl sm:text-2xl font-bold text-foreground">{player.time}ms</div>
//                     <div className="text-xs sm:text-sm text-muted-foreground">{player.accuracy}ms off target</div>
//                     <Badge variant={index === 0 ? "default" : "secondary"} className="text-xs">
//                       {player.accuracy! <= 50
//                         ? "Perfect"
//                         : player.accuracy! <= 100
//                           ? "Excellent"
//                           : player.accuracy! <= 250
//                             ? "Good"
//                             : player.accuracy! <= 500
//                               ? "Fair"
//                               : "Try again"}
//                     </Badge>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
//             <Button
//               onClick={restartGame}
//               size="lg"
//               variant="outline"
//               className="text-lg sm:text-xl font-black py-4 sm:py-6 px-6 sm:px-8 bg-transparent w-full sm:w-auto"
//             >
//               <RotateCcw className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
//               Play Again
//             </Button>
//             <Button
//               onClick={() => {
//                 setGameState("setup")
//                 setPlayers([])
//                 setCurrentPlayerIndex(0)
//               }}
//               size="lg"
//               className="text-lg sm:text-xl font-black py-4 sm:py-6 px-6 sm:px-8 bg-primary hover:bg-primary/90 w-full sm:w-auto"
//             >
//               <Users className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
//               New Game
//             </Button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center">
//       <p className="text-2xl font-bold">Game State: {gameState}</p>
//     </div>
//   )
// }
"use client"
/*eslint-disable*/
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Trophy, Timer, Zap, Play, RotateCcw, Medal, Crown } from "lucide-react"

type GameState = "setup" | "playing" | "results"
type GamePhase = "waiting" | "countdown" | "go" | "finished"
type Player = {
  name: string
  time?: number
  accuracy?: number
}

export default function SprintGame() {
  const [gameState, setGameState] = useState<GameState>("setup")
  const [gamePhase, setGamePhase] = useState<GamePhase>("waiting")
  const [players, setPlayers] = useState<Player[]>([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [newPlayerName, setNewPlayerName] = useState("")

  const [startTime, setStartTime] = useState<number>(0)
  const [playerTime, setPlayerTime] = useState<number>(0)
  const [countdown, setCountdown] = useState<number>(0)
  const [isListening, setIsListening] = useState<boolean>(false)

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Space" && isListening && gamePhase === "go") {
        event.preventDefault()
        const endTime = Date.now()
        const timeTaken = endTime - startTime
        setPlayerTime(timeTaken)
        setGamePhase("finished")
        setIsListening(false)

        // Update current player's time
        const updatedPlayers = [...players]
        updatedPlayers[currentPlayerIndex] = {
          ...updatedPlayers[currentPlayerIndex],
          time: timeTaken,
          accuracy: Math.abs(5000 - timeTaken),
        }
        setPlayers(updatedPlayers)
      }
    },
    [isListening, gamePhase, startTime, players, currentPlayerIndex],
  )

  const handleButtonPress = () => {
    if (isListening && gamePhase === "go") {
      const endTime = Date.now()
      const timeTaken = endTime - startTime
      setPlayerTime(timeTaken)
      setGamePhase("finished")
      setIsListening(false)

      // Update current player's time
      const updatedPlayers = [...players]
      updatedPlayers[currentPlayerIndex] = {
        ...updatedPlayers[currentPlayerIndex],
        time: timeTaken,
        accuracy: Math.abs(5000 - timeTaken),
      }
      setPlayers(updatedPlayers)
    }
  }

  useEffect(() => {
    if (gameState === "playing") {
      window.addEventListener("keydown", handleKeyPress)
      return () => window.removeEventListener("keydown", handleKeyPress)
    }
  }, [gameState, handleKeyPress])

  const startPlayerTurn = () => {
    setGamePhase("countdown")
    setCountdown(3)

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          setStartTime(Date.now())
          setGamePhase("go")
          setIsListening(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const nextPlayer = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1)
      setGamePhase("waiting")
      setPlayerTime(0)
    } else {
      setGameState("results")
    }
  }

  const restartGame = () => {
    const currentPlayers = [...players]

    setGameState("playing")
    setGamePhase("waiting")
    setCurrentPlayerIndex(0)
    setPlayers(currentPlayers.map((player) => ({ name: player.name })))
    setPlayerTime(0)
    setStartTime(0)
    setCountdown(0)
    setIsListening(false)
  }

  const addPlayer = () => {
    if (newPlayerName.trim() && players.length < 8) {
      setPlayers([...players, { name: newPlayerName.trim() }])
      setNewPlayerName("")
    }
  }

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index))
  }

  const startGame = () => {
    if (players.length >= 2) {
      setCurrentPlayerIndex(0)
      setPlayerTime(0)
      setStartTime(0)
      setCountdown(0)
      setIsListening(false)
      setGamePhase("waiting")
      setGameState("playing")
    }
  }

  if (gameState === "playing") {
    const currentPlayer = players[currentPlayerIndex]

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-4">
        <div className="w-full max-w-4xl space-y-4 sm:space-y-8">
          {/* Game Header */}
          <div className="text-center space-y-2 sm:space-y-4">
            <h1 className="text-2xl sm:text-4xl font-black text-foreground">SPRINT CHALLENGE</h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <Badge variant="outline" className="text-sm sm:text-lg px-2 sm:px-4 py-1 sm:py-2">
                Player {currentPlayerIndex + 1} of {players.length}
              </Badge>
              <Badge
                variant="secondary"
                className="text-sm sm:text-lg px-2 sm:px-4 py-1 sm:py-2 max-w-[200px] sm:max-w-[300px]"
              >
                <span className="truncate">{currentPlayer.name}</span>
              </Badge>
            </div>
          </div>

          {/* Game Area */}
          <Card className="border-2 sm:border-4 border-primary/30 shadow-2xl">
            <CardContent className="p-4 sm:p-12">
              <div className="text-center space-y-4 sm:space-y-8">
                {gamePhase === "waiting" && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-3xl sm:text-6xl font-black text-primary mb-2 sm:mb-4 break-words px-2">
                      <span className="inline-block max-w-full">{currentPlayer.name}</span>'s Turn
                    </div>
                    <p className="text-base sm:text-xl text-muted-foreground mb-4 sm:mb-8 px-2">
                      Get ready! Press SPACEBAR exactly 5 seconds after "GO!" appears
                    </p>
                    <Button
                      onClick={startPlayerTurn}
                      size="lg"
                      className="text-lg sm:text-2xl font-black py-4 sm:py-8 px-6 sm:px-12 bg-primary hover:bg-primary/90"
                    >
                      <Play className="h-4 w-4 sm:h-8 sm:w-8 mr-2 sm:mr-4" />
                      Start Turn
                    </Button>
                  </div>
                )}

                {gamePhase === "countdown" && countdown > 0 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-6xl sm:text-8xl font-black text-accent animate-pulse">{countdown}</div>
                    <p className="text-lg sm:text-xl text-muted-foreground">Get ready...</p>
                  </div>
                )}

                {gamePhase === "go" && (
                  <div className="space-y-2 sm:space-y-4">
                    <div className="text-6xl sm:text-8xl font-black text-destructive animate-bounce">GO!</div>
                    <p className="text-lg sm:text-xl font-bold text-destructive animate-pulse">PRESS SPACEBAR NOW!</p>
                    <div className="text-sm sm:text-base text-muted-foreground">Target: 5000ms exactly</div>

                    <div>
                      <Button
                        onClick={handleButtonPress}
                        size="lg"
                        className="text-xl sm:text-2xl font-black py-4 sm:py-6 px-6 sm:px-10 bg-destructive hover:bg-destructive/90 text-destructive-foreground w-full sm:w-auto"
                      >
                        TAP NOW!
                      </Button>
                    </div>
                  </div>
                )}

                {gamePhase === "finished" && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-4xl sm:text-6xl font-black text-primary">Time's Up!</div>
                    <div className="space-y-2 sm:space-y-4">
                      <div className="text-3xl sm:text-4xl font-bold">{playerTime}ms</div>
                      <div className="text-lg sm:text-xl">Accuracy: {Math.abs(5000 - playerTime)}ms off target</div>
                    </div>
                    <Button
                      onClick={nextPlayer}
                      size="lg"
                      className="text-lg sm:text-xl font-black py-4 sm:py-6 px-6 sm:px-8"
                    >
                      {currentPlayerIndex < players.length - 1 ? "Next Player" : "View Results"}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
              <span>Progress</span>
              <span>
                {currentPlayerIndex + 1} / {players.length}
              </span>
            </div>
            <Progress
              value={((currentPlayerIndex + (gamePhase === "finished" ? 1 : 0)) / players.length) * 100}
              className="h-2 sm:h-3"
            />
          </div>
        </div>
      </div>
    )
  }

  if (gameState === "setup") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-4">
        <div className="w-full max-w-2xl space-y-4 sm:space-y-8">
          {/* Header */}
          <div className="text-center space-y-2 sm:space-y-4">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <Zap className="h-8 w-8 sm:h-12 sm:w-12 text-primary" />
              <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight">SPRINT</h1>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground font-medium">The Ultimate Timing Challenge</p>
            <Badge variant="secondary" className="text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2">
              <Timer className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Hit 5000ms Exactly!
            </Badge>
          </div>

          {/* Player Setup Card */}
          <Card className="border-2 border-primary/20 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl sm:text-3xl font-black flex items-center justify-center gap-2">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                Player Setup
              </CardTitle>
              <CardDescription className="text-base sm:text-lg">
                Add 2-8 players to start the competition
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Add Player Input */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Enter player name..."
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addPlayer()}
                  className="text-base sm:text-lg h-10 sm:h-12 border-2 focus:border-primary"
                  maxLength={20}
                />
                <Button
                  onClick={addPlayer}
                  disabled={!newPlayerName.trim() || players.length >= 8}
                  size="lg"
                  className="px-6 sm:px-8 font-bold w-full sm:w-auto"
                >
                  Add Player
                </Button>
              </div>

              {/* Players List */}
              {players.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">Players ({players.length}/8)</h3>
                  <div className="grid gap-3">
                    {players.map((player, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 sm:p-4 bg-card border-2 border-border rounded-lg hover:border-primary/50 transition-colors gap-2"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <Badge variant="outline" className="font-bold text-xs sm:text-sm flex-shrink-0">
                            {index + 1}
                          </Badge>
                          <span className="text-sm sm:text-lg font-semibold text-card-foreground truncate max-w-[120px] sm:max-w-none">
                            {player.name}
                          </span>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removePlayer(index)}
                          className="font-bold text-xs sm:text-sm flex-shrink-0"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Start Game Button */}
              <div className="pt-2 sm:pt-4">
                <Button
                  onClick={startGame}
                  disabled={players.length < 2}
                  size="lg"
                  className="w-full text-base sm:text-xl font-black py-4 sm:py-6 bg-primary hover:bg-primary/90"
                >
                  <Trophy className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                  <div className="flex flex-col sm:flex-row items-center gap-0 sm:gap-2">
                    <span>Start Sprint Challenge</span>
                    {players.length < 2 && <span className="text-xs sm:text-sm opacity-75">(Need 2+ players)</span>}
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Game Rules */}
          <Card className="bg-muted/50 border-accent/30">
            <CardContent className="pt-4 sm:pt-6">
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                How to Play
              </h3>
              <div className="space-y-1 sm:space-y-2 text-sm sm:text-base text-muted-foreground">
                <p>• Wait for the "GO!" signal to appear</p>
                <p>• Press SPACEBAR exactly after 5000ms (5 seconds)</p>
                <p>• The player closest to 5000ms wins!</p>
                <p>• Each player gets one turn</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (gameState === "results") {
    // Sort players by accuracy (closest to 5000ms wins)
    const sortedPlayers = [...players]
      .filter((player) => player.time !== undefined)
      .sort((a, b) => (a.accuracy || Number.POSITIVE_INFINITY) - (b.accuracy || Number.POSITIVE_INFINITY))

    const winner = sortedPlayers[0]

    const getRankIcon = (index: number) => {
      switch (index) {
        case 0:
          return <Crown className="h-6 w-6 text-yellow-500" />
        case 1:
          return <Medal className="h-6 w-6 text-gray-400" />
        case 2:
          return <Medal className="h-6 w-6 text-amber-600" />
        default:
          return <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
      }
    }

    const getRankColor = (index: number) => {
      switch (index) {
        case 0:
          return "border-yellow-500/50 bg-yellow-500/10"
        case 1:
          return "border-gray-400/50 bg-gray-400/10"
        case 2:
          return "border-amber-600/50 bg-amber-600/10"
        default:
          return "border-border bg-card"
      }
    }

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-4">
        <div className="w-full max-w-4xl space-y-4 sm:space-y-8">
          {/* Winner Announcement */}
          <div className="text-center space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <Trophy className="h-12 w-12 sm:h-16 sm:w-16 text-yellow-500" />
              <div>
                <h1 className="text-4xl sm:text-6xl font-black text-foreground">WINNER!</h1>
                <p className="text-2xl sm:text-3xl font-bold text-primary mt-1 sm:mt-2">{winner.name}</p>
              </div>
              <Trophy className="h-12 w-12 sm:h-16 sm:w-16 text-yellow-500" />
            </div>
          </div>

          {/* Leaderboard */}
          <Card className="border-2 border-primary/20 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl sm:text-3xl font-black flex flex-col sm:flex-row items-center justify-center gap-2">
                <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                Final Leaderboard
              </CardTitle>
              <CardDescription className="text-base sm:text-lg">Ranked by accuracy to 5000ms target</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {sortedPlayers.map((player, index) => (
                <div
                  key={player.name}
                  className={`flex items-center justify-between p-4 sm:p-6 rounded-lg border-2 transition-all hover:scale-[1.02] ${getRankColor(index)}`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                      {getRankIcon(index)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground truncate">{player.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {index === 0
                          ? "Champion"
                          : index === 1
                            ? "Runner-up"
                            : index === 2
                              ? "Third place"
                              : `${index + 1}th place`}
                      </p>
                    </div>
                  </div>

                  <div className="text-right space-y-1 flex-shrink-0">
                    <div className="text-xl sm:text-2xl font-bold text-foreground">{player.time}ms</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{player.accuracy}ms off target</div>
                    <Badge variant={index === 0 ? "default" : "secondary"} className="text-xs">
                      {player.accuracy! <= 50
                        ? "Perfect"
                        : player.accuracy! <= 100
                          ? "Excellent"
                          : player.accuracy! <= 250
                            ? "Good"
                            : player.accuracy! <= 500
                              ? "Fair"
                              : "Try again"}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              onClick={restartGame}
              size="lg"
              variant="outline"
              className="text-lg sm:text-xl font-black py-4 sm:py-6 px-6 sm:px-8 bg-transparent w-full sm:w-auto"
            >
              <RotateCcw className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              Play Again
            </Button>
            <Button
              onClick={() => {
                setGameState("setup")
                setPlayers([])
                setCurrentPlayerIndex(0)
              }}
              size="lg"
              className="text-lg sm:text-xl font-black py-4 sm:py-6 px-6 sm:px-8 bg-primary hover:bg-primary/90 w-full sm:w-auto"
            >
              <Users className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              New Game
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-2xl font-bold">Game State: {gameState}</p>
    </div>
  )
}
