const path = require("path");

const nodeInputs = [
  {
    type: "input",
    name: "nodeName",
    message: "Node name?",
    default: "node-1",
  },
  {
    type: "input",
    name: "nodeCategory",
    message: "Node category?",
    default: "new category",
  },
  {
    type: "input",
    name: "nodeColor",
    message: "Node color?",
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
    message: "Node inputs?",
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
    message: "Node outputs?",
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
  plop.setGenerator("create", {
    description: "Create new Project",
    prompts: [
      {
        type: "input",
        name: "projectName",
        message: "Project name?",
        default: "nrg-project",
      },
      ...nodeInputs,
    ],
    actions: [
      {
        type: "add",
        path: "{{projectName}}/.husky/commit-msg",
        templateFile: "templates/.husky/commit-msg.hbs",
      },
      {
        type: "add",
        path: "{{projectName}}/.husky/pre-commit",
        templateFile: "templates/.husky/pre-commit.hbs",
      },
      {
        type: "add",
        path: "{{projectName}}/.browserslistrc",
        templateFile: "templates/.browserslistrc.hbs",
      },
      {
        type: "add",
        path: "{{projectName}}/.eslintignore",
        templateFile: "templates/.eslintignore.hbs",
      },
      {
        type: "add",
        path: "{{projectName}}/.eslintrc.json",
        templateFile: "templates/.eslintrc.json.hbs",
      },
      {
        type: "add",
        path: "{{projectName}}/.gitignore",
        templateFile: "templates/.gitignore.hbs",
      },
      {
        type: "add",
        path: "{{projectName}}/.npmignore",
        templateFile: "templates/.npmignore.hbs",
      },
      {
        type: "add",
        path: "{{projectName}}/.prettierignore",
        templateFile: "templates/.prettierignore.hbs",
      },
      {
        type: "add",
        path: "{{projectName}}/commitlint.config.js",
        templateFile: "templates/commitlint.config.js.hbs",
      },
      {
        type: "add",
        path: "{{projectName}}/jsconfig.json",
        templateFile: "templates/jsconfig.json.hbs",
      },
      {
        type: "add",
        path: "{{projectName}}/nrg.config.js",
        templateFile: "templates/nrg.config.js.hbs",
      },
      {
        type: "add",
        path: "{{projectName}}/package.json",
        templateFile: "templates/package.json.hbs",
      },
      {
        type: "add",
        path: "{{projectName}}/README.md",
        templateFile: "templates/README.md.hbs",
      },
      ...nodeActions,
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
