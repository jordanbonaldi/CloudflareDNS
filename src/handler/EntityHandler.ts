import { Entity } from "../entities/Entity";

export default new class EntityHandler {

    private readonly models : {[name: string]: Entity} = {};

    /**
     *
     * @param model
     * @param name
     */
    addModel<T extends Entity>(model: T & Entity, name: string) {
        this.models[name] = model;
    }

    /**
     *
     * @param name
     */
    getModel<T extends Entity>(name: string): T & Entity {
        return this.models[name] as T & Entity;
    }

}