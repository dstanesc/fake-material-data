
import { 
    simpleMaterialJson, 
    randomInt, 
    byteSize 
} from '../material'

describe("Simple config material test", function () {
    test("Material generation (2 classifications, 2 properties, array size 10, int array max value 10 or less, float array integral part 2 or less) test", () => {
        const meta = {
            classSize: () => 2,
            propSize: () => 2,
            arraySize: () => 10,
            arrayMaxValue: () => randomInt(10),
            arrayIntegralPart: () => randomInt(2)
        }
        const matJson = simpleMaterialJson(meta);
        const text = JSON.stringify(matJson, null, 2);
        console.log(text);
        console.log(`Size ${byteSize(text)} bytes`);
    });
});
