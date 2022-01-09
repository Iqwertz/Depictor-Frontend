// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ip: '192.168.0.52:3001', //'localhost:3001',
  endGcode: 'M05;\nG01X0Y0;',
  appStateCheckInterval: 4000,
  useCameraAPI: false,
  drawingOffset: [25, 0],
  avgTimePerLine: 0.099278441, //in s
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
