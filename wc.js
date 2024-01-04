class Upload {
    constructor(label, input) {
        this.label = label;
        this.input = input;
        this.table = undefined;
        this.tbody = undefined;
        this.templateRow = undefined;

        this.init();
    }
    init() {
        this.label.addEventListener("click", () => this.input.click());
        this.input.addEventListener("change", (event) => this.onchange(event));
        this.table = document.querySelector("table");
        this.tbody = this.table.querySelector("tbody");
        this.templateRow = this.tbody.querySelector(".template");
    }
    get files() {
        return this.input.files;
    }

    onchange(event) {
        const files = this.files;

        console.log(event, files);

        this.addRowsFromFiles(files);
    }

    addRowsFromFiles(files) {
        // array of <tr></tr> DOM elements
        const elements = Array.from(files, (_) =>
            this.templateRow.cloneNode(true)
        );
        /* console.group();

        console.log("--rows", rows);
        console.log("--elements", elements);

        console.groupEnd(); */

        this.table.append(...elements);

        this.fillRows(elements, files);
    }
    fillRows(elements, files) {
        Array.from(files).forEach((file, index) => fn(file, elements[index]));

        function fn(file, row) {
            const { name: fileName, size: fileSize } = file;
            const nameCell = row.querySelector(".file-name");
            const sizeCell = row.querySelector(".file-size");
            const lineCountCell = row.querySelector(".line-count");
            const wordCountCell = row.querySelector(".word-count");
            const byteCountCell = row.querySelector(".byte-count");

            nameCell.classList.remove("spinner");
            sizeCell.classList.remove("spinner");

            nameCell.textContent = fileName;
            sizeCell.textContent = fileSize;
            lineCountCell.textContent = "";
            wordCountCell.textContent = "";
            setByteCell(byteCountCell, file);
        }
    }
}

const upload = new Upload(
    document.querySelector(".upload .button"),
    document.querySelector(".upload .input")
);

function setNameCell(ref, text) {
    ref.textContent = text;
}

function setByteCell(ref, file) {
    readTextFromFile(file, undefined, (text) => {
        ref.textContent = text.length;
        removeSpinner(ref);
    });
}

function removeSpinner(ref) {
    ref.classList.remove("spinner");
}

function readTextFromFile(fileObj, encoding, onComplete) {
    const fr = new FileReader();

    fr.readAsText(fileObj, encoding);

    /* crux of project: async callback to set cell */
    fr.onload = () => onComplete(fr.result);
}

function lineCount(oldText) {
    const matches = text.match(/\n/g);
    if (matches === null) return 0;

    const count = matches.length;
    return count;
}
