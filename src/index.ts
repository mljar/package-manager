import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { createPackageManagerSidebar } from './packageManagerSidebar';
import { IStateDB } from '@jupyterlab/statedb';
import { ITranslator } from '@jupyterlab/translation';
import { translator as trans } from './translator';
import { NotebookWatcher } from './watchers/notebookWatcher';

const leftTab: JupyterFrontEndPlugin<void> = {
  id: 'mljar-package-manager:plugin',
  description:
    'A JupyterLab extension to list, remove and install python packages from pip.',
  autoStart: true,
  requires: [IStateDB, ITranslator],
  activate: async (
    app: JupyterFrontEnd,
    stateDB: IStateDB,
    translator: ITranslator
  ) => {
    const lang = translator.languageCode;
    if (lang === 'pl-PL') trans.setLanguage('pl');
    const notebookWatcher = new NotebookWatcher(app.shell);

    const widget = createPackageManagerSidebar(
      notebookWatcher,
      stateDB,
      app.commands
    );

    app.shell.add(widget, 'left', { rank: 1999 });

    // add new command for installing packages
    app.commands.addCommand('mljar-packages:install', {
      label: 'Install Python Package…',
      caption: 'Open MLJAR Package Manager installer',
      execute: args => {
        const pkg =
          typeof args?.package === 'string' && args.package.trim() !== ''
            ? args.package.trim()
            : undefined;

        window.dispatchEvent(
          new CustomEvent('mljar-packages-install', {
            detail: { packageName: pkg }
          })
        );
      }
    });
  }
};

export default leftTab;
