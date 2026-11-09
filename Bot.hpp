#pragma once
#include "Game.hpp"
#include <array>
#include <climits>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

class ComputerAided : public Game {
public:
  // Purely documentational, not used
  std::string difficulty;

  ComputerAided() : difficulty("impossible") {}

  ComputerAided(std::string diff) : difficulty(diff) {}

  ComputerAided(std::array<std::array<int, 3>, 3> suppliedBoard,
                int suppliedTurn)
      : Game(suppliedBoard, suppliedTurn) {}

  ComputerAided(std::array<std::array<int, 3>, 3> suppliedBoard,
                int suppliedTurn, std::string diff)
      : Game(suppliedBoard, suppliedTurn), difficulty(diff) {}

  std::vector<std::array<int, 2>> getAllMoves() {
    std::vector<std::array<int, 2>> allMoves = {};
    for (int i = 0; i < 3; i++) {
      for (int j = 0; j < 3; j++) {
        if (board[i][j] == 0) {
          allMoves.push_back({i, j});
        }
      }
    }
    return allMoves;
  }

  std::array<int, 2> getNextMove() {
    for (int i = 0; i < 3; i++) {
      for (int j = 0; j < 3; j++) {
        if (board[i][j] == 0) {
          return {i, j};
        }
      }
    }
    throw std::out_of_range("Game has already finished.");
  }

  void restoreMove(int x, int y) {
    board[x][y] = 0;
    changeTurn();
  }

  std::pair<int, std::array<int, 2>> getBestMove(bool initialPlayer) {
    int endingCode = winner();
    if (endingCode != 0) {
      // Game already ended, no best move
      return {endingCode, {-1, -1}};
    }

    auto moves = getAllMoves();

    if (moves.empty()) {
      return {0, {-1, -1}};
    }
    int bestScore = initialPlayer ? INT_MIN : INT_MAX;
    std::array<int, 2> bestMove = {-1, -1};

    for (const auto &testMove : moves) {
      // Iterates through every move
      move(testMove[0], testMove[1]);

      int score = getBestMove(!initialPlayer).first;

      restoreMove(testMove[0], testMove[1]);

      if (initialPlayer) {
        if (score > bestScore) {
          bestScore = score;
          bestMove = testMove;
        }
      } else {
        if (score < bestScore) {
          bestScore = score;
          bestMove = testMove;
        }
      }
    }

    return {bestScore, bestMove};
  }
};
