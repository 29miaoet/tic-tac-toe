cmake_minimum_required(VERSION 3.20)
project(TicTacToeWasm LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Output directory: frontend/src/wasm
set(WASM_OUTPUT_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../wasm")
file(MAKE_DIRECTORY "${WASM_OUTPUT_DIR}")

add_executable(TicTacToe
    src/bindings.cpp
)

target_compile_options(TicTacToe PRIVATE
    -O0
    -fexceptions
)

target_link_options(TicTacToe PRIVATE
    -lembind
    --no-entry
    -sMODULARIZE=1
    -sEXPORT_ES6=1
    -fexceptions
    "--emit-tsd=${WASM_OUTPUT_DIR}/TicTacToe.d.ts"
)

set_target_properties(TicTacToe PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY "${WASM_OUTPUT_DIR}"
    OUTPUT_NAME "TicTacToe"
)
