import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { createPackageManagerSidebar } from './packageManagerSidebar';
import { IStateDB } from '@jupyterlab/statedb';
import { ITranslator } from '@jupyterlab/translation';
import { translator as trans } from './translator';
import { NotebookWatcher } from './watchers/notebookWatcher';

// constants
const PLUGIN_ID = 'mljar-package-manager:plugin';
const COMMAND_INSTALL = 'mljar-package-manager:install';
const EVENT_INSTALL = 'mljar-packages-install';
const TAB_RANK = 1999;

// extension
const leftTab: JupyterFrontEndPlugin<void> = {
  id: PLUGIN_ID,
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
    if (lang === 'pl-PL') {
      trans.setLanguage('pl');
    }
    const notebookWatcher = new NotebookWatcher(app.shell);

    const widget = createPackageManagerSidebar(
      notebookWatcher,
      stateDB,
      app.commands
    );

    app.shell.add(widget, 'left', { rank: TAB_RANK });

    // add new command for installing packages
    app.commands.addCommand(COMMAND_INSTALL, {
      label: 'Install Python Package…',
      caption: 'Open MLJAR Package Manager installer',
      execute: args => {
        const pkg =
          typeof args?.package === 'string' && args.package.trim() !== ''
            ? args.package.trim()
            : undefined;

        window.dispatchEvent(
          new CustomEvent(EVENT_INSTALL, {
            detail: { packageName: pkg }
          })
        );
      }
    });
  }
};

export default leftTab;
