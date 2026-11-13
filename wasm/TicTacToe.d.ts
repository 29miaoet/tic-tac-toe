// TypeScript bindings for emscripten-generated code.  Automatically generated at compile time.
interface WasmModule {}

type EmbindString =
  | ArrayBuffer
  | Uint8Array
  | Uint8ClampedArray
  | Int8Array
  | string;
export interface ClassHandle {
  isAliasOf(other: ClassHandle): boolean;
  delete(): void;
  deleteLater(): this;
  isDeleted(): boolean;
  // @ts-ignore - If targeting lower than ESNext, this symbol might not exist.
  [Symbol.dispose](): void;
  clone(): this;
}
export interface MoveVector extends ClassHandle, Iterable<Move> {
  push_back(_0: Move): void;
  resize(_0: number, _1: Move): void;
  size(): number;
  get(_0: number): Move | undefined;
  set(_0: number, _1: Move): boolean;
}

export interface Game extends ClassHandle {
  changeTurn(): void;
  printBoard(): void;
  getBoard(): Board;
  move(_0: number, _1: number): void;
  winner(): number;
  getTurn(): number;
}

export interface ComputerAided extends Game {
  get difficulty(): string;
  set difficulty(value: EmbindString);
  getAllMoves(): MoveVector;
  getNextMove(): Move;
  getRandomMove(): Move;
  getReasonableMove(_0: boolean): Move;
  restoreMove(_0: number, _1: number): void;
  getBestMove(_0: boolean, _1: number, _2: number): BestMoveResult;
}

export type Move = [number, number];

export type Row = [number, number, number];

export type Board = [Row, Row, Row];

export type BestMoveResult = {
  score: number;
  move: Move;
};

interface EmbindModule {
  MoveVector: {
    new (): MoveVector;
  };
  Game: {};
  ComputerAided: {
    new (): ComputerAided;
    new (_0: Board, _1: number): ComputerAided;
    new (_0: EmbindString): ComputerAided;
    new (_0: Board, _1: number, _2: EmbindString): ComputerAided;
  };
}

export type MainModule = WasmModule & EmbindModule;
export default function MainModuleFactory(
  options?: unknown,
): Promise<MainModule>;
