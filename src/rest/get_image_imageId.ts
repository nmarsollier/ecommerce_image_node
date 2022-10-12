"use strict";

import * as express from "express";
import { Express } from "express";
import * as image from "../domain/image";
import * as error from "../server/error";

export function init(app: Express) {
  app.route("/v1/image/:imageId").get(findById);
}

/**
 * @api {get} /v1/image/:id Obtener Imagen
 * @apiName Obtener Imagen
 * @apiGroup Imagen
 *
 * @apiDescription Obtiene una imagen del servidor en formato base64
 *
 * @apiUse SizeHeader
 *
 * @apiSuccessExample {json} Respuesta
 *    {
 *      "id": "{Id de imagen}",
 *      "image" : "{Imagen en formato Base 64}"
 *    }
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
 function findById(req: express.Request, res: express.Response) {
    const id = escape(req.params.imageId);
    const sizeHeader = req.header("Size") || req.query.Size?.toString();
    image.findById(id, sizeHeader)
      .then(image => res.json(image))
      .catch(err => error.handle(res, err));
  }
