export const listPackagesCode = `
def __mljar__list_packages():
    from importlib.metadata import distributions
    pkgs = []
    seen = set()
    for dist in distributions():
        name = dist.metadata["Name"].lower()
        if name not in seen:
            seen.add(name)
            pkgs.append({"name": name, "version": dist.version})
    return pkgs

__mljar__list_packages();
`;

export const killPipProcess = (pid: number): string => `
def __mljar__kill_pip_process(pid):
    import os, signal

    __mljar__pm_processes = globals().get("__mljar__pm_processes", {})

    proc = __mljar__pm_processes.get(pid)
    if proc:
        try:
            proc.terminate()
            print("[killed]")
        except Exception as e:
            print("[kill-error]", e)
    else:
        try:
            os.kill(pid, signal.SIGTERM)
            print("[killed]")
        except Exception as e:
            print("[kill-error]", e)

__mljar__kill_pip_process(${pid})
`;

export const installPackagePip = (pkg: string, url: string): string => `
__mljar__pm_processes = globals().get("__mljar__pm_processes", {})

def __mljar__install_pip(pkg, url):
    import subprocess, sys

    python_exe = sys.executable
    if python_exe.startswith('\\\\\\\\?'):
        python_exe = python_exe[4:]

    cmd = [python_exe, '-m', 'pip', 'install',
        '--progress-bar', 'off', '--no-color',
        '--disable-pip-version-check', '--index-url', url, *pkg.split()]

    proc = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        bufsize=1,
        universal_newlines=True,
    )

    __mljar__pm_processes[proc.pid] = proc
    print(f"Starting installation process: {proc.pid}")
    sys.stdout.flush()

    for line in iter(proc.stdout.readline, ''):
        print(line.replace('\\r', '\\n'), end='')
        sys.stdout.flush()

    proc.stdout.close()
    rc = proc.wait()
    __mljar__pm_processes.pop(proc.pid, None)

    if rc == 0:
        print('[done] Installation succeed.')
    else:
        print('[error] Installation failed.')

__mljar__install_pip('${pkg}', '${url}')
`;

export const removePackagePip = (pkg: string): string => `
def __mljar__remove_package(pkg):
    import subprocess, sys

    python_exe = sys.executable
    if python_exe.startswith('\\\\?'):
        python_exe = python_exe[4:]

    cmd = [python_exe, '-m', 'pip', 'uninstall', '-y', pkg]

    proc = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        bufsize=1,
        universal_newlines=True
    )

    for line in iter(proc.stdout.readline, ''):
        print(line.replace('\\r', '\\n'), end='')
        sys.stdout.flush()

    proc.stdout.close()
    rc = proc.wait()
    if rc == 0:
        print('[done] Package removed')
    else:
        print(f'[error] Package removal failed:{rc}')

__mljar__remove_package('${pkg}')
`;