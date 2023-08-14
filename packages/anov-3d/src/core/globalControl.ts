interface CallbackType {
  cb: () => void
  duration: number
}

class GlobalControl {
  public callback: CallbackType = {} as CallbackType
  public task: Map<() => void, NodeJS.Timer> = new Map()

  constructor() {}

  public update() {
    if (this.task.size > 0) {
      [...this.task.keys()].forEach((cb) => {
        cb()
      })
    }
  }

  public add(cb: () => void, duration?: number) {
    this.callback.cb = cb
    this.callback.duration = duration || 1000
  }

  public remove(cb: () => void) {
    if (this.task.get(cb)) {
      clearTimeout(this.task.get(cb)!)
      this.task.delete(cb)
    }
  }

  public start() {
    if (!this.task.get(this.callback.cb)) {
      const timer = this.timerControl()
      this.task.set(this.callback.cb, timer)
    }
  }

  private timerControl() {
    return setTimeout(() => {
      this.task.delete(this.callback.cb)
    }, this.callback.duration)
  }
}

export default new GlobalControl()