// src/components/PackageListComponent.tsx
import React, { useEffect, useState } from 'react';
import { SearchBar } from '../components/searchBar';
import { PackageListContent } from '../components/packageListContent';
import { RefreshButton } from '../components/refreshButton';
import { InstallButton } from '../components/installButton';
import { t } from '../translator';
import { SettingsButton } from './settingsButton';
import { BackButton } from './backButton';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { MLJAR_PACKAGE_MANAGER_ID, pypiPathProperty } from '../index';
import { usePackageContext } from '../contexts/packagesListContext';

interface IPackageListComponentProps {
  settingRegistry: ISettingRegistry | null;
}
type viewMode = 'home' | 'settings';

export const PackageListComponent: React.FC<IPackageListComponentProps> = ({
  settingRegistry
}) => {
  const [view, setView] = useState<viewMode>('home');
  const [editing, setEditing] = useState<boolean>(false);
  const [path, setPath] = useState('');
  const { packages } = usePackageContext();
  const defaultPath = 'https://pypi.org/simple';

  const loadPypiUrl = async () => {
    if (!settingRegistry) {
      return;
    }
    try {
      const settings = await settingRegistry.load(MLJAR_PACKAGE_MANAGER_ID);

      const getPathFromSettings = () => {
        const privatePath = settings.get(pypiPathProperty).composite as string;

        setPath(privatePath);
      };

      getPathFromSettings();
      settings.changed.connect(getPathFromSettings);

      return () => {
        settings.changed.disconnect(getPathFromSettings);
      };
    } catch (reason) {
      console.error('Failed to load settings for Package Manager', reason);
    }
  };

  const saveNewPypiUrl = async () => {
    if (!settingRegistry) {
      return;
    }

    if (!path?.trim()) {
      console.warn('Empty PyPI path – not saving');
      return;
    }

    try {
      const settings = await settingRegistry.load(MLJAR_PACKAGE_MANAGER_ID);
      await settings.set(pypiPathProperty, path);
    } catch (reason) {
      console.error(`Failed to save ${pypiPathProperty}:`, reason);
    }

    setEditing(false);
  };

  const resetPypiUrlToDefault = async () => {
    if (!settingRegistry) {
      return;
    }

    try {
      const settings = await settingRegistry.load(MLJAR_PACKAGE_MANAGER_ID);
      await settings.remove(pypiPathProperty);
    } catch (reason) {
      console.error(`Failed to reset ${pypiPathProperty}:`, reason);
    }
  };

  useEffect(() => {
    loadPypiUrl();
  }, []);

  return (
    <div className="mljar-packages-manager-container">
      {view === 'home' ? (
        <div className="mljar-packages-manager-header-container">
          <div className="mljar-packages-manager-header-title-wrap">
            <h3 className="mljar-packages-manager-header">
              {t('Package Manager')}
            </h3>
            <span className="mljar-packages-manager-count-badge">
              {packages.length}
            </span>
          </div>
          <RefreshButton />
          <SettingsButton onClick={() => setView('settings')} />
          <InstallButton onStartInstall={() => {}} pypiServerUrl={path} />
        </div>
      ) : (
        <div className="mljar-packages-manager-header-container">
          <h3 className="mljar-packages-manager-header">
            {t('Package Manager Settings')}
          </h3>
          <BackButton onBack={() => setView('home')} />
        </div>
      )}
      {view === 'home' ? (
        <div className="mljar-packages-manager-home">
          <SearchBar />
          <PackageListContent />
        </div>
      ) : (
        <div className="mljar-pypi-settings">
          <h4 className="mljar-pypi-settings-title">PyPI server</h4>

          <div className="mljar-pypi-settings-row">
            <label className="mljar-pypi-settings-label">URL</label>

            <div className="mljar-pypi-settings-value">
              {editing ? (
                <input
                  type="text"
                  placeholder="https://pypi.org/simple"
                  value={path}
                  onChange={e => setPath(e.target.value)}
                  className="mljar-pypi-settings-input"
                />
              ) : (
                <code className="mljar-pypi-settings-code">{path}</code>
              )}
            </div>

            <div className="mljar-pypi-settings-actions">
              {editing ? (
                <button
                  className="mljar-pypi-settings-save"
                  onClick={saveNewPypiUrl}
                >
                  Save
                </button>
              ) : (
                <button
                  className="mljar-pypi-settings-edit"
                  onClick={() => setEditing(true)}
                >
                  Edit
                </button>
              )}

              {!editing && path !== defaultPath && (
                <button
                  className="mljar-pypi-settings-reset"
                  onClick={resetPypiUrlToDefault}
                >
                  Restore defaults
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
