class Upload {
    constructor(label, input) {
        this.label = label;
        this.input = input;
        this.templateRow = undefined;
        this.init();
    }
    init() {
        this.label.addEventListener("click", () => this.input.click());
        this.label.addEventListener("click", (event) => this.onclick(event));
        this.templateRow = document.querySelector("tbody .template");
    }
    get files() {
        return this.input.files;
    }
    onclick(event) {
        console.log(event);
    }
    addrow({ fileName, fileSize, lineCount, wordCount, byteCount }) {}
}

const upload = new Upload(
    document.querySelector(".upload .button"),
    document.querySelector(".upload .input")
);
