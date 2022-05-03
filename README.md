# Deloitte US: Artistry of Allyship

- [Requirements](#requirements)
- [Global Setup](#global-setup)
- [Project Setup](#project-setup)
- [Usage](#usage)
    - [SCSS](#scss)
    - Javascript
    - Accessibility
- Deployment

## Requirements
- NodeJS (version 14.17.6)
- Yarn

## Global Setup
This project requires certain packages to be installed globally before setting up. These steps are only required the first time using these packages. Once installed globally these steps can be skipped for future projects.

- [Install Yarn globally](https://wearetilt.atlassian.net/wiki/spaces/WATP/pages/90767385/How+to+-+Install+NVM+Node+and+NPM#Yarn-Setup)

## Project Setup
This project uses webpack to compile and minify assets.

1. Ensure you are using the correct NODE version.
2. Ensure that Yarn is installed globally & run `yarn` or `yarn install` to install the project dependencies.
3. Run `yarn dev` to run a local server on port 3000.

## Usage
### SCSS
To help improve maintainability SCSS is broken into separate 'component' partials which can be found in `src/css/components`. This project follows the [BEM methodology](https://en.bem.info/methodology/css/) for writing CSS combined with minimal usage of utility classes;

#### Class naming conventions
##### Components
```scss
/* Component */
.componentName {}

/* Component modifier */
.componentName--modifierName {}

/* Component descendant */
.componentName__descendant {}

/* Component descendant modifier */
.componentName__descendant--modifierName {}
```
##### States
Used to indicate the state of a component, scoped to component

*Pattern*
```scss
.is-stateType
```

*Examples*
```scss
.modal {
	&.is-active {}
}

.field {
	&.is-hidden {}
}

/* or */

.field.is-hidden {}
```

##### Utility Classes
These are one purpose classes

*Pattern*
```scss
.ut-utilityName
```

*Examples*
```scss
.ut-alignCenter
.ut-inlineBlock
```