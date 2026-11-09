#include "Bot.hpp"
#include <iostream>

int main() {
  // ComputerAided tgame;
  const std::array<int, 2> noMoves = {-1, -1};

  std::array<std::array<int, 3>, 3> gameBoard = {
      {{0, 0, 0}, {-1, 1, 0}, {0, 0, 0}}};

  ComputerAided tgame(gameBoard, 1);

  while (true) {
    tgame.printBoard();
    auto prediction = tgame.getBestMove(tgame.getTurn() == 1);
    std::cout << "Predicted position: ";
    switch (prediction.first) {
    case -1:
      std::cout << "Black is winning" << "\n";
      break;
    case 1:
      std::cout << "White is winning" << "\n";
      break;
    case 0:
      std::cout << "Draw" << "\n";
      break;
    }
    if (prediction.second == noMoves) {
      break;
    } else {
      tgame.move(prediction.second[0], prediction.second[1]);
    }
  }

  return 0;
}
