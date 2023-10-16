interface CallbackType {
  cb: () => void
  duration: number
}

class GlobalControl {
  public callback: CallbackType = {} as CallbackType
  public task: Map<() => void, NodeJS.Timer | number> = new Map()

  constructor() {}

  /**
   * frame update task, call by frame
   */
  public update() {
    if (this.task.size > 0) {
      [...this.task.keys()].forEach((cb) => {
        cb()
      })
    }
  }

  /**
   * add a task
   * @param cb
   * @param duration
   */
  public add(cb: () => void, duration?: number) {
    this.callback.cb = cb
    this.callback.duration = duration || 1000
  }

  /**
   * remove a task
   * @param cb
   */
  public remove(cb: () => void) {
    if (this.task.get(cb)) {
      if (this.task.get(cb) !== Infinity)
        clearTimeout(this.task.get(cb))

      this.task.delete(cb)
    }
  }

  /**
   * real push frame task
   */
  public start() {
    if (!this.task.get(this.callback.cb)) {
      let timer: NodeJS.Timer | number

      if (this.callback.duration === Infinity)
        timer = Infinity

      else
        timer = this.timerControl()

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