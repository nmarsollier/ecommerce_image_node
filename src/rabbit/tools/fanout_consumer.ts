"use strict";

/**
 *  Servicios de escucha de eventos rabbit
 */
import amqp = require("amqplib");
import * as env from "../../server/environment";

export interface IRabbitMessage {
    type: string;
    exchange?: string;
    queue?: string;
    message: any;
}

interface RabbitProcessor {
    (source: IRabbitMessage): void;
}

export class RabbitFanoutConsumer {
    conf = env.getConfig(process.env);
    processors = new Map<string, RabbitProcessor>();

    constructor(private exchange: string) {
    }

    addProcessor(type: string, processor: RabbitProcessor) {
        this.processors.set(type, processor);
    }

    /**
     * Escucha eventos específicos de cart.
     *
     * article-exist : Es un evento que lo envía Catalog indicando que un articulo existe y es valido para el cart.
     */
    async init() {
        try {
            const conn = await amqp.connect(this.conf.rabbitUrl);

            const channel = await conn.createChannel();

            channel.on("close", function () {
                console.error("RabbitMQ  " + this.exchange + "  conexión cerrada, intentado reconecta en 10'");
                setTimeout(() => this.init(), 10000);
            });

            console.log("RabbitMQ  " + this.exchange + "  conectado");

            const exchange = await channel.assertExchange(this.exchange, "fanout", { durable: false });

            const queue = await channel.assertQueue("", { exclusive: true });

            channel.bindQueue(queue.queue, exchange.exchange, "");

            channel.consume(queue.queue,
                (message) => {
                    const rabbitMessage: IRabbitMessage = JSON.parse(message.content.toString());
                    if (this.processors.has(rabbitMessage.type)) {
                        this.processors.get(rabbitMessage.type)(rabbitMessage);
                    }
                }, { noAck: true });

        } catch (err) {
            console.error("RabbitMQ " + this.exchange + " : " + err.message);
            setTimeout(() => this.init(), 10000);
        }
    }
}
