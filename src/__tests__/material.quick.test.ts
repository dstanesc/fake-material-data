
import { 
    simpleMaterialJson, 
    byteSize 
} from '../material'

describe("Quick material test", function () {
    test("Material generation ", () => {
        const matJson = simpleMaterialJson(); // <- classification count 4, property count 100, array property size 20
        const text = JSON.stringify(matJson, null, 2);
        console.log(text);
        console.log(`Size ${byteSize(text)} bytes`);
    });
});
