
import { 
    simpleMaterialJson, 
    simpleMeta, 
    byteSize 
} from '../material'

describe("Minimal config material test", function () {
    test("Material generation ", () => {
        const meta = simpleMeta([4, 500, 100]); // <- classification count 8, property count 500, array property size 100
        const matJson = simpleMaterialJson(meta);
        const text = JSON.stringify(matJson, null, 2);
        console.log(text);
        console.log(`Size ${byteSize(text)} bytes`);
    });
});
