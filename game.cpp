#include <iostream>
#include <optional>
#include <stdexcept>
#include <string>

class Player {
public:
  // turn is 1 for white and 2 for black
  int turn;
  std::array<std::array<int, 3>, 3> board;

  Player() : board{{{0, 0, 0}, {0, 0, 0}, {0, 0, 0}}} { turn = 1; }

  void changeTurn() {
    if (turn == 1) {
      turn = 2;
    } else if (turn == 2) {
      turn = 1;
    } else {
      throw std::invalid_argument("turn variable must be either 1 or 2");
    }
  }

  void move(int xcoord, int ycoord) {
    try {
      board[xcoord][ycoord] = turn;
    } catch (std::out_of_range &error) {
      std::cout << "Invalid arguments for move(), aborting move." << std::endl;
    }
  }

  // Returns the side that has won, or none
  std::string finished() {
    std::optional<int> winningSide;

    // Horizontal and vertical
    for (int i = 0; i < 3; i++) {
      if (board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
        winningSide = board[i][0];
      } else if (board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
        winningSide = board[0][i];
      }
    }

    // Diagonal
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] ||
        board[2][0] == board[1][1] && board[1][1] == board[0][2]) {
      winningSide = board[1][1];
    }

    if (winningSide.has_value()) {
      return winningSide == 1 ? "white" : "black";
    } else {
      return "none";
    }
  }
};
