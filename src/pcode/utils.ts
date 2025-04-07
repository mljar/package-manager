export const listPackagesCode = `
def __mljar__list_packages():
    from importlib.metadata import distributions
    pkgs = []
    seen = set()
    for dist in distributions():
        name = dist.metadata["Name"]
        if name not in seen:
            seen.add(name)
            pkgs.append({"name": name, "version": dist.version})
    return pkgs

__mljar__list_packages()
`;

export const installPackagePip = (pkg: string): string => `
def __mljar__install_pip():
    import subprocess
    import sys
    python_exe = sys.executable
    if python_exe.startswith('\\\\?'):
        python_exe = python_exe[4:] 
    subprocess.check_call([python_exe, '-m', 'pip', 'install', '${pkg}'])
__mljar__install_pip()
`;

export const removePackagePip = (pkg: string): string => `
def __mljar__remove_package():
    import subprocess
    import sys
    python_exe = sys.executable
    if python_exe.startswith('\\\\?'):
        python_exe = python_exe[4:]
    subprocess.check_call([python_exe, '-m', 'pip', 'uninstall', '-y', '${pkg}'])
__mljar__remove_package()
`;

export const checkIfPackageInstalled = (pkg: string) => `
def __mljar__check_if_installed():
    from importlib.metadata import distributions
    for dist in distributions():
        if dist.metadata["Name"].lower() == "${pkg}".lower():
            print("INSTALLED")
            return
    print("NOT_INSTALLED")
__mljar__check_if_installed()
`;
