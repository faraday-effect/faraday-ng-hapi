/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  '@angular2-material': 'vendor/@angular2-material',
};

/** User packages configuration. */
const packages: any = {
};

const materialPkgs: string[] = [
  'button',
  'card',
  'checkbox',
  'core',
  'icon',
  'input',
  'list',
  'toolbar',
];

materialPkgs.forEach((pkg) => {
  packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`};
});

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/+course',
  'app/+courses',
  'app/+section',
  'app/+sections',
  'app/+department',
  'app/+departments',
  'app/+prefix',
  'app/+prefixes',
  'app/+term',
  'app/+terms',
  'app/+section/section-edit',
  'app/+login',
  'app/+admin',
  'app/+admin/shared',
  'app/+welcome',
  'app/todays-topics',
  'app/important-dates',
  'app/+cue-sheet',
  'app/+cue-sheet/attendance',
  'app/+welcome/class-code',
  'app/+register',
  'app/+story-board',
  'app/+story-board/story',
  'app/+activity-detail',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
