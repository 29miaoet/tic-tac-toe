#include "Bot.hpp"

#include <array>
#include <emscripten/bind.h>
#include <vector>

using namespace emscripten;

using Move = std::array<int, 2>;
using Row = std::array<int, 3>;
using Board = std::array<Row, 3>;

// Adapt std::pair into a JavaScript-compatible object.
struct BestMoveResult {
  int score;
  Move move;
};

BestMoveResult getBestMoveForJS(ComputerAided &self, bool initialPlayer, int depth, int maxDepth) {
  auto result = self.getBestMove(initialPlayer, depth, maxDepth);

  return {result.first, result.second};
}

EMSCRIPTEN_BINDINGS(tictactoe) {

  // Register array types.
  value_array<Move>("Move").element(emscripten::index<0>()).element(emscripten::index<1>());

  value_array<Row>("Row")
      .element(emscripten::index<0>())
      .element(emscripten::index<1>())
      .element(emscripten::index<2>());

  value_array<Board>("Board")
      .element(emscripten::index<0>())
      .element(emscripten::index<1>())
      .element(emscripten::index<2>());

  // Register vector type.
  register_vector<Move>("MoveVector");

  // Register minimax result.
  value_object<BestMoveResult>("BestMoveResult")
      .field("score", &BestMoveResult::score)
      .field("move", &BestMoveResult::move);

  // Base class.
  class_<Game>("Game")
      .function("changeTurn", &Game::changeTurn)
      .function("move", &Game::move)
      .function("printBoard", &Game::printBoard)
      .function("winner", &Game::winner)
      .function("getTurn", &Game::getTurn)
      .function("getBoard", &Game::getBoard);

  // Derived class.
  class_<ComputerAided, base<Game>>("ComputerAided")
      // Constructors.
      .constructor<>()
      .constructor<std::string>()
      .constructor<Board, int>()
      .constructor<Board, int, std::string>()

      // Property.
      .property("difficulty", &ComputerAided::difficulty)

      // ComputerAided methods.
      .function("getAllMoves", &ComputerAided::getAllMoves)
      .function("getNextMove", &ComputerAided::getNextMove)
      .function("restoreMove", &ComputerAided::restoreMove)
      .function("getRandomMove", &ComputerAided::getRandomMove)
      .function("getReasonableMove", &ComputerAided::getReasonableMove)
      .function("getBestMove", &getBestMoveForJS);
}
