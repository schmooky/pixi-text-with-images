import { StyledTextWithImagesContainer } from "@pixi-text-with-images/v7";
import {
  Application,
  Assets,
  HTMLText,
  HTMLTextStyle,
  Sprite,
  TextStyle,
} from "pixi.js";

const imagePaths = {
  "green_pipe.webp": "green_pipe.webp",
  "blue_pipe.webp": "blue_pipe.webp",
  "gold_moon.webp": "gold_moon.png",
};

(async () => {
  const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x282b30,
    antialias: true,
    view: document.getElementById("pixiCanvas")! as HTMLCanvasElement,
  });

  await Promise.all(
    Object.entries(imagePaths).map(async ([key, path]) => Assets.load(path))
  );

  
  const translations = [
    "This is an example {green_pipe.webp} of text with an image {gold_moon.png}",
    "Это пример {green_pipe.webp} текста с изображением {gold_moon.png}",
    "Ini adalah contoh {green_pipe.webp} teks dengan gambar {gold_moon.png}",                     // Indonesian
    // "Este es un ejemplo de texto con una imagen {gold_moon.png}",                // Spanish (LATAM)
    // "Este é um exemplo de texto com uma imagem {gold_moon.png}",                  // Portuguese (Brazilian)
    // "Bu, bir resim ile bir metin örneğidir {gold_moon.png}",                      // Turkish
    // "Dette er et eksempel på tekst med et billede {gold_moon.png}",              // Danish
    // "Dies ist ein Beispieltext mit einem Bild {gold_moon.png}",                   // German
    // "Det här är ett exempel på text med en bild {gold_moon.png}",                // Swedish
    // "Questo è un esempio di testo con un'immagine {gold_moon.png}",               // Italian
    // "Ceci est un exemple de texte avec une image {gold_moon.png}",               // French
    // "Đây là ví dụ về văn bản có hình ảnh {gold_moon.png}",                        // Vietnamese
    "Este es un ejemplo {green_pipe.webp} de texto con una imagen {gold_moon.png}",                // Spanish
    "Este é um exemplo {green_pipe.webp} de texto com uma imagem {gold_moon.png}",                 // Portuguese
    "นี่คือตัวอย่างข้{green_pipe.webp}อความที่มีรูปภาพ {gold_moon.png}",                       // Thai
    "यह एक चित्र{green_pipe.webp}के साथ पाठ का उदाहरण है {gold_moon.png}",                      // Hindi
    // "এটি একটি চিত্র সহ পাঠ্যের উদাহরণ {gold_moon.png}",                        // Bengali
    "这是带有{green_pipe.webp}图像的文本示例 {gold_moon.png}",                                     // Chinese (Mandarin)
    "이것은 이미지가 {green_pipe.webp} WILD 있는 텍스트 예제입니다 {gold_moon.png}",                   // Korean
    "これは画像を含む {green_pipe.webp}  WILD テキストの例です {gold_moon.png}",                         // Japanese
    "Ini adalah {green_pipe.webp} contoh teks dengan gambar {gold_moon.png}",                      // Malay
    "ນີ້ແມ່ນແບບທໍາອິ{green_pipe.webp}ດຂອງເນື້ອສຽງທີ່ມີຮູບພາບ {gold_moon.png}",  // Lao
    "នេះគឺជាគំរូនៃ{green_pipe.webp}អត្ថបទដែលមានរូបភាព {gold_moon.png}"                 // Khmer
  ];
  
  translations.forEach((text, index) => {
    const FONT_SIZE = 24;
    const textContainer = new StyledTextWithImagesContainer(
      text,
      new TextStyle({
        fontSize: FONT_SIZE,
        fontFamily: "Arial",
        fill: 0xf2f2f2,
        fontWeight: "600",
      })
    );
  
    // Add the container to the stage
    app.stage.addChild(textContainer);
  
    // Position each container below the previous one
    textContainer.x = 200;
    textContainer.y = 20 + FONT_SIZE*1.5*index; // 50 pixels spacing between containers
  });
})();
