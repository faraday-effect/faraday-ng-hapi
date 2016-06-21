/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'nes': 'vendor/nes',
  'materialize-css': 'materialize-src',
  'materialize': 'vendor/angular2-materialize',
  'angular2-materialize': 'vendor/angular2-materialize'
};

/** User packages configuration. */
const packages: any = {
  'nes': {main: 'client.js'},
  'materialize-src': {
    'main': 'js/bin/materialize.min.js'
  },
  'materialize': {
    'main': 'dist/materialize-directive.js',
    //'defaultExtension': 'js'
  }
};

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
  'app/shared/models',
  'app/shared/services',
  'app/shared/components',
  'app/shared/components/important-dates',
  'app/shared/components/todays-topics',
  'app/+login',
  'app/+admin',
  'app/+admin/+register',
  'app/+admin/+course',
  'app/+admin/+courses',
  'app/+admin/+department',
  'app/+admin/+departments',
  'app/+admin/+prefix',
  'app/+admin/+prefixes',
  'app/+admin/+section',
  'app/+admin/+sections',
  'app/+admin/+term',
  'app/+admin/+terms',
  'app/+participant',
  'app/+podium',
  'app/+podium/+activity-detail',
  'app/+podium/+cue-sheet',
  'app/+podium/+cue-sheet/attendance',
  'app/+podium/+story-board',
  'app/+podium/+story-board/story',
  'app/+projector',
  'app/+projector/+welcome',
  'app/+projector/+welcome/class-code',
  'app/classes',
  'app/classes/courses',
  'app/classes/class',
  'app/classes/courses/course',
  'app/classes/podium',
  'app/classes/projector',
  'app/classes/participant',
  'app/classes/course-detail',
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
