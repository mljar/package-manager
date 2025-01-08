import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { createPackageManagerSidebar} from './packageManagerSidebar';


const leftTab: JupyterFrontEndPlugin<void> = {
  id: 'package-manager:plugin',
  description: 'A JupyterLab extension to list, remove and install python packages from pip.',
  autoStart: true,
  activate: async (app: JupyterFrontEnd) => {

    let widget = createPackageManagerSidebar();

    app.shell.add(widget, 'left',{rank: 4000});
  }
};

export default leftTab;
