
import { 
    simpleMaterialMetadata, 
    materialJson,  
    materialGenerator, 
    randomInt, 
    byteSize 
} from '../material'


describe("Material test", function () {

    const createMaterial = meta => {
        const metadata = simpleMaterialMetadata(meta);
        const matData = materialGenerator(metadata)
        const matJson = materialJson(matData);
        const text = JSON.stringify(matJson, null, 2);
        //console.log(text);
        console.log(`Size ${byteSize(text)} bytes`);
    }

    test("Material generation (2 class, 2 props) test", () => {
        const meta = {
            classSize: () => 2,
            propSize: () => 2,
            arraySize: () => 10,
            arrayMaxValue: () => randomInt(100),
            arrayIntegralPart: () => randomInt(10)
        }
        createMaterial(meta);
    });

    test("Material generation (5 class, 20 props) test", () => {
        const meta = {
            classSize: () => 5,
            propSize: () => 20,
            arraySize: () => 10,
            arrayMaxValue: () => randomInt(100),
            arrayIntegralPart: () => randomInt(10)
        }
        createMaterial(meta);
    });

    test("Material generation (10 class, 1000 props) test", () => {
        const meta = {
            classSize: () => 10,
            propSize: () => 1000,
            arraySize: () => 50,
            arrayMaxValue: () => randomInt(100),
            arrayIntegralPart: () => randomInt(10)
        }
        createMaterial(meta);
    });
});
