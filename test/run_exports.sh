#!/bin/bash

# Script to run the last 3 export commands
echo "Running documentation exports..."

# Command 1: Export add-track.html to add-track.mdx
npm run mdx-to-react -- sourceDocs/html/-zernikalos/zernikalos.action/-z-skeletal-action/add-track.html -o docs/api/-zernikalos/zernikalos.action/-z-skeletal-action/add-track.mdx

# Command 2: Export index.html to index.mdx (skeletal-action)
npm run mdx-to-react -- sourceDocs/html/-zernikalos/zernikalos.action/-z-skeletal-action/index.html -o docs/api/-zernikalos/zernikalos.action/-z-skeletal-action/index.mdx

# Command 3: Export index.html to index.mdx (action)
npm run mdx-to-react -- sourceDocs/html/-zernikalos/zernikalos.action/index.html -o docs/api/-zernikalos/zernikalos.action/index.mdx

echo "Exports completed."
