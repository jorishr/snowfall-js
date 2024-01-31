# Changelog

All notable changes to this project will be documented in this file.

## [1.0] - 2024-01-31

- Added JSDoc support for generating documentation.
- Code review process completed (TG-12).

## [0.0.6] - 2024-01-31

- Important documentation changes (TG-17).
- Minor tweak to config parameters loading on re-start.
- Minor update to batchDraw function to guarantee correct snowflake radius calculations (TG-18).

## [0.0.5] - 2024-01-30

- Minor bug fix for issue TG-16, misplaced aria attribute.

## [0.0.4] - 2024-01-29

### Added

- Adds configuration option to limit the canvas height.

### Changed

- Minor performance improvements.
- Bugfix for faulty autostart logic, issue TG-14.

## [0.0.3] - 2024-01-27

### Added

- Adds the ability to add element attributes to the text label element of the toggle switches.

### Changed

- Bug fix for issue TG-11. Resizing the window when the animation is stopped no longer generates errors.

## [0.0.2] - 2024-01-26

### Added

- Adds an accessibility check for prefers-reduced-motion support. The plugin can now be configured to disable the animation entirely or reduce the number of moving items for website visitors that experience discomfort with lots of moving animations on a screen, see [MDN, Prefers Reduced Motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

### Changed

- Minor bug fixes and documentation updates.

## [0.0.1] - 2024-01-25

- First version release
