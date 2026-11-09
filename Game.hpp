#pragma once
#include <array>
#include <iostream>
#include <stdexcept>

class Game {
protected:
  // turn is 1 for white and -1 for black
  int turn;
  std::array<std::array<int, 3>, 3> board;

public:
  Game() : board{{{0, 0, 0}, {0, 0, 0}, {0, 0, 0}}}, turn(1) {}
  Game(std::array<std::array<int, 3>, 3> suppliedBoard, int suppliedTurn) {
    board = suppliedBoard;
    turn = suppliedTurn;
  }

  void changeTurn() {
    if (turn == 1) {
      turn = -1;
    } else if (turn == -1) {
      turn = 1;
    } else {
      throw std::invalid_argument("turn variable must be either -1 or 1");
    }
  }

  void move(int xcoord, int ycoord) {
    if (board[xcoord][ycoord] != 0) {
      std::cout << "Error, position already occupied." << std::endl;
    } else if (0 <= xcoord && 0 <= ycoord && xcoord <= 2 && ycoord <= 2) {
      board[xcoord][ycoord] = turn;
      changeTurn();
    } else {
      std::cout << "Invalid arguments for move(), aborting move." << std::endl;
    }
  }

  void printBoard() {
    for (int i = 0; i < 3; i++) {
      for (int j = 0; j < 3; j++) {
        std::cout << board[i][j] << "\t";
      }
      std::cout << "\n";
    }
  }

  // Returns the side that has won, 1 for white, -1 for black, 0 for draw or not
  // finished
  int winner() {
    // Horizontal and vertical
    for (int i = 0; i < 3; i++) {
      if (board[i][0] != 0 && board[i][0] == board[i][1] &&
          board[i][1] == board[i][2]) {
        return board[i][0];
      } else if (board[0][i] != 0 && board[0][i] == board[1][i] &&
                 board[1][i] == board[2][i]) {
        return board[0][i];
      }
    }

    // Diagonal
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] ||
        board[2][0] == board[1][1] && board[1][1] == board[0][2]) {
      int winningSide = board[1][1];
      if (winningSide != 0)
        return winningSide;
    }

    return 0;
  }

  int getTurn() { return turn; }
};
