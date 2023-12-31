class Upload {
    constructor(label, input) {
        this.label = label;
        this.input = input;
        this.prepare();
    }
    prepare() {
        this.label.addEventListener("click", () => this.input.click());
        this.label.addEventListener("click", (event) => this.onclick(event));
    }
    get files() {
        return this.input.files;
    }
    onclick(event) {
        console.log(event);
    }
}

const upload = new Upload(
    document.querySelector(".upload .button"),
    document.querySelector(".upload .input")
);
