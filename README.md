# Material Data Generator

# Build & Test Repo

```
npm run clean
npm install
npm run build
npm run test
```

# Quick Usage
```ts
import {
    simpleMaterialJson
} from '@dstanesc/mat-data'
const matJson = simpleMaterialJson(); // <- classification count 4, property count 100, array property size 20
```

# Minimal Config
```ts
import {
    simpleMeta,
    simpleMaterialJson
} from '@dstanesc/mat-data'
const meta = simpleMeta([4, 500, 100]); // <- classification count 8, property count 500, array property size 100
const matJson = simpleMaterialJson(meta);
```

# Simple Config

```ts
import {
    simpleMaterialJson,
    randomInt,
    byteSize
} from '@dstanesc/mat-data'

const meta = {
    classSize: () => 2, // <- classification count 2
    propSize: () => 10,  // <- property count 10
    arraySize: () => 10,   // <- array property size 10 
    arrayMaxValue: () => randomInt(10), // <- int array properties - array max value (10 or less)
    arrayIntegralPart: () => randomInt(2) // <- float array properties - array integral part (2 or less)
}
const matJson = simpleMaterialJson(meta);
```

# More Config

```ts
```

## Disclaimer

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact
[opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

This project may contain Microsoft trademarks or logos for Microsoft projects, products, or services. Use of these
trademarks or logos must follow Microsoft’s [Trademark & Brand Guidelines](https://www.microsoft.com/trademarks). Use of
Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft
sponsorship.
