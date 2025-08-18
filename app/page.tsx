"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Trophy,
  Timer,
  Zap,
  Play,
  RotateCcw,
  Medal,
  Crown,
} from "lucide-react";

type GameState = "setup" | "playing" | "results";
type GamePhase = "waiting" | "countdown" | "go" | "finished";
type Player = {
  name: string;
  time?: number;
  accuracy?: number;
};

export default function SprintGame() {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [gamePhase, setGamePhase] = useState<GamePhase>("waiting");
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [newPlayerName, setNewPlayerName] = useState("");

  const [startTime, setStartTime] = useState<number>(0);
  const [playerTime, setPlayerTime] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(0);
  const [isListening, setIsListening] = useState<boolean>(false);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Space" && isListening && gamePhase === "go") {
        event.preventDefault();
        const endTime = Date.now();
        const timeTaken = endTime - startTime;
        setPlayerTime(timeTaken);
        setGamePhase("finished");
        setIsListening(false);

        // Update current player's time
        const updatedPlayers = [...players];
        updatedPlayers[currentPlayerIndex] = {
          ...updatedPlayers[currentPlayerIndex],
          time: timeTaken,
          accuracy: Math.abs(5000 - timeTaken),
        };
        setPlayers(updatedPlayers);
      }
    },
    [isListening, gamePhase, startTime, players, currentPlayerIndex]
  );

  useEffect(() => {
    if (gameState === "playing") {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [gameState, handleKeyPress]);

  const startPlayerTurn = () => {
    setGamePhase("countdown");
    setCountdown(3);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setStartTime(Date.now());
          setGamePhase("go");
          setIsListening(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const nextPlayer = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setGamePhase("waiting");
      setPlayerTime(0);
    } else {
      setGameState("results");
    }
  };

  const restartGame = () => {
    setGameState("setup");
    setGamePhase("waiting");
    setCurrentPlayerIndex(0);
    setPlayers(players.map((player) => ({ name: player.name })));
    setPlayerTime(0);
  };

  const addPlayer = () => {
    if (newPlayerName.trim() && players.length < 8) {
      setPlayers([...players, { name: newPlayerName.trim() }]);
      setNewPlayerName("");
    }
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const startGame = () => {
    if (players.length >= 2) {
      setGameState("playing");
      setCurrentPlayerIndex(0);
    }
  };

  if (gameState === "playing") {
    const currentPlayer = players[currentPlayerIndex];

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-4xl space-y-8">
          {/* Game Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black text-foreground">
              SPRINT CHALLENGE
            </h1>
            <div className="flex items-center justify-center gap-4">
              <Badge variant="outline" className="text-lg px-4 py-2">
                Player {currentPlayerIndex + 1} of {players.length}
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {currentPlayer.name}
              </Badge>
            </div>
          </div>

          {/* Game Area */}
          <Card className="border-4 border-primary/30 shadow-2xl">
            <CardContent className="p-12">
              <div className="text-center space-y-8">
                {gamePhase === "waiting" && (
                  <div className="space-y-6">
                    <div className="text-6xl font-black text-primary mb-4">
                      {currentPlayer.name}'s Turn
                    </div>
                    <p className="text-xl text-muted-foreground mb-8">
                      Get ready! Press SPACEBAR exactly 5 seconds after "GO!"
                      appears
                    </p>
                    <Button
                      onClick={startPlayerTurn}
                      size="lg"
                      className="text-2xl font-black py-8 px-12 bg-primary hover:bg-primary/90"
                    >
                      <Play className="h-8 w-8 mr-4" />
                      Start Turn
                    </Button>
                  </div>
                )}

                {gamePhase === "countdown" && countdown > 0 && (
                  <div className="space-y-6">
                    <div className="text-8xl font-black text-accent animate-pulse">
                      {countdown}
                    </div>
                    <p className="text-xl text-muted-foreground">
                      Get ready...
                    </p>
                  </div>
                )}

                {gamePhase === "go" && (
                  <div className="space-y-6">
                    <div className="text-9xl font-black text-destructive animate-bounce">
                      GO!
                    </div>
                    <p className="text-2xl font-bold text-destructive animate-pulse">
                      PRESS SPACEBAR NOW!
                    </p>
                    <div className="text-lg text-muted-foreground">
                      Target: 5000ms exactly
                    </div>
                  </div>
                )}

                {gamePhase === "finished" && (
                  <div className="space-y-6">
                    <div className="text-6xl font-black text-primary">
                      Time's Up!
                    </div>
                    <div className="space-y-4">
                      <div className="text-4xl font-bold">{playerTime}ms</div>
                      <div className="text-xl">
                        Accuracy: {Math.abs(5000 - playerTime)}ms off target
                      </div>
                    </div>
                    <Button
                      onClick={nextPlayer}
                      size="lg"
                      className="text-xl font-black py-6 px-8"
                    >
                      {currentPlayerIndex < players.length - 1
                        ? "Next Player"
                        : "View Results"}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span>
                {currentPlayerIndex + 1} / {players.length}
              </span>
            </div>
            <Progress
              value={
                ((currentPlayerIndex + (gamePhase === "finished" ? 1 : 0)) /
                  players.length) *
                100
              }
              className="h-3"
            />
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "setup") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Zap className="h-12 w-12 text-primary" />
              <h1 className="text-6xl font-black text-foreground tracking-tight">
                SPRINT
              </h1>
            </div>
            <p className="text-xl text-muted-foreground font-medium">
              The Ultimate Timing Challenge
            </p>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Timer className="h-4 w-4 mr-2" />
              Hit 5000ms Exactly!
            </Badge>
          </div>

          {/* Player Setup Card */}
          <Card className="border-2 border-primary/20 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-black flex items-center justify-center gap-2">
                <Users className="h-8 w-8 text-primary" />
                Player Setup
              </CardTitle>
              <CardDescription className="text-lg">
                Add 2-8 players to start the competition
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Player Input */}
              <div className="flex gap-3">
                <Input
                  placeholder="Enter player name..."
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addPlayer()}
                  className="text-lg h-12 border-2 focus:border-primary"
                  maxLength={20}
                />
                <Button
                  onClick={addPlayer}
                  disabled={!newPlayerName.trim() || players.length >= 8}
                  size="lg"
                  className="px-8 font-bold"
                >
                  Add Player
                </Button>
              </div>

              {/* Players List */}
              {players.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-foreground">
                    Players ({players.length}/8)
                  </h3>
                  <div className="grid gap-3">
                    {players.map((player, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-card border-2 border-border rounded-lg hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="font-bold">
                            {index + 1}
                          </Badge>
                          <span className="text-lg font-semibold text-card-foreground">
                            {player.name}
                          </span>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removePlayer(index)}
                          className="font-bold"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Start Game Button */}
              <div className="pt-4">
                <Button
                  onClick={startGame}
                  disabled={players.length < 2}
                  size="lg"
                  className="w-full text-xl font-black py-6 bg-primary hover:bg-primary/90"
                >
                  <Trophy className="h-6 w-6 mr-3" />
                  Start Sprint Challenge
                  {players.length < 2 && (
                    <span className="ml-2 text-sm opacity-75">
                      (Need at least 2 players)
                    </span>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Game Rules */}
          <Card className="bg-muted/50 border-accent/30">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                How to Play
              </h3>
              <div className="space-y-2 text-muted-foreground">
                <p>• Wait for the "GO!" signal to appear</p>
                <p>• Press SPACEBAR exactly after 5000ms (5 seconds)</p>
                <p>• The player closest to 5000ms wins!</p>
                <p>• Each player gets one turn</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameState === "results") {
    // Sort players by accuracy (closest to 5000ms wins)
    const sortedPlayers = [...players]
      .filter((player) => player.time !== undefined)
      .sort(
        (a, b) =>
          (a.accuracy || Number.POSITIVE_INFINITY) -
          (b.accuracy || Number.POSITIVE_INFINITY)
      );

    console.log(sortedPlayers);

    // Get existing leaderboard (or empty if none)
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    // Create a map to ensure uniqueness (using player.name as key, can be id if you have one)
    const playerMap = new Map();

    // Add existing players
    leaderboard.forEach((player:any) => {
      playerMap.set(player?.name, player);
    });

    // Add/Update with new results
    sortedPlayers.forEach((player) => {
      // If player already exists, keep the better accuracy (smaller value)
      const existing = playerMap.get(player?.name);
      if (!existing || player?.accuracy < existing?.accuracy) {
        playerMap.set(player?.name, player);
      }
    });

    // Convert map back to array
    const updatedLeaderboard = Array.from(playerMap.values());

    // Sort final leaderboard
    updatedLeaderboard.sort(
      (a, b) =>
        (a.accuracy ?? Number.POSITIVE_INFINITY) -
        (b.accuracy ?? Number.POSITIVE_INFINITY)
    );

    // Save updated leaderboard
    localStorage.setItem("leaderboard", JSON.stringify(updatedLeaderboard));

    // Winner = top player of this round
    const winner = sortedPlayers[0];

    const getRankIcon = (index: number) => {
      switch (index) {
        case 0:
          return <Crown className="h-6 w-6 text-yellow-500" />;
        case 1:
          return <Medal className="h-6 w-6 text-gray-400" />;
        case 2:
          return <Medal className="h-6 w-6 text-amber-600" />;
        default:
          return (
            <span className="text-2xl font-bold text-muted-foreground">
              #{index + 1}
            </span>
          );
      }
    };

    const getRankColor = (index: number) => {
      switch (index) {
        case 0:
          return "border-yellow-500/50 bg-yellow-500/10";
        case 1:
          return "border-gray-400/50 bg-gray-400/10";
        case 2:
          return "border-amber-600/50 bg-amber-600/10";
        default:
          return "border-border bg-card";
      }
    };

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-4xl space-y-8">
          {/* Winner Announcement */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-4">
              <Trophy className="h-16 w-16 text-yellow-500" />
              <div>
                <h1 className="text-6xl font-black text-foreground">WINNER!</h1>
                <p className="text-3xl font-bold text-primary mt-2">
                  {winner.name}
                </p>
              </div>
              <Trophy className="h-16 w-16 text-yellow-500" />
            </div>
          </div>

          {/* Leaderboard */}
          <Card className="border-2 border-primary/20 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-black flex items-center justify-center gap-2">
                <Trophy className="h-8 w-8 text-primary" />
                Final Leaderboard
              </CardTitle>
              <CardDescription className="text-lg">
                Ranked by accuracy to 5000ms target
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sortedPlayers.map((player, index) => (
                <div
                  key={player.name}
                  className={`flex items-center justify-between p-6 rounded-lg border-2 transition-all hover:scale-[1.02] ${getRankColor(
                    index
                  )}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12">
                      {getRankIcon(index)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {player.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
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

                  <div className="text-right space-y-1">
                    <div className="text-2xl font-bold text-foreground">
                      {player.time}ms
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {player.accuracy}ms off target
                    </div>
                    <Badge
                      variant={index === 0 ? "default" : "secondary"}
                      className="text-xs"
                    >
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
          <div className="flex gap-4 justify-center">
            <Button
              onClick={restartGame}
              size="lg"
              variant="outline"
              className="text-xl font-black py-6 px-8 bg-transparent"
            >
              <RotateCcw className="h-6 w-6 mr-3" />
              Play Again
            </Button>
            <Button
              onClick={() => {
                setGameState("setup");
                setPlayers([]);
                setCurrentPlayerIndex(0);
              }}
              size="lg"
              className="text-xl font-black py-6 px-8 bg-primary hover:bg-primary/90"
            >
              <Users className="h-6 w-6 mr-3" />
              New Game
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

console.log(leaderboard)
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-2xl font-bold">Game State: {gameState}</p>
    </div>
  );
}
