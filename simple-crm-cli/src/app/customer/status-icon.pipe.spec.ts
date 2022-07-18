import { StatusIconPipe } from './status-icon.pipe';

describe('StatusIconPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusIconPipe();
    expect(pipe).toBeTruthy();
  });

  it('Prospect should result in online', () => {
    const pipe = new StatusIconPipe(); // 1. SETUP: construct a new instance of the class.
    const x = pipe.transform('Prospect'); // 2. INVOKE the method
    expect(x).toEqual('online'); // 3. VERIFY the result of the method matches what is expected.
 });

 it('prospect (lowercase) should result in online', () => {
  const pipe = new StatusIconPipe();
  const x = pipe.transform('prospect');
  expect(x).toEqual('online');
});
it('prOspEct (mixed case) should result in online', () => {
  const pipe = new StatusIconPipe();
  const x = pipe.transform('prOspEct');
  expect(x).toEqual('online');
});
it('Purchased should result in users', () => {
  const pipe = new StatusIconPipe();
  const x = pipe.transform('Purchased');
  expect(x).toEqual('users');
});
it('purchased (lowercase) should result in users', () => {
  const pipe = new StatusIconPipe();
  const x = pipe.transform('purchased');
  expect(x).toEqual('users');
});
it('pUrchased (mixed case) should result in users', () => {
  const pipe = new StatusIconPipe();
  const x = pipe.transform('pUrchased');
  expect(x).toEqual('users');
});
it('Empty string should result in money', () => {
  const pipe = new StatusIconPipe();
  const x = pipe.transform('');
  expect(x).toEqual('money');
});
it('Null should result in money', () => {
  const pipe = new StatusIconPipe();
  const x = pipe.transform('null');
  expect(x).toEqual('money');
});

});
