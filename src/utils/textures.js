import {
  TextureLoader,
  NearestFilter,
  LinearMipMapLinearFilter,
  sRGBEncoding,
  EquirectangularReflectionMapping
} from "three";
import GifLoader from "three-gif-loader";

import woodImg from "../images/wood.png";
import playerUp from "../images/playerUp.gif";
import playerDown from "../images/playerDown.gif";
import playerRight from "../images/playerRight.gif";
import playerLeft from "../images/playerLeft.gif";
import playerIdle from "../images/playerIdle.gif";
import coinImg from "../images/coin.gif";

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
const playerUpMovement = imgLoader(playerUp, "gif");
const playerDownMovement = imgLoader(playerDown, "gif");
const playerRightMovement = imgLoader(playerRight, "gif");
const playerLeftMovement = imgLoader(playerLeft, "gif");
const playerIdleMovement = imgLoader(playerIdle, "gif");
const coin = imgLoader(coinImg, "gif");

export { playerUpMovement, playerDownMovement, playerRightMovement, playerLeftMovement, playerIdleMovement, wood, coin };
