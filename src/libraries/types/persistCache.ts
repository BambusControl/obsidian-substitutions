import {SubstitutionsError} from "../../substitutions/errors/substitutionsError";
import {MaybePromise} from "./maybePromise";

export class PersistCache<T> {
    private value?: T;

    constructor(
        private readonly getCallback: () => MaybePromise<T>,
        private readonly persistCallback: (value: T) => MaybePromise<void>,
        initialValue?: T
    ) {
        this.value = initialValue;
    }

    async get(): Promise<T> {
        if (this.value == null) {
            this.value = await this.getCallback();
        }

        return this.value;
    }

    set(value: T) {
        this.value = value
    }

    async persist(): Promise<T> {
        if (this.value == null) {
            throw new SubstitutionsError("Refuse to persist a null value");
        }

        await this.persistCallback(this.value);
        return this.value;
    }
}
