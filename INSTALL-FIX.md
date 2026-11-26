# Dependency installation fix

The project uses Vite 8, whose optional esbuild peer dependency requires esbuild 0.27 or 0.28. The previous package manifest pinned esbuild 0.25, causing npm ERESOLVE. The devDependency is now set to ^0.28.2.

On Windows PowerShell, from this project directory, run:

```powershell
# Remove the stale lockfile so npm can resolve a consistent dependency tree
Remove-Item package-lock.json -ErrorAction SilentlyContinue

# Remove an old install if one exists
if (Test-Path node_modules) { Remove-Item node_modules -Recurse -Force }

npm install
npm run build
```

If the build succeeds, start the app with `npm run dev` and use the Local URL printed by the server.
