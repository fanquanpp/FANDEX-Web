---
order: 67
title: 'React与WebAssembly'
module: 'react'
category: 'React'
difficulty: 'advanced'
description: 'React中集成WebAssembly'
author: 'fanquanpp'
updated: 2026-06-14
---

## 1. 加载 WASM

```javascript
async function loadWasm() {
  const { instance } = await WebAssembly.instantiateStreaming(fetch('/module.wasm'), {
    env: { memory: new WebAssembly.Memory({ initial: 256 }) },
  });
  return instance.exports;
}
```

## 2. React 集成

```jsx
function WasmComponent() {
  const [wasm, setWasm] = useState(null);

  useEffect(() => {
    loadWasm().then(setWasm);
  }, []);

  if (!wasm) return <div>Loading WASM...</div>;

  return <div>Result: {wasm.compute(42)}</div>;
}
```
