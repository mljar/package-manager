
<p align="center">
  <img src="https://github.com/mljar/package-manager/blob/main/media/jupyter-package-manager.jpg?raw=true" alt="Jupyter Package Manager banner"/>
</p>

# Jupyter Package Manager

Package Manager is a JupyterLab extension that simplifies managing Python packages directly within your notebooks. With this extension, you can list, filter, install, and remove packages from pip - all without leaving your JupyterLab environment.

## Features

### List packages 

List all packages installed for the currently open notebook.

<img src="https://github.com/mljar/package-manager/blob/main/media/jupyterlab-package-manager-list-packages.png?raw=true" alt="Jupyter Package Manager list packages"/>

### Filtering packages by name 

Quickly search and filter through packages by name.

<img src="https://github.com/mljar/package-manager/blob/main/media/filtering.gif?raw=true" alt="Jupyter Package Manager filter packages"/>

### Install a new package

Install any new package you need directly from the notebook interface.

<img src="https://github.com/mljar/package-manager/blob/main/media/jupyterlab-install-new-package.png?raw=true" alt="Jupyter Package Manager install new package"/>


### Remove package

Easily remove packages that are no longer needed in your current environment.

<img src="https://github.com/mljar/package-manager/blob/main/media/remove-package.gif?raw=true" alt="Jupyter Package Manager remove package"/>


### Dark theme

Enjoy a dark mode experience for more comfortable viewing in low-light environments.

<img src="https://github.com/mljar/package-manager/blob/main/media/jupyterlab-dark-theme-package-manager.png?raw=true" alt="Jupyter Package Manager dark theme"/>


## Install extension

It can also be installed in JupyterLab > 4. To install the extension, execute:

```bash
pip install jupyter_package_manager
```

The extenstion is by default available in [MLJAR Studio](https://mljar.com) - a desktop app for creating Python notebooks. 

## Uninstall extension

To remove the extension, execute:

```bash
pip uninstall jupyter_package_manager
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the package_manager directory
# Install package in development mode
pip install -e "."
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall jupyter_package_manager
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyter-package-manager` within that folder.
