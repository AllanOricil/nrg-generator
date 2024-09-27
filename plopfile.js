const path = require("path");

const nodeInputs = [
  {
    type: "input",
    name: "nodeName",
    message: "What would you like to name your node?",
    default: "node-1",
  },
  {
    type: "input",
    name: "nodeCategory",
    message: "Which category should your node belong to?",
    default: "new category",
  },
  {
    type: "input",
    name: "nodeColor",
    message: "What color should represent your node?",
    default: "#FFFFFF",
    validate: function (value) {
      const hexColorRegex = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i;
      if (hexColorRegex.test(value)) {
        return true;
      }
      return "Please enter a valid hex color code (e.g., #FFFFFF or #FFF)";
    },
  },
  {
    type: "input",
    name: "nodeInputs",
    message: "How many inputs should your node have?",
    default: 1,
    validate: function (value) {
      const numberValue = parseInt(value, 10);
      if (numberValue === 0 || numberValue === 1) {
        return true;
      }
      return "Inputs must be either 0 or 1.";
    },
  },
  {
    type: "input",
    name: "nodeOutputs",
    message: "How many outputs should your node have?",
    default: 1,
    validate: function (value) {
      const numberValue = parseInt(value, 10);
      if (numberValue >= 0) {
        return true;
      }
      return "Outputs must be 0 or more.";
    },
  },
];

const nodeActions = [
  {
    type: "add",
    path: "{{projectName}}/src/nodes/{{dashCase nodeName}}/client/index.js",
    templateFile: "templates/src/node/client/index.js.hbs",
  },
  {
    type: "add",
    path: "{{projectName}}/src/nodes/{{dashCase nodeName}}/client/index.html",
    templateFile: "templates/src/node/client/index.html.hbs",
  },
  {
    type: "add",
    path: "{{projectName}}/src/nodes/{{dashCase nodeName}}/server/index.js",
    templateFile: "templates/src/node/server/index.js.hbs",
  },
  {
    type: "add",
    path: "{{projectName}}/src/nodes/{{dashCase nodeName}}/client/locales/docs/en-US.html",
    templateFile: "templates/src/node/client/locales/docs/en-US.html.hbs",
  },
  {
    type: "add",
    path: "{{projectName}}/src/nodes/{{dashCase nodeName}}/client/locales/labels/en-US.json",
    templateFile: "templates/src/node/client/locales/labels/en-US.json.hbs",
  },
  {
    type: "add",
    path: "{{projectName}}/src/nodes/{{dashCase nodeName}}/client/icons/icon.svg",
    templateFile: "templates/src/node/client/icons/icon.svg.hbs",
  },
];

module.exports = function (plop) {
  const cwd = process.cwd();
  plop.setGenerator("create", {
    description: "Create new Project",
    prompts: [
      {
        type: "input",
        name: "projectName",
        message: "What would you like to name your project?",
        default: "nrg-project",
      },
      ...nodeInputs,
    ],
    actions: [
      {
        type: "add",
        path: path.resolve(cwd, "{{projectName}}/.husky/commit-msg"),
        templateFile: "templates/.husky/commit-msg.hbs",
      },
      {
        type: "add",
        path: path.resolve(cwd, "{{projectName}}/.husky/pre-commit"),
        templateFile: "templates/.husky/pre-commit.hbs",
      },
      {
        type: "add",
        path: path.resolve(cwd, "{{projectName}}/.browserslistrc"),
        templateFile: "templates/.browserslistrc.hbs",
      },
      {
        type: "add",
        path: path.resolve(cwd, "{{projectName}}/.eslintignore"),
        templateFile: "templates/.eslintignore.hbs",
      },
      {
        type: "add",
        path: path.resolve(cwd, "{{projectName}}/.eslintrc.json"),
        templateFile: "templates/.eslintrc.json.hbs",
      },
      {
        type: "add",
        path: path.resolve(cwd, "{{projectName}}/.gitignore"),
        templateFile: "templates/.gitignore.hbs",
      },
      {
        type: "add",
        path: path.resolve(cwd, "{{projectName}}/.npmignore"),
        templateFile: "templates/.npmignore.hbs",
      },
      {
        type: "add",
        path: path.resolve(cwd, "{{projectName}}/.prettierignore"),
        templateFile: "templates/.prettierignore.hbs",
      },
      {
        type: "add",
        path: path.resolve(cwd, "{{projectName}}/.releaserc.json"),
        templateFile: "templates/.releaserc.json.hbs",
      },
      {
        type: "add",
        path: path.resolve(cwd, "{{projectName}}/commitlint.config.js"),
        templateFile: "templates/commitlint.config.js.hbs",
      },
      {
        type: "add",
        path: path.resolve(cwd, "{{projectName}}/jsconfig.json"),
        templateFile: "templates/jsconfig.json.hbs",
      },
      {
        type: "add",
        path: path.resolve(cwd, "{{projectName}}/nrg.config.js"),
        templateFile: "templates/nrg.config.js.hbs",
      },
      {
        type: "add",
        path: path.resolve(cwd, "{{projectName}}/package.json"),
        templateFile: "templates/package.json.hbs",
      },
      {
        type: "add",
        path: path.resolve(cwd, "{{projectName}}/README.md"),
        templateFile: "templates/README.md.hbs",
      },
      ...nodeActions.map((action) => ({
        ...action,
        path: path.resolve(cwd, action.path),
      })),
    ],
  });

  plop.setGenerator("create:node", {
    description: "Create new Node",
    prompts: [...nodeInputs],
    actions: [...nodeActions].map((action) => ({
      ...action,
      path: action.path.replace("{{projectName}}", process.cwd()),
    })),
  });
};
