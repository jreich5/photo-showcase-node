# Photo Showcase

This project is a React application to display and search for photos by a photo album id.

You can view a live version of the application [here](https://jreich5.github.io/photo-showcase/).

![desktop-view](./images/desktop-view.png)
![mobile-view](./images/mobile-view.png)

[This GitHub project board](https://github.com/users/jreich5/projects/3) was used to organize the development of this application. More details on the project, the development process, and how to run the project locally are included below.

## Table of Contents

- [Description](#description)
- [Setup](#setup)
- [Development Process](#development-process)
- [Lessons Learned](#lessons-learned)

## Description

This Photo Showcase demonstrates a React application with several technologies:

- [Bun](https://bun.sh/) for the runtime, dependency management and test runner
- [Vite](https://vitejs.dev/) for the development server and boiler plate setup for a React + TypeScript application
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for API calls
- [Tailwind CSS](https://tailwindcss.com/) is used to create a mobile responsive design.
- [Figma](https://www.figma.com/) is used for creating initial mockups.
- [GitHub Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects) board to document development tasks
- [GitHub Pages](https://pages.github.com/) for the live site
- [React Testing Library](https://testing-library.com/) the Bun test runner for component testing
- [Cypress](https://www.cypress.io/) for end-to-end testing

The project features test-driven custom validation for the album id input. The site is mobile-responsive using Tailwind CSS and custom CSS. The photo API data is stored in local storage for faster data retrieval and DOM loading.

## Setup

To run the application locally, complete the following steps:

1. [Install Bun](https://bun.sh/docs/installation)
1. Clone this repository
1. `bun install`
1. `bun run dev`

## Development Process

### Inital Setup and Planning

I started started this project by first building out a <10min [prototype](https://github.com/jreich5/photo-showcase/blob/main/ten-minute-prototype.html) in a single HTML file with JavaScript. I did this to get a quick sense of the basic functionality of the project.

After completing the prototype, I decided to build out a front-end app using React+TypeScript with Vite and Bun. My goal with this build was to strike a balance between over-engineering and adhering to as many best practices as possible.

I prioritized the following considerations:

1. Comprehensive test coverage
1. Code quality
1. Performance

After first setting up the project and removing the boilerplate code, I pushed the starting code up to a new GitHub repository and populated a GitHub Project board with tasks for completing the showcase.

I then created mockups with Figma for the desktop and mobile views.

Desktop mockup:

![Desktop Mockup](./images/desktop-mockup.png)

Mobile mockup:

![Mobile Mockup](./images/mobile-mockup.png)

I then planned out what my component hierarchy would be using annotations in Mac Finder (the version below still contained pagination and a few mislabled props):

![components](./images/components.png)

After building the components, I focused on adding the the state and props to the components. This lead to creating the API calls for data fetching and optimizing performance using local storage.

With the components built and the data being displayed, I focused on styling with Tailwind. Once that was completed, I focused on refactoring the code to use more explicit typing in TypeScript and refactored all my component props to use interfaces.

The final steps of development consisted of adding error handling for my API calls, deploying the live site and adding ent-to-end tests.

### TDD

While not entirely test-driven, I initially built out the React components by first writing component tests and verifying that my components rendered properly. When refactoring my album id input validation, I used TDD to create several small functions to verify if a user's input should change the input state.

### Challenges

In the course of building this project, I encountered several blockers:

- Getting the RTL tests to work on child components (related to API mocking)
- Implementing pagination
- Spotting a bug in production

It took me a bit of tinkering to understand that in order for me to render child components and test them, I needed to teardown the DOM after testing each component. I found that the `afterAll` method in the Bun test runner allowed me to call the `cleanup` method from the React Testing Library.

Pagination was a significant feature I intended to implement but it wasn't part of the the MVP and had to be moved to the backlog due to time contraints.

After deploying to GitHub pages, the data was not rendering. I had not tested clearing out localStorage since a much earlier stage of development and the live site was not loading data due to setting the wrong value for the state of the photos. I was able to debug this issue by throwing in alerts, then console logs while using the `vite preview` and eventually found this issue was also occuring locally.

### Use of AI

I leveraged ChatGPT at points throughout this project for general questions on how certain technologies interacted with each other. I rarely used any AI-generated code but I did find the code suggestions to be helpful in writing my E2E tests with Cypress.

## Lessons Learned

Building this Showcase was fun and highlighted several areas of continued growth:

### Don't wait to resolve TypeScript types

I allowed the bun:test dependency to stay unresolved for much of the project. If I had compiled my TypeScript code sooner, I would have seen several small refactors I could have done from the beginning.

### Be careful with MVP scope

The pagination feature should have been de-prioritized in favor of more test coverage.

### Bun is fast and cool but documentation and online resources are harder to find

Bun and Vite are FAST but searching for solutions takes time due to the newness of the technology.

### Mocking is hard

Testing in React applications in general is a new challenge. I spent a log of time attempting to mock the API data coming from my useEffect hook and ultimately had to move on. If I had used a more established project setup using Jest, the existing resources online would have been more relevant.

### Feature difficulty is hard to predict

I labeled each planned features as either low | mid | high complexity, based on a combination of prior experience and prediction of the scope of the feature. I found that I both undershot and overshot complexity for various features.
