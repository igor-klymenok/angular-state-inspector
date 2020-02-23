type ActionTypes = 'GOT_ANGULAR_VERSION' | 'ERROR'
type Action<T> = {
  type: ActionTypes
  payload?: T
}

declare module browser {
  declare module runtime {
    export function sendMessage<T>(message: Action<T>): Promise<unknown>

    declare module onMessage {
      type AddListenerHandler = (message: Action<T>, sender: unknown, sendResponse: unknown) => void

      export function addListener(callback: AddListenerHandler)
    }
  }

  declare module tabs {
    type Tab = {
      id: number
    }

    export function sendMessage<T>(tabId: number, message: Action<T>, options?: any): Promise<any>
    export function getCurrent(): Promise<Tab>
  }
}