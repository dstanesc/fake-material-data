import Mustache from 'mustache';
import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';


const UNIT_MUSTACHE =

    `"unit": {
    "$typeid": "hxgn.uq:Expression-1.0.0",
    "expression": "{{unitExpr}}"
}`

const PROPDATA_MUSTACHE =

    `"PropertyData/{{uuid}}": {
    "$typeid": "hxgn.pd:PropertyData-1.0.0",
    "label": "{{label}}",
    "name": "{{name}}",
    "value": [
        {
            "$typeid": "hxgn.rt:DataPoint-1.0.0",
            {{> dataset}},
            {{> unit}}
        }
    ]
}`

const MATDATA_MUSTACHE =

    `{
    "$typeid": "hxgn.pd:MatData-1.0.0",\
    "name": "{{name}}",\
    "classification": {\
       {{#classification}}\
          {{> datapoint}}{{^last}}, {{/last}}\
       {{/classification}}\
    },\
    "properties": {\
       {{#properties}}\
          {{> propdata}}{{^last}}, {{/last}}\
       {{/properties}}\
    }\
}`


const DATASET_MUSTACHE =

    `{{#numeric}}
"dataSet": [
    {
        "$typeid": "{{typeId}}",
        "value": [
            {{value}}
        ]
    }
]
{{/numeric}}
{{^numeric}}
"dataSet": [
    {
        "$typeid": "{{typeId}}",
        "value":  "{{value}}"
    }
]
{{/numeric}}`

const DATAPOINT_MUSTACHE =

    `"DataPoint/{{uuid}}": {
    "$typeid": "hxgn.rt:DataPoint-1.0.0",
        {{> dataset}},
        "label": "{{label}}",
        "name": "{{name}}"
}`

export function byteSize(text: string) {
    return new TextEncoder().encode(text).byteLength
}

export function simpleMeta(params?: any) {

    if (params === undefined)
        params = [4, 100, 20]

    const meta = {
        classSize: () => params[0],
        propSize: () => params[1],
        arraySize: () => params[2],
        arrayMaxValue: () => randomInt(10),
        arrayIntegralPart: () => randomInt(2)
    }
    return meta;
}

export function simpleMaterialJson(meta?: any): any {
    if (meta === undefined)
        meta = simpleMeta();
    const metadata = simpleMaterialMetadata(meta);
    const matData = materialGenerator(metadata)
    const matJson = materialJson(matData);
    return matJson;
}

export function materialJson(data: any): any {
    const mat = MATDATA_MUSTACHE;
    const datapoint = DATAPOINT_MUSTACHE;
    const dataset = DATASET_MUSTACHE;
    const propdata = PROPDATA_MUSTACHE;
    const unit = UNIT_MUSTACHE;
    const output = Mustache.render(mat, data, { datapoint: datapoint, dataset: dataset, propdata: propdata, unit: unit });
    const parsed = JSON.parse(output);
    return parsed;
}


export function randomFloatArray(size: number, whole: number): number[] {
    return Array(size).fill(0).map((_, idx) => randomFloat(whole));
}

export function randomIntArray(size: number, max: number): number[] {
    return Array(size).fill(0).map((_, idx) => randomInt(max));
}

export function randomFloat(whole: number) {
    return whole + Math.random();
}

export function randomInt(max: number): number {
    return Math.floor(Math.random() * max) + 1;
}

export function simpleMaterialMetadata(meta: any): any {

    const intValue = {
        typeid: "hxgn.ds:Int64-1.0.0",
        value: faker.datatype.bigInt(),
        numeric: true,
        expr: faker.science.unit().symbol
    }

    const stringValue = {
        typeid: "hxgn.ds:String-1.0.0",
        value: faker.lorem.paragraph(),
        numeric: false,
        expr: faker.science.unit().symbol
    }

    const floatValue = {
        typeid: "hxgn.ds:Float64-1.0.0",
        value: faker.datatype.float(),
        numeric: true,
        expr: faker.science.unit().symbol
    }

    const intArrayValue = {
        typeid: "hxgn.ds:Int64s-1.0.0",
        value: randomIntArray(meta.arraySize(), meta.arrayMaxValue()),
        numeric: true,
        expr: faker.science.unit().symbol
    }

    const floatArrayValue = {
        typeid: "hxgn.ds:Float64s-1.0.0",
        value: randomFloatArray(meta.arraySize(), meta.arrayIntegralPart()),
        numeric: true,
        expr: faker.science.unit().symbol
    }

    const values = [intValue, stringValue, floatValue, intArrayValue, floatArrayValue];

    const metadata = {
        name: () => faker.name.fullName(),
        classification: {
            size: meta.classSize(),
            name: () => faker.word.noun(),
            label: () => faker.lorem.words(3),
            value: () => faker.vehicle.vehicle()
        },
        properties: {
            size: meta.propSize(),
            name: () => faker.word.noun(),
            label: () => faker.lorem.words(2),
            value: () => values[randomInt(4)]
        }
    }
    return metadata;
}

export function materialGenerator(metadata: any): any {

    const data = {
        uuid: uuid(),
        name: metadata.name(),
        classification: classificationGenerator(metadata),
        properties: propertyGenerator(metadata)
    };

    return data;
}

export function classificationGenerator(metadata: any): any {
    const out = [];
    for (let index = 0; index < metadata.classification.size; index++) {
        const elem = { uuid: uuid(), name: metadata.classification.name(), label: metadata.classification.label(), typeId: "hxgn.ds:String-1.0.0", value: metadata.classification.value() };
        if (index === metadata.classification.size - 1)
            elem["last"] = true;
        out.push(elem);
    }
    return out;
}

export function propertyGenerator(metadata: any): any {
    const out = [];
    for (let index = 0; index < metadata.properties.size; index++) {
        const propertyValue = metadata.properties.value()
        const elem = {
            uuid: uuid(), name: metadata.properties.name(), label: metadata.properties.label(), typeId: propertyValue.typeid,
            value: propertyValue.value, numeric: propertyValue.numeric, unitExpr: propertyValue.expr
        }
        if (index === metadata.properties.size - 1)
            elem["last"] = true;
        out.push(elem);
    }
    return out;
}