import "reflect-metadata";
import { Container } from "inversify";
import commonContainer from "@/lib/common/di/common-container"
import { WhereIsMessageService, WhereIsRandomMessage } from "../service/where-is-message.service";
import JsonBundleWhereIsMessageService from "../service/impl/json-bundle-where-is-message.service";

const container = new Container({parent: commonContainer});

container.bind(WhereIsMessageService).to(JsonBundleWhereIsMessageService).inSingletonScope();

export default container;