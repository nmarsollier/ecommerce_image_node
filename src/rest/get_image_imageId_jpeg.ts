"use strict";

import * as express from "express";
import { Express } from "express";
import * as image from "../domain/image";
import * as error from "../server/error";

export function init(app: Express) {
  app.route("/v1/image/:imageId/jpeg").get(findJpegById);
}

/**
 * @api {get} /v1/image/:id/jpeg Obtener Imagen Jpeg
 * @apiName Obtener Imagen Jpeg
 * @apiGroup Imagen
 *
 * @apiDescription Obtiene una imagen del servidor en formato jpeg.
 *
 * @apiUse SizeHeader
 *
 * @apiSuccessExample Respuesta
 *    Imagen en formato jpeg
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function findJpegById(req: express.Request, res: express.Response) {
  const id = escape(req.params.imageId);
  const sizeHeader = req.header("Size") || req.query.Size?.toString();
  image.findById(id, sizeHeader)
    .then(image => {
      const data = image.image.substring(image.image.indexOf(",") + 1);
      const buff = new Buffer(data, "base64");
      res.type("image/jpeg");
      res.send(buff);
    })
    .catch(err => error.handle(res, err));
}
