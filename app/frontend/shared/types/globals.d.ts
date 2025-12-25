export {}

interface Gon {
  googleMapsApiKey: string
  clarityProjectId: string
  googleAnalyticsMeasurementId: string
  googleTagManagerContainerId: string
  web3FormsApiKey: string
}

declare global {
  var gon: Gon
}
