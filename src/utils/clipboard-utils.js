export function clipboardCopyPlainText(str){
    return navigator.clipboard.writeText(str).then(null, err => {
        // Fallback method
        const fallback_area = document.createElement("textarea");
        fallback_area.style.position = "fixed";
        fallback_area.style.top = "0";
        fallback_area.style.left = "0";
        fallback_area.style.width = "10px";
        fallback_area.style.height = "10px";
        document.body.appendChild(fallback_area);
        fallback_area.value = str;
        fallback_area.focus();
        fallback_area.setSelectionRange(0, fallback_area.value.length);
        document.execCommand("copy");
        document.body.removeChild(fallback_area);
    })
}
