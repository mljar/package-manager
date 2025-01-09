export const listPackagesCode = `
def __list_packages():
    from importlib.metadata import distributions
    pkgs = []
    for dist in distributions():
        pkgs.append({"name": dist.metadata["Name"], "version": dist.version})
    return pkgs  # Zwracamy listę bez użycia json.dumps

__list_packages()
`;
