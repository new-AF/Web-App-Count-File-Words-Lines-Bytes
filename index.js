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

        this.tbody.append(...elements);

        this.fillRows(elements, files);
    }
    fillRows(elements, files) {
        Array.from(files, (file, index) => fn(file, elements[index]));

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
    const array = text.match(/\n/g);
    const rawCount = array === null ? 0 : array.length;
    const formattedCount = rawCount.toLocaleString();
    const lines = formattedCount;

    ref.textContent = lines;
}

function setWordCell(ref, text) {
    removeSpinner(ref);
    /* sequence of non-white-space characters*/
    const array = text.match(/\S+/g);
    const rawCount = array === null ? 0 : array.length;
    const formattedCount = rawCount.toLocaleString();
    const words = formattedCount;

    ref.textContent = words;
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

function getTheme() {
    const obj =
        document.body.style.getPropertyValue("--theme") === ""
            ? getComputedStyle(document.body)
            : document.body.style;
    const theme = obj.getPropertyValue("--theme");
    return theme;
}

function cssVar(name) {
    const obj = getComputedStyle(document.body);
    const val = obj.getPropertyValue(name);
    return val;
}

function setCSSVars(object) {
    const style = document.body.style;

    for (const [name, val] of Object.entries(object)) {
        style.setProperty(name, val);
    }
}

document
    .querySelector("header .switch-themes")
    .addEventListener("click", (event) => {
        const oldTheme = getTheme();
        const theme = oldTheme === "dark" ? "white" : "dark";

        setCSSVars({
            "--theme": theme,
            "--color-bg": cssVar(`--${theme}-body`),
            "--color-text": cssVar(`--${theme}-text`),
            "--color-shadow": cssVar(`--${theme}-border`),
            "--color-hover": cssVar(`--${theme}-border`),
            "--color-border": cssVar(`--${theme}-border`),
            "--color-outline": cssVar(`--${theme}-border`),
            "--color-outline-active": cssVar(`--${theme}-border-active`),
            "--icon-invert": cssVar(`--${theme}-icon-invert`),
        });
    });
