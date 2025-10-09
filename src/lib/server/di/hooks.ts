import { IWhereIsMessageService, WhereIsMessageService } from "../service/where-is-message.service";
import container from "./container";

export function getWhereIsMessageService(): IWhereIsMessageService {
    return container.get(WhereIsMessageService);
}