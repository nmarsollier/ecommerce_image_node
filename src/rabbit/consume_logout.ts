"use strict";

/**
 *  Servicios de escucha de eventos rabbit
 */
import * as env from "../server/environment";
import * as token from "../domain/token";
import { IRabbitMessage, RabbitFanoutConsumer } from "./tools/fanout_consumer";

const conf = env.getConfig(process.env);

export function init() {
    const fanout = new RabbitFanoutConsumer("auth");
    fanout.addProcessor("logout", processLogout);
    fanout.init();
}

/**
 * @api {fanout} auth/logout Logout de Usuarios
 * @apiGroup RabbitMQ GET
 *
 * @apiDescription Escucha de mensajes logout desde auth.
 *
 * @apiSuccessExample {json} Mensaje
 *     {
 *        "type": "logout",
 *        "message": "{tokenId}"
 *     }
 */
function processLogout(rabbitMessage: IRabbitMessage) {
    console.log("RabbitMQ Consume logout " + rabbitMessage.message);
    token.invalidate(rabbitMessage.message);
}
