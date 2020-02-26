type ActionTypes = 'GOT_ANGULAR_VERSION' | 'ERROR'
type Action<T> = {
  type: ActionTypes
  payload?: T
}

type Connection = {
  name: string
  postMessage: (message: Action<T>, opts?: any) => void
}

declare module browser {
  declare module runtime {
    export function connect(opts: { name: string }): Connection
    export function sendMessage<T>(message: Action<T>): Promise<unknown>

    declare module onMessage {
      type AddListenerHandler = (message: Action<T>, sender: unknown, sendResponse: unknown) => void

      export function addListener(callback: AddListenerHandler)
    }

    declare module onConnect {
      type AddListenerHandler = (connection: any) => void
  
      export function addListener(callback: AddListenerHandler): void
      export function removeListener(callback: AddListenerHandler): void
      export function hasListener(callback: AddListenerHandler): void
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