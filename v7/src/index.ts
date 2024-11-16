// packages/text-with-images/index.ts
import {
  Container,
  Texture,
  Sprite,
  Text,
  Assets,
  HTMLText,
  HTMLTextStyle,
  TextMetrics,
  ITextStyle,
  TextStyle
} from "pixi.js";

function removeGraphemes(input: string): string {
  // Step 1: Normalize the string to NFD (Normalization Form Decomposition)
  const normalizedString = input.normalize('NFD');

  // Step 2: Remove combining marks and non-base symbols using a regex pattern
  // This regex replaces all combining diacritics and non-spacing marks.
  const baseSymbolsOnly = normalizedString.replace(/[\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/g, '');

  return baseSymbolsOnly;
}

/**
 * A class that creates a container with styled text and images based on provided text, images, and styles.
 *
 * @class
 * @extends PIXI.Container
 */
export class StyledTextWithImagesContainer extends Container {
  private _text: string = "";
  private style: TextStyle; // Assuming HTMLText is your class for styled text rendering

  /**
   * Creates an instance of StyledTextWithImagesContainer.
   *
   * @constructor
   */
  constructor(text: string, style?: HTMLTextStyle | ITextStyle) {
    super();
    this.style = style instanceof TextStyle ? style : new TextStyle(style) ; // Store the style
    this.text = text;
  }

  /**
   * Gets the current text of the container.
   *
   * @returns {string} The current text.
   */
  get text(): string {
    return this._text;
  }

  /**
   * Sets the text for the container. This will trigger a re-render of the text and images.
   *
   * @param {string} newText - The new text to set.
   */
  set text(newText: string) {
    this._text = newText;
    console.log(newText)

    this.removeChildren();

    console.log('New Text:', newText)

    // Split the text by placeholders and newline characters
    const fragments = this._text.split(/(\{.*?\})|\n/g);
    let xPosition = 0;
    let yPosition = 0;

    let textMetrics = TextMetrics.measureText(this._text, this.style)

    let baseTextMetrics = TextMetrics.measureText(removeGraphemes(this._text), this.style)

    const lineHeight = this.style?.lineHeight ?? textMetrics.lineHeight;
    console.log(`LH: ${lineHeight}`)
    console.log(textMetrics)
    console.log(fragments)
    fragments.forEach((fragment) => {
      if (fragment?.startsWith("{") && fragment?.endsWith("}")) {
        // Extract the image key without braces
        const imageName = fragment.slice(1, -1);
        if (Assets.cache.has(imageName)) {
          const sprite = new Sprite(Assets.cache.get(imageName));
          const height = baseTextMetrics.fontProperties.fontSize;
          const SCALE = 1;
          // Resize sprite to fit the line height
          sprite.width = (height / sprite.height) * sprite.width * SCALE; // Maintain aspect ratio
          sprite.height = height * SCALE; // Set height to match line height

          // Set anchor to center the sprite
          sprite.anchor.set(0.5, 0.5);
          sprite.x = xPosition + sprite.width / 2; // Offset xPosition for centering
          sprite.y = yPosition + height / 2; // Center vertically within the line height

          this.addChild(sprite);
          
          console.log(`🖼️ Injecting ${imageName} into text at ${sprite.x} ${sprite.y}`)
          xPosition += sprite.width; // Move cursor position forward
        } else {
            console.error(`Texture ${imageName} is missing in assets cache`);
        }
      } else if (fragment === '\n' || fragment===undefined) {
        xPosition = 0; // Reset xPosition to 0 if a newline is found
        yPosition += lineHeight + textMetrics.fontProperties.fontSize; // Increment the y position to move to the next line
      } else {
        // Create a text object for non-placeholder text
        const textSprite = new Text(fragment, this.style);
        textSprite.x = xPosition;
        textSprite.y = yPosition; // Keep the text at the top for initial positioning
        this.addChild(textSprite);
        xPosition += textSprite.width; // Move cursor position forward
      }
    });
  }
}