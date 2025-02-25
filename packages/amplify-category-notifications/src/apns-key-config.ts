import { $TSAny } from 'amplify-cli-core';
import inquirer from 'inquirer';
import { validateFilePath } from './validate-filepath';
import { run as p8decoderRun } from './apns-cert-p8decoder';
/**
 * APNs Key config run function
 */
export const run = async (channelInput: $TSAny) : Promise<$TSAny> => {
  let keyConfig;
  if (channelInput) {
    keyConfig = channelInput;
  } else {
    const questions = [
      {
        name: 'BundleId',
        type: 'input',
        message: 'The bundle id used for APNs Tokens: ',
      },
      {
        name: 'TeamId',
        type: 'input',
        message: 'The team id used for APNs Tokens: ',
      },
      {
        name: 'TokenKeyId',
        type: 'input',
        message: 'The key id used for APNs Tokens: ',
      },
      {
        name: 'P8FilePath',
        type: 'input',
        message: 'The key file path (.p8): ',
        validate: validateFilePath,
      },
    ];
    keyConfig = await inquirer.prompt(questions);
  }

  keyConfig.TokenKey = p8decoderRun(keyConfig.P8FilePath);
  delete keyConfig.P8FilePath;

  return keyConfig;
};
