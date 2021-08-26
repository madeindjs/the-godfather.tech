import {expect} from "chai";
import {Store} from "./store";

describe("Store", () => {
  it("handle board", () => {
    const store = new Store();
    const {uuid} = store.createBoard();
    expect(() => store.getBoard(uuid)).not.throw();
  });

  it("handle column", () => {
    const store = new Store();
    const board = store.createBoard();
    const {uuid} = store.createColumn(board, "test");

    expect(() => store.getColumn(uuid)).not.throw();
    expect(store.getColumns(board.uuid).length).to.equal(1);
    expect(store.getColumns(board).length).to.equal(1);
  });
});
