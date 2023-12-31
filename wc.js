class Upload {
    constructor(label, input) {
        this.label = label;
        this.input = input;
        this.table = undefined;
        this.tableBody = undefined;
        this.templateRow = undefined;

        this.init();
    }
    init() {
        this.label.addEventListener("click", () => this.input.click());
        this.label.addEventListener("click", (event) => this.onclick(event));
        this.table = document.querySelector("table");
        this.tableBody = this.table.querySelector("tbody");
        this.templateRow = this.tableBody.querySelector(".template");
    }
    get files() {
        return this.input.files;
    }
    onclick(event) {
        console.log(event);
    }
    addrow({ fileName, fileSize, lineCount, wordCount, byteCount }) {
        const row = this.templateRow.cloneNode(true);
    }
}

const upload = new Upload(
    document.querySelector(".upload .button"),
    document.querySelector(".upload .input")
);
