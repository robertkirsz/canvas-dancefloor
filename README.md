# Canvas Dancefloor

A React + canvas dancefloor generator

## Installation
```bash
npm install
```

## Development
```bash
npm run server
```
This will launch the server at port 4000.

Then in another terminal tab do:
```bash
npm start
```
The app will be available at http://localhost:8080/.

## Testing
```bash
npm jest
```
Or this to get coverage raport:
```bash
npm run jest:coverage
```

## Linting
```bash
npm run lint
npm run prettier
```

## Notes

### Dependencies
- `@types/webpack-env` - needed for `module` in `src/index.tsx`

### Files
- `styles.d.ts` - needed for TypeScript to know how to handle `*.module.css` files
