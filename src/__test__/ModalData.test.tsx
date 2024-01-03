/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";

import { ModalData } from "../components/GoodsModalData";
import userEvent from "@testing-library/user-event";
import { RecoilRoot } from "recoil";
import { BarcodeReader } from "../view/BarcodeReaderView";

const mockOnClose = jest.fn();
const user = userEvent.setup();

describe("モーダルのテスト", () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <BarcodeReader />
        <ModalData
          onClose={mockOnClose}
          isOpen={true}
          modalList={[
            {
              id: "uuid-1",
              name: "木工用ボンド1",
              code: "2301480366521",
              image: "image-1",
            },
          ]}
        />
        ‰
      </RecoilRoot>
    );
  });

  it("Modalに選択された内容が表示されているか", async () => {
    expect(screen.getByText("木工用ボンド1")).toBeInTheDocument();
    user.type(screen.getByPlaceholderText("number"), "3");
    user.click(screen.getByRole("button", { name: "SEND" }));
  });
});
