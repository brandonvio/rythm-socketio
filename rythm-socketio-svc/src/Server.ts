const { Kafka } = require("kafkajs");
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { EnvUtil } from "./EnvUtil";

console.log("// 11:33");

// Config socketio server.
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    methods: ["GET", "PUT", "POST"],
    credentials: false,
    origin: "*",
  },
});

// Subscribe to Kafka Topic, emit when message.
(async () => {
  const kafka_sasl_plain_username = await EnvUtil.getSecret("confluent_sasl_plain_username");
  const kafka_sasl_plain_password = await EnvUtil.getSecret("confluent_sasl_plain_password");
  const kafka_bootstrap_servers = EnvUtil.getEnv("KAFKA_BOOTSTRAP_SERVERS");
  const kafka_topic = EnvUtil.getEnv("KAFKA_TOPIC");

  // Config kafka client
  const kafka = new Kafka({
    clientId: "socketio-app",
    brokers: [kafka_bootstrap_servers],
    ssl: true,
    sasl: {
      mechanism: "plain",
      username: kafka_sasl_plain_username,
      password: kafka_sasl_plain_password,
    },
  });

  const consumer = kafka.consumer({ groupId: "rythm-socketio-group" });
  await consumer.connect();
  await consumer.subscribe({ topic: kafka_topic, fromBeginning: false });
  await consumer.run({
    eachMessage: ({ message }) => {
      io.emit(kafka_topic, message.value.toString());
      console.log(message.value.toString());
    },
  });
})();

io.on("connection", async (socket: Socket) => {
  console.log("// A user connected.");
});

httpServer.listen(3000);

console.log("// Server online.");
