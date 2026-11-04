import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const root = fileURLToPath(new URL('../', import.meta.url));
const readJson = async path => JSON.parse(await readFile(join(root, path), 'utf8'));
const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(await readJson('schema/expert-profile.schema.json'));
const catalog = await readJson('catalog.json');
const manifest = await readJson('third_party/consultant-profiles/sources.json');
const sources = new Map(manifest.files.map(source => [source.id, source]));
assert.equal(sources.size, manifest.files.length, 'duplicate source manifest ID');
const profiles = new Map();
for (const filename of (await readdir(join(root, 'profiles'))).filter(name => name.endsWith('.json')).sort()) {
  const profile = await readJson(`profiles/${filename}`);
  assert.ok(validate(profile), `${filename}: ${ajv.errorsText(validate.errors)}`);
  assert.equal(filename, `${profile.id}.json`);
  assert.ok(!profiles.has(profile.id), `duplicate profile ID ${profile.id}`);
  profiles.set(profile.id, profile);
}
assert.ok(profiles.has('general'), 'general fallback is required');
for (const source of manifest.files) {
  assert.ok(source.path.startsWith('third_party/consultant-profiles/'));
  const path = resolve(root, source.path);
  assert.ok(path.startsWith(join(root, 'third_party/consultant-profiles') + '/'), 'source path escapes reference directory');
  const bytes = await readFile(path);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), source.sha256, source.id);
  assert.equal(bytes.length, source.bytes, source.id);
}
for (const profile of profiles.values()) {
  const refs = new Map(profile.sources.map(source => [source.ref, source]));
  assert.equal(refs.size, profile.sources.length, `${profile.id}: duplicate source ref`);
  assert.equal(new Set(profile.diagnosticChecklist.map(check => check.id)).size, profile.diagnosticChecklist.length);
  if (profile.id !== 'general') assert.ok(profile.sources.length > 0, `${profile.id}: source required`);
  for (const check of profile.diagnosticChecklist) {
    if (profile.id !== 'general') assert.ok(check.sourceRefs.length > 0, `${profile.id}/${check.id}: source ref required`);
    for (const ref of check.sourceRefs) assert.ok(refs.has(ref), `${profile.id}/${check.id}: unknown source ref ${ref}`);
  }
  for (const neighbor of profile.distinguishFrom) {
    assert.ok(profiles.has(neighbor.expertId), `${profile.id}: unknown neighbor`);
    assert.notEqual(neighbor.expertId, profile.id);
  }
  for (const source of profile.sources) {
    const original = sources.get(source.sourceId);
    assert.ok(original, `${profile.id}: source missing from manifest`);
    assert.equal(source.repository, original.repository);
    assert.equal(source.commit, original.commit);
    assert.equal(source.path, original.upstreamPath);
    assert.equal(source.sha256, original.sha256);
    assert.equal(source.url, original.url);
    assert.equal(source.license, original.license);
    const text = await readFile(join(root, original.path), 'utf8');
    for (const section of source.sections) assert.ok(text.includes(section), `${profile.id}: source section ${section}`);
    const license = manifest.files.find(file => file.repository === source.repository && /LICENSE/u.test(file.upstreamPath));
    assert.ok(license, `${profile.id}: original license required`);
    assert.match(await readFile(join(root, license.path), 'utf8'), /MIT License/u);
  }
}
const expectedCatalog = [...profiles.values()].map(profile => ({
  id: profile.id, version: profile.version, domain: profile.domain, title: profile.title,
  path: `profiles/${profile.id}.json`, routingDescription: profile.routingDescription,
  useWhen: profile.useWhen, distinguishFrom: profile.distinguishFrom,
}));
assert.equal(catalog.format, 'zesia.expert-catalog.v1');
assert.deepEqual(catalog.profiles, expectedCatalog, 'catalog must match the source profiles');
console.log(`Validated ${profiles.size} profiles and ${manifest.files.length} pinned source/license files.`);
