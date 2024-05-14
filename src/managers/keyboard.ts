export default class KeyboardManager {
    private static instance: KeyboardManager = new KeyboardManager();

    static getInstance(): KeyboardManager {
        return this.instance;
    }

    events: Array<{ key: string; f: () => void }> = [];

    private constructor() {}

    add(key: string, action: (object?: any) => void, object?: any) {
        const f = () => action(object);

        this.events.push({ key, f });
    }

    setupKeyControls() {
        document.onkeydown = (event) => {
            this.events.forEach(({ key, f }) => {
                if (key === event.key) {
                    f();
                }
            });
        };
    }
}
