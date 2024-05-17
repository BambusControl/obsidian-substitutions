import {App, Plugin, PluginSettingTab, Setting} from "obsidian";

export class SettingTab extends PluginSettingTab {

    private rendered = false;

    constructor(
        app: App,
        plugin: Plugin
    ) {
        super(app, plugin);
        this.containerEl.addClass("plugin", "substitutions", "setting-tab")
    }

    override display(): void {
        if (this.rendered) {
            return;
        }

        const headingContainer = this.containerEl.createDiv({cls: "heading"});

        new Setting(headingContainer)
            .setHeading()
            .setName("Substitutions")
            .setDesc("Here you can set and enable automatic text substitutions.")
        ;

        const substitutionsContainer = this.containerEl.createDiv({cls: "substitutions"});

        substitutionRecord(substitutionsContainer);
        filledSubstitutionRecord(substitutionsContainer);

        this.rendered = true;
    }
}

function nothing() {
    return () => {
    }
}

function getToggleTooltip(value: boolean) {
    return (value ? "Disable" : "Enable")
        + " substitution";
}

function filledSubstitutionRecord(container: HTMLDivElement): Setting {
    return substitutionRecordTemplate(container, (setting) => setting
        .setClass("filled-substitution")
        .addText((c) => c
            .setPlaceholder("Replace")
            .onChange((input) => {
            })
            .setValue("mevalue")
        )
        .addText((c) => c
            .setPlaceholder("With")
            .onChange((input) => {
            })
            .setValue("mevalue")
        )
    );
}

function substitutionRecord(container: HTMLDivElement): Setting {
    return substitutionRecordTemplate(container, (setting) => setting
        .addText((c) => c
            .setPlaceholder("Replace")
            .onChange((input) => {
            })
        )
        .addText((c) => c
            .setPlaceholder("With")
            .onChange((input) => {
                const filled = setting.settingEl.hasClass("filled-substitution")
                const inputEmpty = input === ""

                if (!filled && !inputEmpty) {
                    /* TODO: move to another substitution */
                    setting.setClass("filled-substitution");
                }
            })
        )
    );
}

function substitutionRecordTemplate(
    container: HTMLDivElement,
    settingBuilder: (setting: Setting) => Setting,
): Setting {
    const sett = new Setting(container)
        .setClass("substitution-record")
        .addToggle((c) => c
            .setTooltip(getToggleTooltip(c.getValue()))
            .setValue(true)
            .onChange((value) => {
                c.setTooltip(getToggleTooltip(value))
            })
        );

    settingBuilder(sett);

    sett.addExtraButton((c) => c
        .setIcon("x")
        .setTooltip("Remove substitution")
    );

    return sett;
}
