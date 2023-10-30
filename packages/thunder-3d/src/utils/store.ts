export type StoreType = Map<string, any>

export class StoreManagement {
  public store: StoreType = new Map()

  public get<T>(key: string): T | undefined {
    return this.store.get(key)
  }

  public set<T>(key: string, value: T): void {
    this.store.set(key, value)
  }

  public delete(key: string): void {
    this.store.delete(key)
  }

  public clear(): void {
    this.store.clear()
  }
}

export default new StoreManagement()
