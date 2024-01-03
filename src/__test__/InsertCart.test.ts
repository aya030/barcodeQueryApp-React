/**
 * @jest-environment jsdom
 */

import { act, renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { setupServer } from "msw/node";
import { handlers } from "../mock/handler";
import { FindGoods } from "../hooks/FindGoods";

const server = setupServer(...handlers);

describe("api通信のテスト", () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  describe("GET", () => {
    it("1件データを取得できてモーダルが開く", async () => {
      const obj = [
        {
          id: "uuid-1",
          name: "木工用ボンド1",
          code: "2301480366521",
          image: "image-1",
        },
      ];
      const { result } = renderHook(() => FindGoods(), {
        wrapper: RecoilRoot,
      });
      await act(async () => {
        result.current.readBarcode(String("4901480366300"));
      });

      expect(result.current.soloData).toEqual(obj);
      expect(result.current.modalOpen).toBeTruthy();
    });
  });
  it("複数件データを取得できる", async () => {
    const objs = [
      {
        id: "uuid-3",
        name: "木工用ボンド3",
        code: "2301480366523",
        image: "image-3",
      },
      {
        id: "uuid-4",
        name: "木工用ボンド4",
        code: "2301480366524",
        image: "image-4",
      },
    ];
    const { result } = renderHook(() => FindGoods(), {
      wrapper: RecoilRoot,
    });
    await act(async () => {
      await result.current.readBarcode(String("2301480366520"));
    });
    expect(result.current.barcodeList).toEqual(objs);
    expect(result.current.modalOpen).toBeFalsy();
  });
});
