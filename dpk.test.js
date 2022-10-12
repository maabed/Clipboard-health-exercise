import {deterministicPartitionKey} from './dpk.js';

const veryLongString =
  'd760688da522b4dc3350e6fb68961b0934f911c7d0ff337438cabf4608789ba94ce70b6601d7e08a279ef088716c4b1913b984513fea4c557d404d0598d4f2f120b42560b6d0019042ccb5476246e60c66b5a779ff8b36fe6c391d565b816f83eb097a3d997d3a4d31591b54c8064e60b94907d65571766017ef4bdb343b2c2a';

describe('deterministicPartitionKey', () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe('0');
  });

  it("Returns the key when given '2' as input", () => {
    const trivialKey = deterministicPartitionKey('2');
    expect(trivialKey).toBe(
      '306bff8a719aa21b04a0b06841e495a569922a7188671d1e59c1629820c977e15f0e2024b98f7484869e5ed13a6ee0b0e7eef56eab4d927dbe2e6035d78387b0'
    );
  });

  it('Returns key when given input when partition Key is a number', () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: 123 });
    expect(trivialKey).toBe('123');
  });

  it('Returns key when given input with partition Key is a 0', () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: 0 });
    expect(trivialKey).toBe(
      'e65a0cb83a95cae7eb0642da576cac881e397c0405c63577c977068f7892f69f1c315baa294124da2a67e0c486d340f9d357377f894d0c0fd850484f8984f2e7'
    );
  });

  it('Returns the key when given partitionKey as input', () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: '20' });
    expect(trivialKey).toBe('20');
  });

  it('Returns a 256 length key when partitionKey size is more than 256 char as input', () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: veryLongString });
    expect(trivialKey).toBe(
      'd760688da522b4dc3350e6fb68961b0934f911c7d0ff337438cabf4608789ba94ce70b6601d7e08a279ef088716c4b1913b984513fea4c557d404d0598d4f2f120b42560b6d0019042ccb5476246e60c66b5a779ff8b36fe6c391d565b816f83eb097a3d997d3a4d31591b54c8064e60b94907d65571766017ef4bdb343b2c2a'
    );
  });
});
