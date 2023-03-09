class TreeView extends HTMLDivElement {
    static #id = 0;
    constructor() {
        super();
        this.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "Home":
                    this.#home();
                    e.preventDefault();
                    break;
                case "End":
                    this.#end();
                    e.preventDefault();
                    break;
            }
        });
    }
    connectedCallback() {
        this.setAttribute("id", "treeView_" + String(TreeView.#id++));
        this.setAttribute("role", "tree");
        this.setAttribute("data-level", "1");
        setTimeout(() => {
            const treeItems = Array.from(this.children).filter(item => item instanceof TreeItem);
            for (let i = 0; i < treeItems.length; i++) {
                treeItems[i].setAttribute("aria-setsize", String(treeItems.length));
                treeItems[i].setAttribute("aria-posinset", String(i + 1));
            }
            treeItems[0].setAttribute("tabindex", "0");
        });
    }
    #home() {
        this.children[0].focus();
    }
    #end() {
        let last = this.children[this.children.length - 1];
        while (true) {
            if (last instanceof TreeItem) {
                last.focus();
                return;
            }
            last = last.children[last.children.length - 1];
            if (last instanceof TreeGroup && last.previousElementSibling?.getAttribute("aria-expanded") === "false") {
                last = last.previousElementSibling;
            }
        }
    }
}
class TreeItem extends HTMLAnchorElement {
    static #id = 0;
    constructor() {
        super();
        this.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowRight":
                    this.#arrowRight();
                    e.preventDefault();
                    break;
                case "ArrowLeft":
                    this.#arrowLeft();
                    e.preventDefault();
                    break;
                case "ArrowDown":
                    this.#arrowDown();
                    e.preventDefault();
                    break;
                case "ArrowUp":
                    this.#arrowUp();
                    e.preventDefault();
                    break;
                case "*":
                    this.#openSameLevel();
                    e.preventDefault();
                    break;
            }
        });
        this.addEventListener("click", (e) => {
            const svg = e.target.closest("svg");
            if (svg) {
                e.preventDefault();
                if (this.getAttribute("aria-expanded") === "true") {
                    this.#arrowLeft();
                }
                else {
                    this.#arrowRight();
                }
            }
        });
    }
    connectedCallback() {
        this.setAttribute("id", "treeItem_" + String(TreeItem.#id++));
        this.setAttribute("tabindex", "-1");
        this.setAttribute("role", "treeitem");
        this.setAttribute("aria-level", this.parentElement?.getAttribute("data-level"));
        setTimeout(() => {
            this.setAttribute("aria-label", String(this.textContent));
        });
    }
    #arrowLeft() {
        if (this.hasAttribute("aria-expanded") && this.getAttribute("aria-expanded") === "true") {
            this.setAttribute("aria-expanded", "false");
            return;
        }
        let parent = this.parentElement;
        if (parent instanceof TreeGroup) {
            parent.previousElementSibling.focus();
        }
    }
    #arrowRight() {
        if (this.hasAttribute("aria-expanded")) {
            if (this.getAttribute("aria-expanded") === "false") {
                this.setAttribute("aria-expanded", "true");
                return;
            }
            this.nextElementSibling?.children[0]?.focus();
        }
    }
    #arrowDown() {
        let current = this;
        let next = this.nextElementSibling;
        while (true) {
            if (next instanceof TreeItem) {
                next.focus();
                return;
            }
            if (next instanceof TreeGroup) {
                if (next.previousElementSibling?.getAttribute("aria-expanded") === "true") {
                    next = next.children[0];
                }
                else {
                    next = next.nextElementSibling;
                }
                continue;
            }
            next = current.parentElement;
            if (next instanceof TreeView)
                return;
            current = next.nextElementSibling;
            next = next.nextElementSibling;
        }
    }
    #arrowUp() {
        let current = this;
        let prev = this.previousElementSibling;
        while (true) {
            if (prev instanceof TreeItem) {
                prev.focus();
                return;
            }
            if (prev instanceof TreeGroup) {
                if (prev.previousElementSibling?.getAttribute("aria-expanded") === "true") {
                    prev = prev.children[prev.children.length - 1];
                }
                else {
                    prev = prev.previousElementSibling;
                }
                continue;
            }
            prev = current.parentElement;
            if (prev instanceof TreeView)
                return;
            current = prev.previousElementSibling;
            prev = prev.previousElementSibling;
        }
    }
    #openSameLevel() {
        let childElements = this.parentElement?.children;
        if (childElements) {
            let treeItems = Array.from(childElements).filter(item => item.getAttribute("aria-expanded") === "false");
            treeItems?.forEach(item => item.setAttribute("aria-expanded", "true"));
        }
    }
}
class TreeGroup extends HTMLDivElement {
    static #id = 0;
    connectedCallback() {
        this.setAttribute("id", "treeGroup_" + String(TreeGroup.#id++));
        this.setAttribute("role", "group");
        this.setAttribute("aria-labelledby", String(this.previousElementSibling?.id));
        this.setAttribute("data-level", String(Number(this.parentElement?.getAttribute("data-level")) + 1));
        this.#addAriaToTreeItem();
        setTimeout(() => {
            const treeItems = Array.from(this.children).filter(item => item instanceof TreeItem);
            for (let i = 0; i < treeItems.length; i++) {
                treeItems[i].setAttribute("aria-setsize", String(treeItems.length));
                treeItems[i].setAttribute("aria-posinset", String(i + 1));
            }
        });
    }
    #addAriaToTreeItem() {
        this.previousElementSibling?.setAttribute("aria-expanded", "false");
        this.previousElementSibling?.setAttribute("aria-owns", this.getAttribute("id"));
        const imageUrl = this.closest("[role='tree']")?.getAttribute("data-image-url");
        let arrow;
        if (imageUrl.includes(".svg#")) {
            arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            let arrowUse = document.createElementNS("http://www.w3.org/2000/svg", "use");
            arrowUse.setAttribute("href", imageUrl);
            arrow.prepend(arrowUse);
        }
        else {
            arrow = document.createElement("img");
            arrow.setAttribute("src", imageUrl);
            arrow.setAttribute("alt", "");
        }
        arrow.setAttribute("width", "30");
        arrow.setAttribute("height", "30");
        arrow.setAttribute("aria-hidden", "true");
        this.previousElementSibling?.prepend(arrow);
    }
}
customElements.define("tree-view", TreeView, { extends: "div" });
customElements.define("tree-item", TreeItem, { extends: "a" });
customElements.define("tree-group", TreeGroup, { extends: "div" });
//# sourceMappingURL=tree-view.js.map