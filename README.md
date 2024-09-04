# Product-Management-System

A brief description of the project and what it does.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Ensure you have Node.js installed (preferably v22.x). You can download it from [nodejs.org](https://nodejs.org/).
- **Angular CLI**: Install Angular CLI globally(preferably v18.x) if you haven't already:

  ```bash
  npm install -g @angular/cli
  ```

- **Git**: Ensure Git is installed to clone the repository. You can download it from [git-scm.com](https://git-scm.com/).

## Installation

Follow these steps to get a copy of the project up and running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/nfpranta/Product-Management-System.git
```

### 2. Navigate to the Project Directory

```bash
cd Product-Management-System
```

### 3. Install Dependencies

Install the necessary npm packages by running:

```bash
npm install --legacy-peer-deps
```

_Note: `--legacy-peer-deps` is used to resolve any peer dependency conflicts._

### 4. Update Local Storage Key (If Applicable)

Since the application involves data stored in `localStorage`, ensure that the appropriate keys are set up. For example, if you have a `localStorageKey` that the app relies on, you can seed it with initial data.

```javascript
localStorage.setItem("productRecords", JSON.stringify([]));
```

## Running the Application

Run the following command to start and open the development server:

```bash
ng serve --open
```

By default, the app will be available at `http://localhost:4200/`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This `README.md` should provide clear and structured guidance for setting up and running the Angular project locally, as well as basic usage instructions. Adjust the specific sections as needed to fit the details of your project.
