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
            const byteCountCell = row.querySelector(".byte-count");
            const lineCountCell = row.querySelector(".line-count");
            const wordCountCell = row.querySelector(".word-count");

            setNameCell(nameCell, fileName);

            setByteCountCell(byteCountCell, fileSize);

            readTextFromFile(file, undefined, (text) => {
                setLineCell(lineCountCell, text);
                setWordCell(wordCountCell, text);
            });
            /* end of readTextFromFile */
        }
    }
}

const upload = new Upload(
    document.querySelector(".upload .button"),
    document.querySelector(".upload .input")
);

function setNameCell(ref, fileName) {
    removeSpinner(ref);
    ref.textContent = fileName;
}

function setByteCountCell(ref, oldSize) {
    const formattedSize = oldSize.toLocaleString();
    const size = `${formattedSize} Bytes`;
    removeSpinner(ref);
    ref.textContent = size;
}

function setLineCell(ref, text) {
    removeSpinner(ref);
    ref.textContent = "line cell";
}

function setWordCell(ref, text) {
    removeSpinner(ref);
    ref.textContent = "word cell";
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
