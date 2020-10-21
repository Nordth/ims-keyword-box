
export function nodeHasClass(node, class_name){
    if (!node) return false;

    if (node.classList !== undefined){
        if (node.classList.contains(class_name)) return true;
    }
    else if (node.className === undefined) return false;
    else if (node.className === class_name) return true;
    else {
        // check all classes
        const classes = node.className.split(/\s/);
        if (classes.some(c => c.trim() === class_name)){
            return true;
        }
    }
    return false;
}

export function getClosestNodeByClass(node, class_name){
    if (typeof window === 'undefined') return null;
    while (node){
        if (node === document) return null;

        if (nodeHasClass(node, class_name)) return node;

        node = node.parentNode;
    }
    return null;

}

export function removeNodeFromDOM(node){
    if (!node) return;
    if (node.remove !== undefined) node.remove();
    else node.parentNode.removeChild(node);
}
