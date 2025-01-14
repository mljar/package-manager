export const listPackagesCode = `
def __list_packages():
    from importlib.metadata import distributions
    pkgs = []
    for dist in distributions():
        pkgs.append({"name": dist.metadata["Name"], "version": dist.version})
    return pkgs  # Zwracamy listę bez użycia json.dumps

__list_packages()
`;

export const installPackagePip = (pkg: string): string =>
  `
def __install_pip():
    import subprocess
    import sys
    python_exe = sys.executable
    if python_exe.startswith('\\\\?'):
        python_exe = python_exe[4:] 
    subprocess.check_call([python_exe, '-m', 'pip', 'install', '${pkg}'])
__install_pip()`;


export const checkIfPackageInstalled = (pkg: string) => `
def __check_if_installed():
    from importlib.metadata import distributions
    for dist in distributions():
        if dist.metadata["Name"].lower() == "${pkg}".lower():
            print("INSTALLED")
            return
    print("NOT_INSTALLED")
__check_if_installed()
`
