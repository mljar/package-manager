import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { createPackageManagerSidebar } from './packageManagerSidebar';
import { IStateDB } from '@jupyterlab/statedb';
import { ITranslator } from '@jupyterlab/translation';
import { translator as trans } from './translator';
import { NotebookWatcher } from './watchers/notebookWatcher';
import { ISettingRegistry } from '@jupyterlab/settingregistry';

// constants
export const MLJAR_PACKAGE_MANAGER_ID = 'jupyter-package-manager:plugin';
export const pypiPathProperty = 'pathToPrivatePyPIRepository'
const COMMAND_INSTALL = 'mljar-package-manager:install';
const EVENT_INSTALL = 'mljar-packages-install';
const TAB_RANK = 1999;

// extension
const leftTab: JupyterFrontEndPlugin<void> = {
  id: MLJAR_PACKAGE_MANAGER_ID,
  description:
    'A JupyterLab extension to list, remove and install python packages from pip.',
  autoStart: true,
  requires: [IStateDB, ITranslator, ISettingRegistry],
  activate: async (
    app: JupyterFrontEnd,
    stateDB: IStateDB,
    translator: ITranslator,
    settingRegistry: ISettingRegistry | null
  ) => {
    const lang = translator.languageCode;
    if (lang === 'pl-PL') {
      trans.setLanguage('pl');
    }
    const notebookWatcher = new NotebookWatcher(app.shell);

    const widget = createPackageManagerSidebar(
      notebookWatcher,
      stateDB,
      app.commands,
      settingRegistry
    );

    app.shell.add(widget, 'left', { rank: TAB_RANK });

    // command for installing packages
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
