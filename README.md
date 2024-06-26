# github-stars-rss

Generates an RSS feed of releases from a given user's starred repos

## Installation

1. Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).
2. Run `nvm use`.
3. Run `npm install` to install node modules.

## Testing

1. Run `npm run start`

## Relevant Links

[OPML Documentation](http://opml.org/spec2.opml)

## Open Tofu

### Installation

- Install OpenTofu with `brew install opentofu`
- Initialize OpenTOfu with `tofu init` in the `src/open-tofu` folder
- Install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- Create [AWS Access Keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey) for your IAM user (not root user!!)
- Run `aws configure` and add the keys when prompted (use `us-east-1` for default region and `json` for output format)

### Usage

Navigate to `src/open-tofu`

- Run `tofu plan` to see what updates OpenTofu will do
- Run `tofu apply` to actually apply those updates
