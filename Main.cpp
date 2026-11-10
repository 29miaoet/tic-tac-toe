#include "Bot.hpp"
#include <iostream>

int main() {
  // ComputerAided tgame;
  constexpr std::array<int, 2> noMoves = {-1, -1};

  std::array<std::array<int, 3>, 3> gameBoard = {{{0, 0, 0}, {-1, 1, 0}, {0, 0, 0}}};

  ComputerAided tgame(gameBoard, 1);

  /*
  while (true) {
    tgame.printBoard();
    auto prediction = tgame.getBestMove(tgame.getTurn() == 1, 0);
    std::cout << "Predicted position: ";
    if (prediction.first < 0) {
      std::cout << "Black is winning" << "\n";
    } else if (prediction.first > 0) {
      std::cout << "White is winning" << "\n";
    } else {
      std::cout << "Draw" << "\n";
    }
    if (prediction.second == noMoves) {
      break;
    } else {
      tgame.move(prediction.second[0], prediction.second[1]);
    }
  }
  */

  while (true) {
    tgame.printBoard();
    auto prediction = tgame.getReasonableMove(tgame.getTurn() == 1);
    if (prediction == noMoves)
      break;
    tgame.move(prediction[0], prediction[1]);
    std::cout << "\n";
  }

  return 0;
}
