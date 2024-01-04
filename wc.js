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
    createRow(
        fileName,
        fileSize,
        lineCount = undefined,
        wordCount = undefined,
        byteCount = undefined
    ) {
        return {
            fileName,
            fileSize,
            lineCount,
            wordCount,
            byteCount,
        };
    }
    onchange(event) {
        const files = this.files;

        console.log(event, files);

        this.addRowsFromFiles(files);
    }
    addRowsFromFiles(files) {
        const map = ({ name, size }) => this.createRow(name, size);

        // array of Row Objects
        const rows = Array.from(files, map);

        // array of <tr></tr> DOM elements
        const elements = rows.map((_) => this.templateRow.cloneNode(true));

        this.setRows(elements, rows);

        this.table.append(...elements);
    }

    setRows(elements, rows) {
        rows.forEach(
            (
                { fileName, fileSize, lineCount, wordCount, byteCount },
                index
            ) => {
                const row = elements[index];

                const nameCell = row.querySelector(".file-name");
                const sizeCell = row.querySelector(".file-size");
                const lineCountCell = row.querySelector(".line-count");
                const wordCountCell = row.querySelector(".word-count");
                const byteCountCell = row.querySelector(".byte-count");

                nameCell.classList.remove("spinner");
                sizeCell.classList.remove("spinner");

                nameCell.textContent = fileName;
                sizeCell.textContent = fileSize;
                lineCountCell.textContent = lineCount;
                wordCountCell.textContent = wordCount;
                byteCountCell.textContent = byteCount;
            }
        );
    }
}

const upload = new Upload(
    document.querySelector(".upload .button"),
    document.querySelector(".upload .input")
);

function readFile(path, encoding) {
    const fr = new FileReader();

    fr.readAsText(path, encoding);

    fr.onload = () => {
        const cells = document.querySelectorAll("td");
    };
}

function lineCount(oldText) {
    const matches = text.match(/\n/g);
    if (matches === null) return 0;

    const count = matches.length;
    return count;
}
