import { isNil } from "./util.mjs";

class MissingMigration extends Error {}

// Takes two semver strings. The current version and the target one. It then
// runs the associated migration callbacks till one returns the done symbol
export async function migrate(migrations, current, target) {
  if (current === target) {
    return;
  }

  const migration = migrations[current];

  if (isNil(migration)) {
    throw new MissingMigration(
      `No migration defined for ${current}. Migrating to ${target} failed.`,
    );
  }

  return migrate(migrations, await migration(target), target);
}
