import { DataStoreFactory, Gauge } from "gauge-ts";

function putSensitiveScenarioValue<T>(key: string, value: T): void {
    putScenarioValue(key, value, true);
}

function putScenarioValue<T>(
    key: string,
    value: T,
    isSensitive: boolean = false,
): void {
    const store = DataStoreFactory.getScenarioDataStore();
    store.put(key, value);

    if (!isSensitive) {
        Gauge.writeMessage(
            `Stored in scenario data store: ${key} = ${JSON.stringify(value)}`,
        );
    }
}

function getScenarioValue<T = string>(key: string): T | undefined {
    const store = DataStoreFactory.getScenarioDataStore();
    const value = store.get(key);

    if (!value) {
        throw new Error(`Key not found in scenario data store: ${key}`);
    }
    return value as T;
}

function putSensitiveSpecValue<T>(key: string, value: T): void {
    putSpecValue(key, value, true);
}

function putSpecValue<T>(
    key: string,
    value: T,
    isSensitive: boolean = false,
): void {
    const store = DataStoreFactory.getSpecDataStore();
    store.put(key, value);

    if (!isSensitive) {
        Gauge.writeMessage(
            `Stored in spec data store: ${key} = ${JSON.stringify(value)}`,
        );
    }
}

function getSpecValue<T = string>(key: string): T | undefined {
    const store = DataStoreFactory.getSpecDataStore();
    const value = store.get(key);

    if (!value) {
        throw new Error(`Key not found in spec data store: ${key}`);
    }
    return value as T;
}

export const DataStore = {
    putSensitiveScenarioValue,
    putScenarioValue,
    getScenarioValue,
    putSensitiveSpecValue,
    putSpecValue,
    getSpecValue,
};
