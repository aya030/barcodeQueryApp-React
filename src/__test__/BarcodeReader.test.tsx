/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { BarcodeReader } from "../view/BarcodeReaderView";
import { RecoilRoot } from "recoil";
// import { BarCodeCamera } from "../hooks/BarCodeCamera";
// import { act } from "react-dom/test-utils";

describe("バーコードリーダーコンポーネントのテスト", () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <BarcodeReader />
      </RecoilRoot>
    );
  });
  it("Headerが表示されているかのテスト", () => {
    expect(screen.getByText("BARCODE QUERY APP")).toBeInTheDocument();
  });
  it("inputのplaceholderが表示されているかのテスト", () => {
    expect(screen.getByPlaceholderText("BARCODE NUMBER")).toBeInTheDocument();
  });

  it("inputのplaceholderが表示されているかのテスト", () => {
    expect(screen.getByPlaceholderText("BARCODE NUMBER")).toBeInTheDocument();
  });

  // it("カメラが起動しているかのテスト", async() => {
  //    const { result } = renderHook(() => BarCodeCamera(), {
  //      wrapper: RecoilRoot,
  //    });
  //   await act(async () => {
  //     result.current.ScanStart();
  //   });
  //   expect(screen.getAllByRole('video')).toBeInTheDocument();
  // });
});
