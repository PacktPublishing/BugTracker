sencha app build
rsync -rv build/production/BugTracker/ server/public/
cp locale.js server/public/
rsync -rv translations server/public/
mkdir -p server/public/ext/locale
rsync -rv ext/locale/ server/public/ext/locale/
rsync -rv server/ /Users/simon/deploy/
