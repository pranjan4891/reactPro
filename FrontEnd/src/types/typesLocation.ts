import { Status } from "../utils/status";

export interface LocationIface {
    _id?: string
    name: string;
    city: string;
    state: string;
    country: string;
    status?: Status;
}
