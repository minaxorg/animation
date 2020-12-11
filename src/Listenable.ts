export enum AnimationStatus {
  /// The animation is stopped at the beginning.
  dismissed = 'AnimationStatus.dismissed',

  /// The animation is running from beginning to end.
  forward = 'AnimationStatus.forward',

  /// The animation is stopped at the end.
  completed = 'AnimationStatus.completed',
}

abstract class Listenable {
  protected _listeners: (() => void)[] = []
  protected _statusListeners: ((status: AnimationStatus) => void)[] = []

  /**
   * 添加 Listener
   * @param cb 动画执行每帧的回调
   */
  addListener(cb: () => void) {
    this._listeners.push(cb)
  }

  removeListener(cb: () => void) {
    this._listeners = this._listeners.filter((i) => i !== cb)
  }

  /**
   * 添加 StatusListener
   * @param cb 动画状态变化时的回调
   */
  addStatusListener(cb: (status: AnimationStatus) => void) {
    this._statusListeners.push(cb)
  }

  removeStatusListener(cb: (status: AnimationStatus) => void) {
    this._statusListeners = this._statusListeners.filter((i) => i !== cb)
  }

  notifyListeners() {
    this._listeners.forEach((l) => l())
  }

  notifyStatusListeners(status: AnimationStatus) {
    this._statusListeners.forEach((l) => l(status))
  }
}

export default Listenable
