import {toggleRegEx} from "./userFacingSwapSetting";
jest.mock("obsidian", () => ({
    ExtraButtonComponent: class {
    },
    Setting: class {
    },
    TextComponent: class {
    },
}), {virtual: true});

class FakeClassElement {
    private readonly classes = new Set<string>();
    public title = "";

    toggleClass(name: string, enabled: boolean): void {
        if (enabled) {
            this.classes.add(name);
            return;
        }

        this.classes.delete(name);
    }

    removeClass(name: string): void {
        this.classes.delete(name);
    }

    hasClass(name: string): boolean {
        return this.classes.has(name);
    }
}

describe("toggleRegEx", () => {
    it("shows regex placeholder and html validation hint for invalid regex input", () => {
        const inputEl = new FakeClassElement();
        let placeholder = "";
        const patternInput = {
            inputEl,
            getValue: () => "Day 1",
            setPlaceholder: (value: string) => {
                placeholder = value;
            },
        };

        const controlEl = new FakeClassElement();
        const extraSettingsEl = new FakeClassElement();

        toggleRegEx(
            "regex",
            patternInput as any,
            {controlEl} as any,
            {extraSettingsEl} as any,
        );

        expect(controlEl.hasClass("regex-enabled")).toBe(true);
        expect(extraSettingsEl.hasClass("is-active")).toBe(true);
        expect(inputEl.hasClass("invalid")).toBe(true);
        expect(inputEl.title).toBe("Use /pattern$/flags format, e.g. /Day [0-9]$/i");
        expect(placeholder).toBe("/Day [0-9]$/i");
    });

    it("clears invalid styling and hint for valid regex input", () => {
        const inputEl = new FakeClassElement();
        let placeholder = "";
        const patternInput = {
            inputEl,
            getValue: () => "/Day [0-9]$/i",
            setPlaceholder: (value: string) => {
                placeholder = value;
            },
        };

        toggleRegEx(
            "regex",
            patternInput as any,
            {controlEl: new FakeClassElement()} as any,
            {extraSettingsEl: new FakeClassElement()} as any,
        );

        expect(inputEl.hasClass("invalid")).toBe(false);
        expect(inputEl.title).toBe("");
        expect(placeholder).toBe("/Day [0-9]$/i");
    });

    it("restores plain placeholder and clears hint when regex mode is disabled", () => {
        const inputEl = new FakeClassElement();
        let placeholder = "";
        const patternInput = {
            inputEl,
            getValue: () => "Day 1",
            setPlaceholder: (value: string) => {
                placeholder = value;
            },
        };

        const controlEl = new FakeClassElement();
        const extraSettingsEl = new FakeClassElement();
        toggleRegEx(
            "regex",
            patternInput as any,
            {controlEl} as any,
            {extraSettingsEl} as any,
        );

        toggleRegEx(
            "plain",
            patternInput as any,
            {controlEl} as any,
            {extraSettingsEl} as any,
        );

        expect(controlEl.hasClass("regex-enabled")).toBe(false);
        expect(extraSettingsEl.hasClass("is-active")).toBe(false);
        expect(inputEl.hasClass("invalid")).toBe(false);
        expect(inputEl.title).toBe("");
        expect(placeholder).toBe("replace this");
    });
});
