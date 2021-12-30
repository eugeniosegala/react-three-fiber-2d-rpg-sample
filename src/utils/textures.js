import {
  TextureLoader,
  NearestFilter,
  LinearMipMapLinearFilter,
  sRGBEncoding,
  EquirectangularReflectionMapping,
} from "three";
import GifLoader from "three-gif-loader";

import woodImg from "../images/wood.png";
import playerRight from "../images/playerRight.gif";

// instantiate GifLoader
const gifLoader = new GifLoader();
const pngLoader = new TextureLoader();

function imgLoader(path, type) {
  let image;

  if (type === "gif") {
    image = gifLoader.load(path);
  } else {
    image = pngLoader.load(path);
  }

  // options
  image.mapping = EquirectangularReflectionMapping;
  image.encoding = sRGBEncoding;
  image.magFilter = NearestFilter;
  image.minFilter = LinearMipMapLinearFilter;

  return image;
}

const wood = imgLoader(woodImg);
const playerRightMovement = imgLoader(playerRight, "gif");

export { playerRightMovement, wood };
