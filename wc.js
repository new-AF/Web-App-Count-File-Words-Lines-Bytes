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
    addRow({ fileName, fileSize, lineCount, wordCount, byteCount }) {
        const row = this.templateRow.cloneNode(true);

        this.setRowContent(row, {
            fileName,
            fileSize,
            lineCount,
            wordCount,
            byteCount,
        });

        this.table.append(row);
    }
    setRowContent(
        row,
        { fileName, fileSize, lineCount, wordCount, byteCount }
    ) {
        const nameCell = row.querySelector(".file-name");
        const sizeCell = row.querySelector(".file-size");
        const lineCountCell = row.querySelector(".line-count");
        const wordCountCell = row.querySelector(".word-count");
        const byteCountCell = row.querySelector(".byte-count");

        nameCell.textContent = fileName;
        sizeCell.textContent = fileSize;
        lineCountCell.textContent = lineCount;
        wordCountCell.textContent = wordCount;
        byteCountCell.textContent = byteCount;
    }
}

const upload = new Upload(
    document.querySelector(".upload .button"),
    document.querySelector(".upload .input")
);
