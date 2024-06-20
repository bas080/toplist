import { html, render } from "lit-html";
import emojiMap from "./emoji.json";
import levenshtein from "js-levenshtein";
import { version } from "./package.json";
import QRCode from "qrcode-svg";
import {
  memoize,
  findMax,
  head,
  rest,
  tryCatch,
  tryReject,
  moveItemToTop,
} from "./util.mjs";

const openQRCode = (items) => () => {
  const url = shareUrl(items);

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

const emojiByTag = emojiMap.names.reduce((acc, name) => {
  name.tags.split(":").forEach((tag) => {
    acc.push([tag, name]);
  });

  return acc;
}, []);

const someEmoji = memoize((value) => {
  if (!value) return null;

  return findMax(([tag]) => {
    return -levenshtein(tag, value);
  }, emojiByTag)[1].unicode;
});

let data;

const raiseArchived = (index) => () => {
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

const toLocaleString = (value) => {
  if (typeof value === "string") return toLocaleString(new Date(value));
  return value.toLocaleString();
};

const mergeItems = (items) => () => {
  window.dialog.close();
  data.lists[0].items.push(...items);
  rerender();
};

const onListItemClick = (value, isTopList, index) => (event) => {
  event.preventDefault();
  // Should remove when in the top list.
  if (isTopList) data.lists[0].items.splice(index, 1);
  else data.lists[0].items.unshift(value);

  rerender();
};

const listItem = (isTopList) => (value, index) =>
  html` <li class="list-item">
    <form @submit=${onListItemClick(value, isTopList, index)}>
      <button>${value} ${someEmoji(value)}</button>
    </form>
  </li>`;

const listItems = (isTopList) => (items) => items.map(listItem(isTopList));

const createList = (event) => {
  event.preventDefault();
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

const shareUrl = (items) => {
  const url = new URL(window.location.pathname, window.location.origin);
  url.hash = JSON.stringify(items);

  return url.toString();
};

const share = (items) => (event) => {
  event.preventDefault();

  clipboard(shareUrl(items));
};

const list =
  (isTopList) =>
  ({ created, items }, index) =>
    html`<article>
      ${isTopList ? html`<h1 id="toplist">Top List 🍒</h1>` : null}
      ${isTopList
        ? html` <form @submit="${addItem}">
            <label>New Item</label>
            <input required id="addItemInput" />
            <input type="submit" value="Add item" />
          </form>`
        : null}
      <ul class="list ${isTopList && "list-top"}">
        ${items.length
          ? listItems(isTopList)(items)
          : html`<em>
              New empty list. Start adding items. Click an item to remove
              it.</em
            >`}
      </ul>
      <details>
        <summary>List</summary>

        ${isTopList
          ? html`
              <section>
                <p>Archive top list and create new one.</p>
                <button @click="${createList}">Archive</button>
              </section>
            `
          : html`
              <section>
                <p>Raise archived list to top.</p>
                <button class="button" @click="${raiseArchived(index + 1)}">
                  Raise
                </button>
              </section>

              <section>
                <p>Merge into top list.</p>
                <button class="button" @click="${mergeItems(items)}">
                  🔃 Merge
                </button>
              </section>
            `}

        <section>
          <p>Share using QR code.</p>
          <button @click="${openQRCode(items)}">Generate QR</button>
        </section>
        <section>
          <p>Creates a link that appends the list items.</p>
          <p>Use it to share your list with someone's toplist.</p>
          <a class="button" href="${shareUrl(items)}" @click="${share(items)}"
            >Share</a
          >
        </section>

        <!--
            <section>
              <p>Copy the complete list. Each item is on a newline.</p>
              <button @click="${copy(items)}">Text</button>
            </section>

            <section>
              <p>Download as a text file. Each item is on a newline.</p>
              <button @click="${download(items)}">Download</button>
            </section>
            -->
      </details>
    </article>`;

const isNotEmpty = (x) => (x ? x.length !== 0 : true);

const lists = (isTopList) => (lists) =>
  lists
    .filter(({ items }) => isTopList || isNotEmpty(items))
    .map(list(isTopList));

const app = () =>
  html` <details>
      <summary>Settings</summary>
      <button>Export</button>
      <button>Import</button>
      <button @click="${clearCache}">Update App</button>
      <p class="subtle">Top List v${version}</p>
    </details>
    ${lists(true)(head(data.lists))} ${lists(false)(rest(data.lists))}`;

function rerender() {
  localStorage.data = JSON.stringify(data);

  render(app(), window.app);
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
      list(false)({ created: new Date().toISOString(), items }, 0),
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
