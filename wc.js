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
    newObject(
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
        console.log(event, this.files);

        const files = Array.from(this.files).map(({ name, size: oldSize }) => {
            const size = `${oldSize.toLocaleString()} Bytes`;
            const obj = this.newObject(name, size);
            return obj;
        });

        this.addMultipleRows(files);
    }
    addMultipleRows(arrayOfObjs) {
        const rows = arrayOfObjs.map((o) => this.templateRow.cloneNode(true));

        this.setMultipleRowsContent(rows, arrayOfObjs);

        this.table.append(...rows);
    }
    setMultipleRowsContent(rows, objs) {
        objs.forEach(
            (
                { fileName, fileSize, lineCount, wordCount, byteCount },
                index
            ) => {
                const row = rows[index];

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
        );
    }
}

const upload = new Upload(
    document.querySelector(".upload .button"),
    document.querySelector(".upload .input")
);

function lineCount(oldText) {
    const matches = text.match(/\n/g);
    if (matches === null) return 0;

    const size = matches.length;
    return size;
}
