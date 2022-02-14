export const environment = {
  production: true,
  ip: '192.168.0.52:3001', //'localhost:3001',
  defaultPort: '3001',
  endGcode: 'M05;\nG01X0Y0;',
  penDownCommand: 'M3 S500',
  appStateCheckInterval: 4000,
  useCameraAPI: false,
  drawingOffset: [25, 0],
  avgTimePerLine: 0.096755719, //in s
  maxImageFileSize: 0.05, //in MB
  alertTime: 3,
};
