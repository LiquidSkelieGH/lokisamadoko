import { EnvironmentService } from "../service/env.service";
import container from "./common-container";


export function getEnvironmentService() {
    return container.get(EnvironmentService);
}
