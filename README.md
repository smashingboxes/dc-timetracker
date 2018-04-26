# Dc-timetracker

# Project description

## MVP

An application that can record, report and approve employee work hours.

## Requirements

6 hours total - including setup + arrival time.

- 8:30am - 9:00am (Initial setup)
- 9:00am - 1:00pm (Technical Challenge)

Between 9:00am and 1:00pm there will be check-ins with the government.

## Table of Contents

- [Stack](#stack)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Seeded Logins](#seeded-logins)

## Stack

Rails - ~> 5.1.4
Ruby - 2.4.2
PostgreSQL

## Getting Started

### Installation

If you haven't installed ruby, bundler, and postgresql, do that first. Then, do the following to
set up this app:

```sh
git clone git@github.com:smashingboxes/dc-timetracker.git
cd dc-timetracker
bundle install
bundle exec rails db:setup
```

### Usage

To run the app locally:

```sh
bundle exec rails s
```
Then navigate to http://localhost:3000

### Seeded logins

For a list of credentials you can use to log into the app, check [the seeds file](db/seeds.rb).
These logins are created via `rails db:setup` above.
