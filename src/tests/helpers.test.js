import { checkWinner, processSelection, returnTheWinner } from "../helpers";

describe("CheckWinner function", () => {
  test("check that papel beats piedra", () => {
    const computerOption = {
      name: "papel",
      beats: "piedra",
    };
    const playerOption = "piedra";
    expect(checkWinner(playerOption, computerOption)).toBe("computer");
  });

  test("check that piedra beats tijera", () => {
    const computerOption = {
      name: "piedra",
      beats: "tijera",
    };
    const playerOption = "tijera";
    expect(checkWinner(playerOption, computerOption)).toBe("computer");
  });

  test("check that tijera beats papel", () => {
    const computerOption = {
      name: "tijera",
      beats: "papel",
    };
    const playerOption = "papel";
    expect(checkWinner(playerOption, computerOption)).toBe("computer");
  });

  test("check that tijera and tijera outputs a check", () => {
    const computerOption = {
      name: "tijera",
      beats: "papel",
    };
    const playerOption = "tijera";
    expect(checkWinner(playerOption, computerOption)).toBe("check");
  });
  test("check that papel and papel outputs a check", () => {
    const computerOption = {
      name: "papel",
      beats: "piedra",
    };
    const playerOption = "papel";
    expect(checkWinner(playerOption, computerOption)).toBe("check");
  });

  test("check that piedra and piedra outputs a check", () => {
    const computerOption = {
      name: "piedra",
      beats: "tijera",
    };
    const playerOption = "piedra";
    expect(checkWinner(playerOption, computerOption)).toBe("check");
  });
});

describe("Checks for processSelection function", () => {
  test("check that procession player and computer selections returns an object", () => {
    const playerOption = "piedra";
    expect(processSelection(playerOption)).toEqual(
      expect.objectContaining({
        isWinner: expect.any(String),
        computerSelection: expect.objectContaining({
          beats: expect.any(String),
          name: expect.any(String),
        }),
      })
    );
  });
});

describe("Checks for returnTheWinner function", () => {
  test("if computer wins, COMPUTER WINS is returned", () => {
    expect(returnTheWinner("computer")).toBe("COMPUTER WINS");
  });
  test("if player wins, YOU WIN is returned", () => {
    expect(returnTheWinner("player")).toBe("YOU WIN");
  });
  test("if neither win, IT IS A CHECK is returned", () => {
    expect(returnTheWinner("check")).toBe("IT IS A CHECK");
  });
});
