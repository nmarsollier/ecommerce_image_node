"use strict";

import { NextFunction } from "connect";
import * as express from "express";
import { Express } from "express";
import * as image from "../domain/image";
import * as error from "../server/error";
import * as token from "../domain/token";

export function init(app: Express) {
  app.route("/v1/image").post(validateToken, create);
}

interface IUserSessionRequest extends express.Request {
  user: token.ISession;
}

/**
 * @apiDefine AuthHeader
 *
 * @apiExample {String} Header Autorización
 *    Authorization=bearer {token}
 *
 * @apiErrorExample 401 Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */
 function validateToken(req: IUserSessionRequest, res: express.Response, next: NextFunction) {
    const auth = req.header("Authorization");
    if (!auth) {
      return error.handle(res, error.newError(error.ERROR_UNAUTHORIZED, "Unauthorized"));
    }

    token.validate(auth)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => error.handle(res, err));
  }

  /**
   * @api {post} /v1/image Crear Imagen
   * @apiName Crear Imagen
   * @apiGroup Imagen
   *
   * @apiDescription Agrega una nueva imagen al servidor.
   *
   * @apiExample {json} Body
   *    {
   *      "image" : "{Imagen en formato Base 64}"
   *    }
   *
   * @apiSuccessExample {json} Respuesta
   *     HTTP/1.1 200 OK
   *     {
   *       "id": "{Id de imagen}"
   *     }
   *
   * @apiUse AuthHeader
   * @apiUse ParamValidationErrors
   * @apiUse OtherErrors
   */
  function create(req: IUserSessionRequest, res: express.Response, next: NextFunction) {
    image.create(req.body)
      .then(id => res.json({ id: id }))
      .catch(err => error.handle(res, err));
  }
