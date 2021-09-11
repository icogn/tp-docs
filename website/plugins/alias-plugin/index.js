const { Joi } = require('@docusaurus/utils-validation');

const BLACKLIST = [
  '@site',
  '@generated',
  '@docusaurus',
  '~docs',
  '~blog',
  '~pages',
  '~debug',
];

function plugin(context, { alias, mergeStrategy }) {
  return {
    name: 'docusaurus-plugin-local-resolve',
    configureWebpack: function () {
      return {
        mergeStrategy,
        resolve: {
          alias,
        },
      };
    },
  };
}

plugin.validateOptions = function validateOptions({ options, validate }) {
  return validate(
    Joi.object({
      alias: Joi.object()
        .pattern(Joi.string().invalid(...BLACKLIST), Joi.string())
        .required(),
      mergeStrategy: Joi.object().pattern(Joi.string(), Joi.string()),
    }),
    options
  );
};

module.exports = plugin;
