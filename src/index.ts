import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the package-manager extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'package-manager:plugin',
  description: 'A JupyterLab extension to list, remove and install python packages from pip.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension package-manager is activated!');
  }
};

export default plugin;
