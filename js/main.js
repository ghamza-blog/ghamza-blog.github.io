document.addEventListener("DOMContentLoaded", (_) => {
    document.querySelectorAll("code").forEach((el) => {
        const key = "hl";
        const regex = new RegExp(`${key}=\\[(\\s*\\d*(\\-\\d*)?)*]`, "g");

        if (regex.test(el.className)) {
            const className = el.className.match(regex)[0];
            const htmlLines = el.innerHTML.split("\n");
            const linesStr = className
                .split(`${key}=`)
                .pop()
                .replace("[", "")
                .replace("]", "")
                .split(" ");
            const lines = linesStr
                .map((x) => {
                    if (x.includes("-")) {
                        const [lower, upper] = x.split("-").map((x) => parseInt(x));
                        return Array.from(
                            new Array(upper - lower + 1),
                            (_, i) => i + lower - 1
                        );
                    }
                    return parseInt(x) - 1;
                })
                .flat();

            const newHtmlLines = htmlLines.map((x, i) =>
                !lines.includes(i) ? `<span style="opacity: 0.3;">${x}</span>` : x
            );

            el.innerHTML = newHtmlLines.join("\n");
        }
    });
});

document.addEventListener("DOMContentLoaded", (_) => {
    document.querySelectorAll("code").forEach((el) => {
        const key = "file";
        const arrow = "👆";
        const regex = new RegExp(`${key}=\\S*`, "g");

        if (regex.test(el.className)) {
            const className = el.className.match(regex)[0];
            const fileName = className.split(`${key}=`).pop();
            const child = document.createElement("sub");
            child.style = "width: 100%; text-align: right; display: block;";
            child.innerHTML = `${arrow} ${fileName} ${arrow}`;
            el.parentNode.append(child);
        }
    });
});
