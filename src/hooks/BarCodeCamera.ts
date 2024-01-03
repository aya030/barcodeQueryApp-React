import { useState, useCallback } from "react";
import Quagga from "@ericblade/quagga2";

export const BarCodeCamera = () => {
  const [barcode, setBarcode] = useState("");

  const ScanStart = useCallback(() => {
    let count = 0; //読み取り回数
    let precode: string; //読み取ったひとつ前のコード

    /*
      Quaggajsの初期設定
     */
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          constraints: {
            // カメラのサイズ指定
            width: 620,
            height: 480,
          },
          target: document.querySelector(".camera")!,
        },
        decoder: {
          readers: ["ean_reader"],
          multiple: false,
        },
      },
      (err) => {
        if (err) {
          console.log(err);
          alert("ブラウザのカメラ利用を許可してください");
        }
        // エラーがなければ読み取り開始
        console.log("Initialization finished. Ready to start");
        Quagga.start();
      }
    );

    /*
      Quaggajsの読み取りの枠と線の設定
     */
    Quagga.onProcessed((success) => {
      if (success == null) return;
      if (typeof success != "object") return;
      if (success.box == undefined) return;

      const ctx = Quagga.canvas.ctx.overlay;
      const canvas = Quagga.canvas.dom.overlay;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      //検索時の枠
      Quagga.ImageDebug.drawPath(success.box, { x: 0, y: 1 }, ctx, {
        color: "blue",
        lineWidth: 3,
      });
      //検索時の線
      Quagga.ImageDebug.drawPath(success.line, { x: "x", y: "y" }, ctx, {
        color: "red",
        lineWidth: 3,
      });
    });

    /*
      Quaggajsのデコード完了時の処理
     */
    Quagga.onDetected((success) => {
      const code = success.codeResult.code!;
      //コードが45か49で始まるバーコードのみを読み取る
      if (/^4[5|9]/.test(code)) {
        if (code == precode) {
          count++;
        } else {
          count = 0;
          precode = code;
        }
      }
      //入ってくるCodeが3回同じであればコードをセットする
      if (count >= 3) {
        count = 0;
        precode = "";
        console.log(code);
      }
      setBarcode(code);
      Quagga.stop();
      document.querySelector(".camera")!.innerHTML = "";
    });
  }, []);

  return { barcode, ScanStart, setBarcode };
};
