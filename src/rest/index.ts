"use strict";

import { Express } from "express";
import * as get_image_jpeg from "./get_image_imageId_jpeg";
import * as get_image from "./get_image_imageId";
import * as post_image from "./post_image";

export function init(app: Express) {
  get_image_jpeg.init(app);
  get_image.init(app);
  post_image.init(app);
}
