/**
 * @jest-environment jsdom
 */

import { act, renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { Item } from "../types/type";
import { InsertCart } from "../hooks/InsertCart";

const onSendItem: Item = {
  list: {
    id: "uuid-1",
    name: "木工用ボンド1",
    code: "2301480366521",
    image: "image-1",
  },
  number: "3",
};

describe("GET", () => {
  it("カートに値が入っている", async () => {
    const { result } = renderHook(() => InsertCart(), {
      wrapper: RecoilRoot,
    });

    expect(result.current.cartArray.length).toBe(0);

    await act(async () => {
      result.current.insertCheck(onSendItem);
    });
    expect(result.current.cartArray.length).toBe(1);
  });
});
