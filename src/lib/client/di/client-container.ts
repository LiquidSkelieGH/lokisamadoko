import "./client-reflect-metadata";
import APIStreamInfoClient from "../service/impl/api-stream-info.client";
import { StreamInfoClient } from "../service/stream-info.client";
import { Container } from "inversify";
import commonContainer from "@/lib/common/di/common-container";

const container = new Container({parent: commonContainer});

container.bind(StreamInfoClient).to(APIStreamInfoClient).inSingletonScope();

export default container;