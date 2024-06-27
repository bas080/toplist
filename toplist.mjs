import { html, render } from "lit-html";
import linkify from "linkify-string";
import { version } from "./package.json";
import QRCode from "qrcode-svg";
import {
  memoize,
  isNotEmpty,
  findMax,
  head,
  rest,
  tryCatch,
  tryReject,
  moveItemToTop,
} from "./util.mjs";
import { toplist, onAction } from "./lit-component.mjs";

const openQRCode = (event) => {
  const url = event.target.href;

  const qrcode = new QRCode({
    content: url,
    container: "svg-viewbox", //Responsive use
    join: true, //Crisp rendering and 4-5x reduced file size
  });

  const svg = qrcode.svg();

  document.getElementById("qr-code").innerHTML = svg;
  window.qrCodeDialog.showModal();
};

// RENDER ERRORS

const rendered = Symbol("rendered");

function renderError(error) {
  render(
    html`
      <p class="notice notice--assertive">
        ${error?.message ?? "An unknown error occurred."}
        <button @click=${clearCache}>Hard Refresh App</button>
      </p>
    `,
    window.error,
  );
}

window.addEventListener("unhandledrejection", function (event) {
  renderError(event);
  console.error(event);
});

window.addEventListener(
  "error",
  (event) => {
    if (event[rendered]) return;

    event[rendered] = true;
    renderError(event);
    throw event;
  },
  true,
);

// RENDER ERRORS

(async function initialize() {
  if (window.localStorage.version !== version) {
    const { migrate } = await import("./migrate.mjs");
    const { migrations } = await import("./migrations.mjs");

    await migrate(migrations(), window.localStorage.version, version);
  }
})();

let data;

const raiseArchived = (index) => {
  data.lists = moveItemToTop(data.lists, index);
  window.toplist.scrollIntoView();
  rerender();
};

try {
  if (!localStorage.data) throw new Error("Not in localStorage.data");

  data = JSON.parse(localStorage.data);
} catch (error) {
  localStorage.removeItem("data");
  data = {
    lists: [],
  };
}

const newList = () => ({
  created: new Date().toISOString(),
  items: [],
});

data.lists[0] = data.lists[0] ?? newList();

const mergeItems = (items) => () => {
  window.dialog.close();
  data.lists[0].items.push(...items);
  rerender();
};

const onListItemClick = ({
  target,
  detail: { itemIndex: index, isTopList },
}) => {
  // Should remove when in the top list.
  if (isTopList) data.lists[0].items.splice(index, 1);
  else data.lists[0].items.unshift(target.value);

  rerender();
};

const listItems = (isTopList) => (items) => items.map(listItem(isTopList));

const createList = (event) => {
  if (data.lists[0].items.length === 0) {
    window.toplist.scrollIntoView();
    window.addItemInput.focus();
    return;
  }

  data.lists.unshift(newList());
  window.toplist.scrollIntoView();
  rerender();
};

const addItem = (event) => {
  event.preventDefault();
  const input = event.target.querySelector("input");
  data.lists[0].items.unshift(input.value);
  input.value = "";
  rerender();
};

const clipboard = async (text) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text successfully copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text using Clipboard API: ", err);
      fallbackCopyTextToClipboard(text);
    }
  } else {
    console.warn("Clipboard API not supported. Falling back to prompt.");
    fallbackCopyTextToClipboard(text);
  }
};

const fallbackCopyTextToClipboard = (text) => {
  try {
    // Prompt the user to copy the text manually
    prompt("Copy the text below:", text);
    console.log("Text successfully copied to clipboard via prompt");
  } catch (err) {
    console.error("Failed to copy text via prompt: ", err);
  }
};
const download = (items) => () => {
  alert("download");
};

const copy = (items) => () => {
  alert("copy");
};

const clearCache = async () => {
  if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
    const registration = await navigator.serviceWorker.ready;
    const serviceWorker = registration.active;
    serviceWorker.postMessage({
      action: "clearCache",
    });
  }
  setTimeout(() => location.reload(), 200);
};

const share = (event) => {
  clipboard(event.target.href);
};

const lists = (isTopList) => (lists) =>
  lists
    .filter(({ items }) => isTopList || isNotEmpty(items))
    .map(list(isTopList));

const actions = {
  addItem,
  addAction(event) {
    data.lists[0].items.unshift(event.detail.item);
    rerender();
  },
  removeAction: (event) => onListItemClick(event),
  shareListAction: share,
  newListAction: createList,
  updateAppAction: clearCache,
  raiseAction: (event) => {
    raiseArchived(event.detail.listIndex);
  },
  qrShareListAction: openQRCode,
  clearListsAction() {
    if (confirm("Are you sure you want to delete all lists?")) {
      localStorage.clear();
      location.reload();
    }
  },
};

function rerender() {
  // Filter out empty lists besides the toplist.
  data.lists = data.lists.filter(
    (list, index) => index === 0 || isNotEmpty(list.items),
  );

  localStorage.data = JSON.stringify(data);

  render(toplist.app(data, actions), window.app);
}

rerender();

tryReject(async function () {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        new URL("./service-worker.mjs", import.meta.url),
        { type: "module" },
      );

      console.log("Service Worker registered with scope:", registration.scope);
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }

  const url = new URL(window.location.href);
  const append = url.searchParams.get("append");

  const items = tryCatch(
    () => {
      return append
        ? JSON.parse(append)
        : JSON.parse(decodeURIComponent(window.location.hash).substring(1));
    },
    (error) => {
      console.error(error);
    },
  );

  if (items) {
    render(
      html`<div @action="${onAction(actions)}">
        ${toplist.list({ isTopList: false })({ items })}
      </div>`,
      window.preview,
    );

    const { dialog } = window;

    dialog.showModal();

    dialog.addEventListener(
      "close",
      () => {
        url.searchParams.delete("append");
        url.hash = "";
        window.history.replaceState(null, document.title, url.toString());
      },
      { once: true },
    );

    function onClick(event) {
      if (event.target === dialog) {
        dialog.close();
      }
    }

    dialog.addEventListener(
      "click",
      (event) => {
        if (event.target == dialog) dialog.close();
      },
      { once: true },
    );

    dialog.showModal();
  }
});
