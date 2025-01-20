import { LabIcon } from '@jupyterlab/ui-components'; 

const mljarLogoPromise = fetch(`https://mljar.com/images/logo/logo_blue_white.svg`)
  .then(response => response.text())
  .then(svgStr => new LabIcon({name: 'mljar-logo',svgstr: svgStr}))

export {mljarLogoPromise as mljarLogo};
