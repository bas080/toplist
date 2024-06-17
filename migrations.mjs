// Consider placing in own module when it gets bigger.
export function migrations() {
  let data = JSON.parse(window.localStorage.data);

  const finalize = (target) => {
    window.localStorage.data = JSON.stringify(data);
    window.localStorage.version = target;

    // No need to define a noop migration by returning the target arg.
    return target;
  };

  return {
    undefined() {
      data = {
        lists: [],
      };

      assignUsername()

      return "0.0.0";
    },

    "0.0.0": finalize,
  };
}

async function assignUsername() {
  // Add a random username if none.
  if (!window.localStorage.username) {
    const { uniqueNamesGenerator, colors, animals } = await import(
      "unique-names-generator"
    );

    window.localStorage.username = uniqueNamesGenerator({
      dictionaries: [colors, animals],
      length: 2,
    });
  }
}
