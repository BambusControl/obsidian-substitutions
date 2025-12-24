import {App} from "obsidian";
import {From, LinkUp} from "obsidian-linkup";

export class ExternalApi {
    constructor(
        private readonly app: App,
    ) {
    }

    @LinkUp
    askForCharacter(
        @From("unicode-search") unicodeSearch = null!,
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            //@ts-ignore
            unicodeSearch.askForCharacter(this.app, (results) => {
                if (results == null) {
                    reject("No character was picked")
                } else {
                    resolve(results.codepoint)
                }
            });
        })
    }
}
