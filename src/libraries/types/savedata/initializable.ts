/**
 * Data object that has an initialization state.
 *
 * To be `initialized` simply means that a skeleton, with or without the actual data, has been created.
 */
export interface Initializable {
    /**
     * Whether the object has been initialized.
     */
    initialized: boolean;
}
