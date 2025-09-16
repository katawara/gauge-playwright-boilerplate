import { DataStoreFactory, Gauge } from "gauge-ts";

export function putScenarioValue<T>(key: string, value: T): void {
    const store = DataStoreFactory.getScenarioDataStore();
    store.put(key, value);
    Gauge.writeMessage(`Stored in scenario data store: ${key} = ${JSON.stringify(value)}`);
}

export function getScenarioValue<T = string>(key: string): T | undefined {
    const store = DataStoreFactory.getScenarioDataStore();
    const value = store.get(key);

    if (!value) {
        throw new Error(`Key not found in scenario data store: ${key}`);
    }
    return value as T;
}

export function putSpecValue<T>(key: string, value: T): void {
    const store = DataStoreFactory.getSpecDataStore();
    store.put(key, value);
    Gauge.writeMessage(`Stored in spec data store: ${key} = ${JSON.stringify(value)}`);
}

export function getSpecValue<T = string>(key: string): T | undefined {
    const store = DataStoreFactory.getSpecDataStore();
    const value = store.get(key);

    if (!value) {
        throw new Error(`Key not found in spec data store: ${key}`);
    }
    return value as T;
}
