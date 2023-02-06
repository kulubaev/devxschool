import { ContentDTO } from "dto";
import express, { Application } from "express";
import http from "http";
import WebSocket from "ws";

import { router } from "./infra";

const app: Application = express();
const server = http.createServer(app);
const socket = new WebSocket.Server({ server });

/**
 *
 */

socket.on("connection", (io) => {
  io.send("socket connection is estabilished");
  io.on("message", async (data: any) => router(io, socket, data));
});

server.listen(8080, () => {
  console.log(`server is listening on port 8080`);
});
