import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { createPackageManagerSidebar } from './packageManagerSidebar';
import { IStateDB } from '@jupyterlab/statedb';
import { NotebookWatcher } from './watchers/notebookWatcher';

const leftTab: JupyterFrontEndPlugin<void> = {
  id: 'mljar-package-manager:plugin',
  description:
    'A JupyterLab extension to list, remove and install python packages from pip.',
  autoStart: true,
  requires: [IStateDB],
  activate: async (app: JupyterFrontEnd, stateDB: IStateDB) => {
    const notebookWatcher = new NotebookWatcher(app.shell);

    // notebookWatcher.selectionChanged.connect((sender, selections) => { });

    const widget = createPackageManagerSidebar(
      notebookWatcher,
      stateDB,
      app.commands
    );

    app.shell.add(widget, 'left', { rank: 1999 });
  }
};

export default leftTab;
