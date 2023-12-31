class Upload {
    constructor(label, input) {
        this.label = label;
        this.input = input;
        this.prepare();
    }
    prepare() {
        this.label.addEventListener("click", () => this.input.click());
    }
}

const upload = new Upload(
    document.querySelector("#upload .button"),
    document.querySelector("#upload .input")
);
