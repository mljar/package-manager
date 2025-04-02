import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { createPackageManagerSidebar } from './packageManagerSidebar';
import { NotebookWatcher } from './watchers/notebookWatcher';

const leftTab: JupyterFrontEndPlugin<void> = {
  id: 'package-manager:plugin',
  description:
    'A JupyterLab extension to list, remove and install python packages from pip.',
  autoStart: true,
  activate: async (app: JupyterFrontEnd) => {
    const notebookWatcher = new NotebookWatcher(app.shell);

    notebookWatcher.selectionChanged.connect((sender, selections) => { });

    const widget = createPackageManagerSidebar(notebookWatcher);

    app.shell.add(widget, 'left', { rank: 1999 });
  }
};

export default leftTab;
