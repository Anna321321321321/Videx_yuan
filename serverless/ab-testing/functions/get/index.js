'use strict';

// ideally we would like to put this inside a configuration folder
// but serverless has some issues to pack a folder, this is just a walk around
const productions = [];

const stagings = productions;

const developments = [
  {
    name: 'demo',
    active: true,
    id: 'background-demo',
    description: 'demo',
    treatments: [
      {
        id: 'treatment-blue',
        settings: [
          {
            name: 'background',
            type: 'string',
            value: 'blue'
          }
        ],
        percentage: 0.5
      },
      {
        id: 'treatment-green',
        settings: [
          {
            name: 'background',
            type: 'string',
            value: 'green'
          }
        ],
        percentage: 0.5
      }
    ]
  }
];

const environments = ['development', 'staging', 'production'];

/* eslint-disable no-param-reassign */

module.exports.handler = function(context, req) {
  const { environment } = req.query;
  if (!environment || !environments.includes(environment)) {
    context.res = {
      status: 400,
      body: 'Bad Request'
    };
    context.done();
  }
  const experiments =
    environment === 'development'
      ? developments
      : environment === 'staging'
        ? stagings
        : productions;
  context.res = {
    headers: {
      'content-type': 'application/json'
    },
    body: experiments
      .filter(experiment => experiment.active)
      .map(experiment => ({
        id: experiment.id,
        treatments: experiment.treatments.map(treatement => ({
          id: treatement.id,
          settings: treatement.settings.map(setting => ({
            name: setting.name,
            value: setting.value
          })),
          percentage: treatement.percentage
        }))
      }))
  };
  context.done();
};
