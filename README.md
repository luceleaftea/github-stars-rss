# GitHub Stars RSS

Creates an AWS lambda function that generates a dynamic OPML feed of GitHub repo releases from the given GitHub user's starred repos.

## Installation

NOTE: Instructions are currently for Unix based systems only

### AWS Lambda JavaScript Function

1. Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).
2. Run `nvm use`.
3. Navigate to the `src/lambda` directory
4. Run `npm install` to install node modules.

### OpenTofu

- Install [OpenTofu](https://opentofu.org/) with `brew install opentofu`
- Initialize OpenTofu with `tofu init` in the `src/open-tofu` directory
- Install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- Create [AWS Access Keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey) for your IAM user (not root user!!)
- Run `aws configure` and add the keys when prompted (use `us-east-1` for default region and `json` for output format)
- Setup a `.tfvars` file using `main.tfvars.template` as a basis

## Usage

1. Navigate to the `src/open-tofu` directory
2. Run `tofu plan -var-file="path/to/vars.tfvars"` to see what updates OpenTofu will do
3. Run `tofu apply -var-file="path/to/vars.tfvars"` to actually apply those updates
