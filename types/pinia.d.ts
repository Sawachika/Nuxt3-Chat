import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $api: ReturnType<typeof useNuxtApp>['$api']
  }
}
