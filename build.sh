#!/bin/bash

[ -d dist ] && rm -f dist/*

jlpm run build

python -m build

cp dist/jupyter_package_manager-*-py3-none-any.whl ../studio/env_installer/extras/
