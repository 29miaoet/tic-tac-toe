
cmake_minimum_required(VERSION 3.20)

project(Game LANGUAGES CXX)

find_program(CCACHE_PROGRAM ccache)

if(CCACHE_PROGRAM)
    set(CMAKE_CXX_COMPILER_LAUNCHER "${CCACHE_PROGRAM}")
endif()

add_executable(Game src/Main.cpp)

target_compile_features(Game PRIVATE cxx_std_23)

