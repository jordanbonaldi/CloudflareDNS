import {Entity} from "./Entity";

export default interface Config extends Entity{
    cloudflareToken: string,
    email: string,
}