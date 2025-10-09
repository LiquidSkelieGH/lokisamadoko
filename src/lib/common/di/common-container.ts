import "reflect-metadata";
import { Container } from "inversify";
import { LocaleMessageService } from "../service/locale-message.service";
import StaticLocaleMessageService from "../service/impl/static-locale-message.service";
import { EnvironmentService } from "../service/env.service";
import ProcessEnvironmentServiceImpl from "../service/impl/env.service";

const container = new Container();

container.bind(LocaleMessageService).to(StaticLocaleMessageService).inSingletonScope();

container.bind(EnvironmentService).to(ProcessEnvironmentServiceImpl).inSingletonScope();

export default container;